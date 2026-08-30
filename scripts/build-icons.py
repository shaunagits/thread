#!/usr/bin/env python3
"""
Build the favicon and app-icon set from the Thread mark.

Why this exists separately from scripts/build-assets.sh
-------------------------------------------------------
build-assets.sh renders the og card with headless Chrome and needs
rsvg-convert and ImageMagick alongside it. This needs none of that: the icons
are one small SVG, and cairosvg plus Pillow render them anywhere Python runs.
Splitting them means the icons can be rebuilt after a palette change without a
browser on the machine, which is exactly the situation that left them on the
ocean palette after the graphite swap.

What it emits, and who reads each one:

    favicon.ico          16/32/48  legacy browser tabs, bookmarks
    icon-192.png         192       Android home screen, via the manifest
    icon-512.png         512       Android splash, via the manifest
    icon-maskable-512    512       Android adaptive icons — the mark is inset
                                   to the 80% safe zone so a circular or
                                   squircle mask cannot clip it
    apple-touch-icon     180       iOS home screen. iOS applies its own
                                   rounding and ignores transparency, so this
                                   one is drawn square and full-bleed.

favicon.svg is the source and is hand-edited; modern browsers prefer it over
the .ico for tabs. Keep its two colours in step with --color-paper and
--color-ink in global.css.

Requirements: cairosvg, pillow.
    pip install cairosvg pillow
"""

from __future__ import annotations

import io
import re
import sys
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "favicon.svg"
OUT = ROOT / "public"

# Kept in step with global.css by hand. If the palette moves again, these move
# with it and favicon.svg is edited to match.
PAPER = "#EDEEE9"
INK = "#171A18"


def render(svg: str, size: int) -> Image.Image:
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGBA")


def flatten(img: Image.Image, bg: str) -> Image.Image:
    ground = Image.new("RGBA", img.size, bg)
    return Image.alpha_composite(ground, img).convert("RGB")


def main() -> int:
    if not SRC.exists():
        print(f"  MISSING {SRC}")
        return 1
    svg = SRC.read_text()

    # A square, full-bleed version for the raster icons. The rounded corner in
    # favicon.svg is right for a browser tab and wrong for a home screen, where
    # every platform applies its own mask over the top of it.
    square = svg.replace('rx="6"', 'rx="0"')

    # The maskable variant insets the whole drawing to 80%, which is the safe
    # zone Android guarantees is never clipped. Without it a circular mask
    # takes the ends off the ribbon.
    inner = re.search(r"(<path .*?/>)", square, re.S).group(1)
    maskable = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        f'<rect width="32" height="32" fill="{PAPER}"/>'
        f'<g transform="translate(3.2 3.2) scale(0.8)">{inner}</g></svg>'
    )

    jobs = [
        ("icon-192.png", square, 192),
        ("icon-512.png", square, 512),
        ("icon-maskable-512.png", maskable, 512),
        ("apple-touch-icon.png", square, 180),
    ]
    for name, source, size in jobs:
        flatten(render(source, size), PAPER).save(OUT / name, optimize=True)
        print(f"  → {name}  {size}x{size}  {(OUT / name).stat().st_size / 1024:.1f} KB")

    # Multi-size .ico from the rounded source, which is what a tab shows.
    ico = [render(svg, s) for s in (48, 32, 16)]
    ico[0].save(OUT / "favicon.ico", sizes=[(48, 48), (32, 32), (16, 16)])
    print(f"  → favicon.ico  16/32/48  {(OUT / 'favicon.ico').stat().st_size / 1024:.1f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
