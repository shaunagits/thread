#!/usr/bin/env python3
"""
Render the social card to public/og.png.

Why this exists alongside scripts/build-assets.sh
-------------------------------------------------
build-assets.sh screenshots the /og route with headless Chrome. That is the
right way to keep the card and the page in one language, and it is also why
og.png sat on the ocean palette for a day after the graphite swap: nobody has
Chrome, rsvg-convert and ImageMagick set up on the machine where the palette
actually changed.

This draws the same card with Pillow instead, from the same tokens and the
same shipped font files, so the card can be rebuilt anywhere Python runs. If
the two ever disagree, /og is the design and this is the renderer that has to
catch up.

⚠️ The headline is duplicated here and nowhere else. src/pages/og.astro reads
`hero.h1` from src/content/site-v2.ts directly since the homepage swap on
1 Sep 2026; this file cannot, because it is Python and that is a .ts module. So
the string below and site-v2.ts must agree, and a stale card outlives a page
edit in every already-scraped cache.

(Hero.astro is no longer one of the copies. It is the /v1 hero now and carries
the previous headline on purpose.)

Requirements: pillow, fonttools, brotli.

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli pillow
    .venv/bin/python3 scripts/build-og.py

⚠️ `npm run og:build` calls bare `python3`, so it only works if those three are
on the system interpreter. From a venv, call the script directly as above.
"""

from __future__ import annotations

import io
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "public" / "fonts"
OUT = ROOT / "public" / "og.png"

# Kept in step with global.css by hand.
PAPER, INK, FAINT, RULE = "#EDEEE9", "#171A18", "#767C76", "#D9DBD4"
ACCENT, ACCENT_DARK = "#2E4FBF", "#253F99"

# ⚠️ Must match `hero.h1` in src/content/site-v2.ts, which src/pages/og.astro
# reads directly. This renderer cannot import a .ts module, so the string is
# duplicated here and the two change in the same commit. Swapped with the
# homepage on 1 Sep 2026.
HEADLINE = "Custom software for small businesses tired of doing it by hand."
EYEBROW = "Custom software and automation · Honolulu, Hawaiʻi"
# ⚠️ Must match the `.meta` span in src/pages/og.astro, which is the design of
# record; this renderer follows it. Changed 2 Sep 2026: it read
# "CONNECT · BUILD · ONGOING", the v3 copy's three engagements, retired
# 19 Aug 2026 and by then named on no page at all. These are the three offers
# the homepage actually sells. Measured at 435px in a 896px slot.
META = "AUTOMATION · CUSTOM APPS · ONGOING SUPPORT"

W, H = 1200, 630
PAD_X, PAD_TOP, PAD_BOTTOM = 72, 62, 56

# Headline size, mirroring `.middle h1` in src/pages/og.astro. See main().
DISPLAY_PX = 56


def load(name: str, size: int, weight: int | None = None) -> ImageFont.FreeTypeFont:
    """woff2 -> ttf in memory. Pillow cannot read woff2 directly."""
    f = TTFont(FONTS / name)
    if weight is not None and "fvar" in f:
        from fontTools.varLib import instancer
        f = instancer.instantiateVariableFont(f, {"wght": weight})
    buf = io.BytesIO()
    f.flavor = None
    f.save(buf)
    buf.seek(0)
    return ImageFont.truetype(buf, size)


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def tracked(draw, xy, text, font, fill, tracking):
    """Pillow has no letter-spacing, so draw glyph by glyph."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def main() -> int:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    wordmark = load("petrona-latin-var.woff2", 40, 600)
    # ⚠️ 56px / weight 500, matching `.middle h1` in src/pages/og.astro.
    # /og is the design of record and this file is the renderer that catches up
    # to it — both values changed on 1 Sep 2026 and for different reasons:
    #
    #   size: the headline went from 31 characters to 63 with the homepage
    #         swap, and at 74px it no longer fits the card.
    #   weight: this was 650 and the page has always said 500. The global h1
    #         rule is 650 and og.astro overrides it; the renderer was reading
    #         the global. The card has therefore shipped a heavier headline
    #         than the design since this script was written.
    display = load("petrona-latin-var.woff2", DISPLAY_PX, 500)
    sans = load("public-sans-latin-400.woff2", 15)
    mono = load("jetbrains-mono-latin-400.woff2", 14)

    # wordmark, top left
    d.text((PAD_X, PAD_TOP), "thread", font=wordmark, fill=INK)
    d.text((PAD_X + d.textlength("thread", font=wordmark), PAD_TOP), ".",
           font=wordmark, fill=ACCENT)

    # the bottom bar, measured up from the base so the middle can fill the rest
    bar_h = 10
    bottom_y = H - bar_h - PAD_BOTTOM
    d.rectangle([0, H - bar_h, W, H], fill=ACCENT)
    d.line([PAD_X, bottom_y - 28, W - PAD_X, bottom_y - 28], fill=RULE, width=1)
    tracked(d, (PAD_X, bottom_y - 12), META, mono, FAINT, 2.0)

    # motif, right of the meta line, at 1:1 with the 120x24 viewBox
    mx, my = W - PAD_X - 120, bottom_y - 14
    for pts in ([(2, 6), (40, 6), (44, 12), (74, 12)], [(2, 18), (40, 18), (44, 12), (74, 12)]):
        d.line([(mx + a, my + b) for a, b in pts], fill=ACCENT_DARK, width=2, joint="curve")
    d.line([mx + 2, my + 12, mx + 74, my + 12], fill=ACCENT_DARK, width=2)
    d.ellipse([mx + 73, my + 7, mx + 83, my + 17], fill=ACCENT)
    d.line([mx + 86, my + 12, mx + 118, my + 12], fill=ACCENT_DARK, width=2)

    # eyebrow and headline, sitting on the bottom bar.
    #
    # ⚠️ Wrapped at 21ch, not at the full column. og.astro caps the headline
    # with `max-width: 21ch`, and `ch` is the advance of "0" in the display
    # face — so measure that glyph rather than hardcoding a pixel width, and
    # the two wrap identically at any size. Wrapping at the full 1056px column
    # would give the same line count here but visibly longer lines.
    max_w = min(d.textlength("0", font=display) * 21, W - PAD_X * 2)
    lines = wrap(d, HEADLINE, display, max_w)
    line_h = int(DISPLAY_PX * 1.12)
    block_h = len(lines) * line_h
    top = bottom_y - 60 - block_h
    tracked(d, (PAD_X, top - 40), EYEBROW, sans, FAINT, 2.4)
    for i, ln in enumerate(lines):
        d.text((PAD_X, top + i * line_h), ln, font=display, fill=INK)

    img.save(OUT, optimize=True)
    print(f"  → og.png  {W}x{H}  {OUT.stat().st_size / 1024:.1f} KB")
    print(f"    headline: {HEADLINE!r}")
    print(f"    {DISPLAY_PX}px, {len(lines)} lines, block top {top}px of {H}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
