# CAD-Lab 0.4.0 — Verification Report

Date: **16 November 2026**. Release artifacts build directly into `main.js`, `manifest.json`, and `styles.css` with zero external runtime dependencies.

| Check | Result |
| --- | --- |
| TypeScript strict + esbuild browser bundle | Pass; `main.js` generated with zero external runtime dependencies (`obsidian` only) |
| Core geometry, standards (ISA-5.1, BS 1646, DIN 28004, IEC 62271-1/200), Library Manager, labelStyle, BOM TAG copy increment, Group/Ungroup, linePattern & Arrows, Match Prop, Scale, Offset Inside/Outside/Both, Bindings, Multi-Page, Clean YAML, Search & Print Fit PDF | **57/57 passed** (`tests/run.ts`) |
| Browser UI, Move/Copy pointer UX, Group/Ungroup, Visual Linetype spacing & Arrows, Tablet Export popovers, Single-row Desktop toolbar, High-contrast inputs, Bridge Jumps (`J`), 1mm grid status editor, iPad 1-finger pan / 2-finger pinch+pan, Post-Draw Tab, MA/SC/Offset modes, Shortcuts/Mouse, Multi-Page, Print Fit & Find Layer Highlight | **35/35 passed** (`tests/browser-tests.mjs`) |
| Independent DXF / YAML / SVG audit | `ezdxf` 1.1.4 `doc.audit()` & `validate_exchange.py`: **0 errors, 0 fixes** (`AC1024` strict R2010 tables & system dictionaries verified) |
| Community Plugin Store metadata | `manifest.json`, `versions.json`, `styles.css`, `README.md`, `CHANGELOG.md` verified |

## Verified Capabilities in 0.4.0

1. **International Standards Sub-trees**: Verified presence and hierarchical filtering of **ANSI/ISA-5.1**, **ISO 10628**, **ISO 14617** under `P&ID` and **IEC 60617**, **ANSI Y32**, **NFPA 79** under `Electrical multi-line` and `Electrical single-line` (182 total vector symbols).
2. **Centralized Library Manager**: Verified creation of custom discipline symbols with custom metadata attributes (`RATING`, `MATERIAL`, `NOTES`), port generation, and safe deletion that protects placed instances.
3. **Unified Grid & Snap to Grid Fix**: Verified in both unit and Playwright browser tests that `Camera.visualGridStep(renderer.gridStep)` remains locked to the configured millimeter step (`5 mm`) whether `Grid snap` is enabled or disabled, eliminating any secondary or shifted visual grid.
4. **Millimeter Dimensions, Dynamic Scale & ISO/ANSI Title Blocks**: Verified `DimensionEntity` (`DIM`) creation, SVG/PDF rendering, DXF round-trip, proportional element rescaling across drawing scales, and ISO 7200 Title Block generation.
5. **Vector PDF 1.4 Export**: Verified generation of valid `%PDF-1.4` binary documents with vector paths, dash patterns, text placement, and `xref` tables.
6. **Unidirectional Bill of Materials (BOM)**: Verified that `writeMarkdown` generates the Markdown BOM table from placed symbols and that manual row injections into the Markdown BOM table are ignored by `readMarkdown` and overwritten on the next graphical save.
