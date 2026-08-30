#!/usr/bin/env python3
"""
Build Thread's self-hosted font subsets.

Why this script exists
----------------------
Neither Newsreader nor JetBrains Mono contains U+02BB MODIFIER LETTER TURNED
COMMA — the ʻokina — in any Google-served subset OR in the full upstream
variable font. "Hawaiʻi", "Oʻahu" and "ʻAiea" all appear in the design set in
those two faces, so without this step the browser silently substitutes a
fallback face for that one character.

In all three families U+02BB and U+2018 LEFT SINGLE QUOTATION MARK are the same
mark: a mirrored comma. This script adds a cmap entry pointing U+02BB at the
`quoteleft` outline the font already draws (and U+02BC at `quoteright`). No new
outlines are created. This is how fonts that do ship U+02BB generally do it.

JetBrains Mono also loses U+2192 (→) to Google's latin subset despite having it
upstream; the subset range below adds it back.

Licence
-------
All three families are SIL OFL 1.1 with no Reserved Font Name asserted, so
modification and redistribution are permitted. See FONTS.md for
the provenance and modification record that ships alongside the files.

Requirements: fonttools, brotli.
    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/build-fonts.py
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"
CACHE = ROOT / ".fontcache"

GF = "https://github.com/google/fonts/raw/main/ofl"
SOURCES = {
    "Newsreader": f"{GF}/newsreader/Newsreader%5Bopsz,wght%5D.ttf",
    "JetBrainsMono": f"{GF}/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
    "Petrona": f"{GF}/petrona/Petrona%5Bwght%5D.ttf",
}

# Google's "latin" subset range, plus U+2192 which the design uses and the
# stock subset omits.
LATIN_RANGES = [
    (0x0000, 0x00FF), (0x0131, 0x0131), (0x0152, 0x0153), (0x02BB, 0x02BC),
    (0x02C6, 0x02C6), (0x02DA, 0x02DA), (0x02DC, 0x02DC), (0x0304, 0x0304),
    (0x0308, 0x0308), (0x0329, 0x0329), (0x2000, 0x206F), (0x2074, 0x2074),
    (0x20AC, 0x20AC), (0x2122, 0x2122), (0x2190, 0x2193), (0x2212, 0x2212),
    (0x2215, 0x2215), (0xFEFF, 0xFEFF), (0xFFFD, 0xFFFD),
]
UNICODES = [cp for lo, hi in LATIN_RANGES for cp in range(lo, hi + 1)]

# codepoint -> glyph that already draws the identical mark
ALIASES = {0x02BB: "quoteleft", 0x02BC: "quoteright"}


def fetch(name: str, url: str) -> Path:
    # curl rather than urllib: python.org builds on macOS often ship without a
    # usable CA bundle, and this needs to run on a plain checkout.
    CACHE.mkdir(exist_ok=True)
    dest = CACHE / f"{name}.ttf"
    if not dest.exists():
        print(f"  fetching {name}…")
        subprocess.run(
            ["curl", "-sSL", "--fail", "--max-time", "90", "-o", str(dest), url],
            check=True,
        )
    return dest


def add_okina(font: TTFont, label: str) -> None:
    """Point U+02BB/U+02BC at existing outlines. Idempotent."""
    glyphs = set(font.getGlyphOrder())
    added = []
    for table in font["cmap"].tables:
        if not table.isUnicode():
            continue
        for cp, glyph in ALIASES.items():
            if cp not in table.cmap and glyph in glyphs:
                table.cmap[cp] = glyph
                added.append(f"U+{cp:04X}->{glyph}")
    if added:
        print(f"  {label}: mapped {', '.join(sorted(set(added)))}")


def write_subset(font: TTFont, dest: Path) -> None:
    opts = subset.Options()
    opts.layout_features = ["*"]   # keep kerning and the rest
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.drop_tables += ["DSIG"]
    sub = subset.Subsetter(options=opts)
    sub.populate(unicodes=UNICODES)
    sub.subset(font)

    font.flavor = "woff2"
    dest.parent.mkdir(parents=True, exist_ok=True)
    font.save(dest)

    axes = [a.axisTag for a in font["fvar"].axes] if "fvar" in font else []
    kb = dest.stat().st_size / 1024
    print(f"  → {dest.name}  {kb:.1f} KB  axes={axes or 'static'}")


def verify() -> bool:
    """Every file we ship must carry the glyphs the design needs."""
    need = {
        "petrona-latin-var.woff2": [0x02BB, 0x2018, 0x00B7, 0x2014],
        "newsreader-latin-var.woff2": [0x02BB, 0x2018, 0x00B7, 0x2014, 0x00A7],
        "jetbrains-mono-latin-400.woff2": [0x02BB, 0x2192, 0x00B7, 0x00A7],
        "jetbrains-mono-latin-500.woff2": [0x02BB, 0x2192, 0x00B7, 0x00A7],
        "public-sans-latin-400.woff2": [0x02BB],
        "public-sans-latin-500.woff2": [0x02BB],
        "public-sans-latin-600.woff2": [0x02BB],
    }
    print("\nVerifying shipped files:")
    ok = True
    for name, cps in need.items():
        path = OUT / name
        if not path.exists():
            print(f"  MISSING FILE {name}")
            ok = False
            continue
        cmap = TTFont(path).getBestCmap()
        gaps = [f"U+{c:04X}" for c in cps if c not in cmap]
        print(f"  {name:34} {'ok' if not gaps else 'MISSING ' + ', '.join(gaps)}")
        ok = ok and not gaps
    return ok


def main() -> int:
    # Petrona replaced Newsreader as the display face on 29 Aug 2026 with the
    # Style C redesign. It runs through the same okina patch: whether it needs
    # one is reported by add_okina, and verify() below fails the build if the
    # shipped file lacks U+02BB either way.
    print("Petrona — variable, wght 400–700")
    pt = TTFont(fetch("Petrona", SOURCES["Petrona"]))
    add_okina(pt, "Petrona")
    write_subset(pt, OUT / "petrona-latin-var.woff2")

    # Newsreader is no longer referenced by global.css. Still built so the file
    # stays current if the display face is ever reverted; delete this block and
    # the file together if that stops being worth the 137 KB in the repo.
    print("Newsreader — variable, opsz 6–72 + wght 200–800 (unreferenced)")
    nr = TTFont(fetch("Newsreader", SOURCES["Newsreader"]))
    add_okina(nr, "Newsreader")
    write_subset(nr, OUT / "newsreader-latin-var.woff2")

    print("JetBrains Mono — instanced at the two weights the design uses")
    for weight in (400, 500):
        jb = TTFont(fetch("JetBrainsMono", SOURCES["JetBrainsMono"]))
        add_okina(jb, f"JetBrains Mono {weight}")
        jb = instancer.instantiateVariableFont(jb, {"wght": weight})
        write_subset(jb, OUT / f"jetbrains-mono-latin-{weight}.woff2")

    # Public Sans already ships U+02BB in its latin subset and the design uses
    # none of the glyphs it lacks, so it is copied through unmodified.
    print("Public Sans — unmodified, copied from @fontsource")
    src = ROOT / "node_modules" / "@fontsource" / "public-sans" / "files"
    for weight in (400, 500, 600):
        shutil.copy(
            src / f"public-sans-latin-{weight}-normal.woff2",
            OUT / f"public-sans-latin-{weight}.woff2",
        )
        print(f"  → public-sans-latin-{weight}.woff2")

    total = sum(f.stat().st_size for f in OUT.glob("*.woff2")) / 1024
    print(f"\nTotal shipped: {total:.1f} KB")
    return 0 if verify() else 1


if __name__ == "__main__":
    sys.exit(main())
