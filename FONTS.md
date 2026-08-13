# Fonts — provenance and modification record

Three families, latin subsets only, 219 KB total. Rebuild with:

```bash
python3 -m venv .venv && .venv/bin/pip install fonttools brotli
.venv/bin/python scripts/build-fonts.py
```

The script verifies glyph coverage on every file it writes and exits non-zero
if anything the design needs is missing.

## Files

| File | Source | Modified |
|---|---|---|
| `newsreader-latin-var.woff2` | [Newsreader](https://github.com/productiontype/Newsreader) via google/fonts, variable `opsz 6–72` + `wght 200–800` | yes — see below |
| `jetbrains-mono-latin-400.woff2` | [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) via google/fonts, instanced at `wght 400` | yes — see below |
| `jetbrains-mono-latin-500.woff2` | same, instanced at `wght 500` | yes — see below |
| `public-sans-latin-400.woff2` | [Public Sans](https://github.com/uswds/public-sans) via `@fontsource/public-sans` | no |
| `public-sans-latin-500.woff2` | same | no |
| `public-sans-latin-600.woff2` | same | no |

Newsreader italic is not shipped. Nothing in the design uses it.

## What was modified, and why

**Added U+02BB (ʻokina) to Newsreader and JetBrains Mono.**

Neither family contains U+02BB MODIFIER LETTER TURNED COMMA — not in any
Google-served subset, and not in the full upstream variable font. The design
sets "Hawaiʻi", "Oʻahu" and "ʻAiea" in both faces, including the §06 headline
at 44px. Without this, the browser silently substitutes a fallback face for
that single character, and which face depends on the visitor's OS.

In all three families U+02BB and U+2018 LEFT SINGLE QUOTATION MARK are the
same mark — a mirrored comma. The fix adds a `cmap` entry pointing U+02BB at
the `quoteleft` outline the font already draws. **No outlines were created or
altered.** This is how fonts that do ship U+02BB generally implement it.

**Restored U+2192 (→) to JetBrains Mono.** Present upstream, dropped by
Google's stock latin subset. The design uses it in the mobile "Scroll sideways
to read →" hint. The subset range in the build script adds it back.

Newsreader draws no arrow at any codepoint, so U+2192 in serif contexts (the
Specimen metric "7 → 1") is sourced from JetBrains Mono through a
`unicode-range: U+2192` rule in `src/styles/global.css`.

## Licence

All three families are SIL Open Font License 1.1. None asserts a Reserved Font
Name, so modification and redistribution are permitted without renaming.

- Newsreader — Copyright 2020 The Newsreader Project Authors
- JetBrains Mono — Copyright 2020 The JetBrains Mono Project Authors
- Public Sans — Copyright 2015 The Public Sans Project Authors

Full licence texts ship with each package under `node_modules/@fontsource*/LICENSE` and are committed to `licenses/`
and must be retained in any redistribution.
