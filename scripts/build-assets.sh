#!/usr/bin/env bash
# Generate the raster assets that can't be SVG: the social card and the icon
# sizes Safari/iOS need.
#
#   npm run assets:build
#
# The social card is rendered by real Chrome so it uses the actual self-hosted
# Newsreader and JetBrains Mono — including the ʻokina, which an SVG rasteriser
# would miss because the fonts are not installed system-wide.
#
# It renders against the built output, not the dev server: the Astro dev
# toolbar is a dark pill at the bottom-centre of the viewport and lands in the
# screenshot.
#
# It serves dist/client with a plain static server rather than `astro preview`.
# The Vercel adapter has no preview server — `astro preview` exits with
# "Preview server process exited before becoming ready" — and /og is prerendered
# static anyway, so a file server is all it needs.

set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=4322
TMP="$(mktemp -d)"
PREVIEW_PID=""
cleanup() {
  [ -n "$PREVIEW_PID" ] && kill "$PREVIEW_PID" 2>/dev/null || true
  rm -rf "$TMP"
}
trap cleanup EXIT

for tool in "$CHROME" rsvg-convert magick python3; do
  command -v "$tool" >/dev/null 2>&1 || [ -x "$tool" ] || {
    echo "error: missing required tool: $tool" >&2; exit 1; }
done

if lsof -ti:"$PORT" >/dev/null 2>&1; then
  echo "error: port $PORT is already in use. Free it and try again:" >&2
  echo "  lsof -ti:$PORT | xargs kill" >&2
  exit 1
fi

echo "Building…"
npx astro build >/dev/null

echo "Serving dist/client on port ${PORT}"
# `exec` so the subshell is replaced by python and $! is the real process —
# otherwise the cleanup trap kills the shell and leaves the port held.
(cd dist/client && exec python3 -m http.server "$PORT" >/dev/null 2>&1) &
PREVIEW_PID=$!
for _ in $(seq 1 40); do
  curl -sf --max-time 2 "http://localhost:$PORT/og/" -o /dev/null && break
  sleep 0.25
done
curl -sf --max-time 2 "http://localhost:$PORT/og/" -o /dev/null || {
  echo "error: static server did not come up" >&2; exit 1; }

echo "Social card → public/og.png"
"$CHROME" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --virtual-time-budget=4000 \
  --window-size=1200,630 --screenshot="$TMP/og.png" \
  "http://localhost:$PORT/og/" 2>/dev/null
cp "$TMP/og.png" public/og.png
echo "  $(magick identify -format '%wx%h' public/og.png) · $(du -h public/og.png | cut -f1)"

echo "Icons → public/apple-touch-icon.png, public/favicon.ico"
rsvg-convert -w 180 -h 180 public/favicon.svg -o public/apple-touch-icon.png
rsvg-convert -w 32  -h 32  public/favicon.svg -o "$TMP/32.png"
rsvg-convert -w 16  -h 16  public/favicon.svg -o "$TMP/16.png"
magick "$TMP/16.png" "$TMP/32.png" public/favicon.ico
echo "  apple-touch-icon.png $(du -h public/apple-touch-icon.png | cut -f1) · favicon.ico $(du -h public/favicon.ico | cut -f1)"

# Rebuild so dist/ picks up the assets just written into public/.
echo "Rebuilding with the new assets…"
npx astro build >/dev/null
echo "Done."
