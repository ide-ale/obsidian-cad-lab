# CAD-Lab

CAD-Lab **1.0.0** is a portable vector CAD plugin for Obsidian dedicated to P&ID (Process and Instrumentation Diagrams) and electrical single-line and multi-line schematics. All geometry is stored in real millimeters (`mm`) inside `.cad.md` Markdown notes, accompanied by an automatically synchronized unidirectional **Bill of Materials (BOM)** table, DXF/DWG interchange, and native true-scale **Vector PDF** export.

The plugin runtime uses only Obsidian and standard Web APIs—zero Node built-ins or Electron dependencies—so the identical bundle runs on both desktop and mobile (iPadOS / Apple Pencil).

## Install and update

Copy `main.js`, `manifest.json`, and `styles.css` to `.obsidian/plugins/cad-lab/` in your vault, then enable **CAD-Lab** in Community plugins.

For development, `npm run deploy` builds, packages, and updates `.obsidian/plugins/cad-lab/` (plus shared custom `CAD Libraries/*.cad-library.json` sets) across configured Obsidian vaults automatically, backing up previous plugin files before replacing them.

## Start editing

Run **CAD-Lab: Create new CAD / P&ID drawing** (or **Create new CAD / P&ID drawing**) from the Command Palette or click the drafting compass ribbon icon.

Check the document bar:

- **CAD · EDITABLE**: All drawing, dimensioning, symbol library, sheet setup, and modification tools are active.
- **DXF · READ ONLY**: The source `.dxf` / `.dwg` file is being viewed safely. Click **Edit DXF directly** to edit ASCII `.dxf` files in place (without creating duplicate files), or **Convert to .cad.md…** to convert cleanly (with the option to move the source `.dxf` to Trash) and enable YAML properties, BOM tables, and multi-page sheets.

## Workspace, Tablet / Apple Pencil & Precision Grid

The workspace is designed around clean desktop and tablet CAD ergonomics:

- **Unified Millimeter Grid & Snap to Grid**: The visual reference grid is always anchored to the configured millimeter step (`1 mm`, `2 mm`, `2.5 mm`, `5 mm`, `10 mm`, `25 mm`, or custom). Toggling **Grid snap** (`SNAP` / `F9`) snaps drawing, placement, and modification operations directly to the existing reference grid without creating a secondary or shifted visual grid.
- **Full Screen Mode**: Click **Full screen** in the toolbar (or run **CAD-Lab: Toggle CAD full screen**) to expand the CAD workspace across the entire screen; press `Esc` to cancel tools, or click Exit Full Screen to restore.
- **Tablet & Apple Pencil**: In **Pen draws · fingers navigate** mode, one finger pans, two fingers pan and pinch-zoom, two-finger quick tap triggers **Undo**, three-finger quick tap triggers **Redo**, and Apple Pencil draws with elevated OSNAP indicators plus a configurable hold-delay precision loupe (default `1200 ms`). Tapping the live millimeter dimension badge opens the on-screen **123** precision numpad.
- **General Settings (`⚙`) & Flow Cross-Over Humps**: Use the gear button in the top bar to configure project-wide text/label defaults (`height`, `anchor`, `orientation`, scaling behavior), **Visio-style cross-over humps** (`lineJumps`, arc radius, priority axis) rendered on Canvas, SVG, and Vector PDF, plus tablet loupe delay and grid preferences.

## Commands and Exact Input

| Tool | Command / alias | Inputs |
| --- | --- | --- |
| Line | `LINE`, `L` | First point, successive endpoints; Enter ends |
| Polyline | `PLINE`, `PL` | Vertices; Enter ends; `CLOSE` closes; `U` removes last uncommitted vertex |
| Intelligent wire | `WIRE`, `W` | Start port/point, end port/point |
| Dimension (mm) | `DIM`, `DIMENSION`, `D` | First extension point, second extension point (aligned, horizontal, vertical, Ø, R) |
| Circle | `CIRCLE`, `C` | Center, radius point or numerical radius |
| Arc | `ARC`, `A` | Center, start point, end direction (counterclockwise) |
| Rectangle | `RECTANGLE`, `REC` | Opposite corners |
| Text | `TEXT`, `T` | Position, then text/height/angle dialog |
| Insert block | `INSERT`, `I` | Choose a symbol from the standard tree, then click insertion point |
| Move / copy | `MOVE` / `COPY`, `M` / `CO` | Select objects, specify base point and destination |
| Rotate | `ROTATE`, `RO` | Select objects, specify center and angle |
| Mirror | `MIRROR`, `MI` | Select objects, specify two mirror-axis points |
| Erase | `ERASE`, `E` | Selected objects |
| Trim / extend | `TRIM` / `EXTEND`, `TR` / `EX` | Select a LINE boundary, then click the target LINE segment |

## International Standards & Centralized Library Manager

The built-in vector catalog contains **182 editable schematic symbols** organized in a navigable, sortable hierarchy (`Library / Discipline › Normative Standard › Family › Symbol`):

- **P&ID (`P&ID`)**:
  - **ANSI/ISA-5.1**: Field instruments, panel instruments, DCS/PLC shared display and computer functions, actuated control valves (pneumatic, solenoid, motorized, hydraulic piston).
  - **ISO 10628**: Process equipment, centrifugal and positive-displacement pumps, compressors, rotary blowers, pressure vessels, distillation tray columns, agitated tanks, plate/shell heat exchangers, cyclones, heaters, coolers.
  - **ISO 14617**: Gate, globe, ball, butterfly, needle, diaphragm, plug, pinch, check, safety, angle, 3-way and 4-way valves, Y-strainers, inline filters, orifice plates, Venturi tubes, rupture discs, flame arrestors, sight glasses, expansion joints, steam traps, reducers, flanges.
- **Electrical Schematics (`Electrical multi-line` & `Electrical single-line`)**:
  - **IEC 60617**: Multi-line and single-line circuit breakers (1P–4P), RCDs, disconnectors, earthing switches, contactors, NO/NC contacts, thermal overload relays, fuses, SPDs, motors, transformers, CTs/VTs, meters, passive components, busbars, cables, UPS, PV.
  - **ANSI Y32 (IEEE 315)**: North American zigzag resistors, curved-plate capacitors, NEMA contactor coils, NEMA NO/NC contacts, thermal-magnetic breakers, overload heaters, dual-coil control transformers, drawout single-line breakers.
  - **NFPA 79**: Industrial machinery symbols including mushroom E-Stop, 3-position selector switches, pressure/float/photoelectric sensors, PLC Digital Input/Output modules, solenoid actuator coils, main machine disconnects.
- **General (`General` / `ISO 128`)**: Reference markers, arrows, frames, and geometric blocks.

### Centralized Library Manager

Click **Libraries** in the toolbar (or **Library Manager** in the Symbols tab) to:

1. Create custom symbols directly from selected canvas geometry or parametric templates.
2. Assign custom engineering disciplines (e.g., `Mechanical`, `Civil`, `Hydraulic`), standards, families, connection ports, and custom metadata attributes (`RATING`, `MATERIAL`, `MANUFACTURER`, `NOTES`, etc.).
3. Import external `.dxf` or `.cad-library.json` symbol libraries, export libraries to `CAD Libraries/`, or remove unused symbols.

## Precision Dimensions, Drawing Scale & Title Blocks (Cartigli)

Open the **Sheet & BOM** tab in the right sidebar to configure:

- **Standard Borders & Title Blocks**: ISO (`A4`, `A3`, `A2`, `A1`, `A0`) and ANSI (`ANSI-A` to `ANSI-D`) formats in Landscape or Portrait, with alphanumeric reference zones and a compiled ISO 7200 engineering **Title Block** (*Project, Title, Drawing No., Revision, Scale, Units, Standard, Author, Date, Company, Sheet, Notes*).
- **Dynamic Drawing Scale**: Choose `1:1`, `1:2`, `1:5`, `1:10`, `1:20`, `1:50`, `1:100`, `2:1`, or `5:1`. Enable **Auto-scale symbols & text** or click **Rescale placed elements** to adapt symbols, text heights, and dimension offsets automatically.

## Unidirectional Bill of Materials (BOM) in the Note

Every `.cad.md` note is structured like Excalidraw with three sections:

1. **YAML Frontmatter**: minimal `cad-lab: true` marker (scale, units, and component tags are never forced into note YAML).
2. **Markdown Prose & Unidirectional BOM Table**: Between `<!-- cad-bom:start -->` and `<!-- cad-bom:end -->`, CAD-Lab automatically generates a Markdown **Bill of Materials (BOM)** table listing every placed component (`#`, `Tag`, `Component / Symbol`, `Brand`, `Model`, `Standard`, `Category`, `Value / Rating`, `Description`, `Attributes`, `Layer`, `Notes`).
   - **Unidirectional Synchronization**: Adding, editing, or deleting components in the graphical CAD editor automatically updates the Markdown BOM table. Manually editing or adding rows in the Markdown table never alters or creates graphical entities in the drawing.
3. **Fenced `cad-data` JSON Block**: Stores the validated millimeter drawing model.

## DXF / DWG & True-Scale Vector PDF Export

- **PDF**: Select **Export Vector PDF** in the **Export** menu to generate a native **Vector PDF 1.4** document (`<Drawing>.pdf`) in true millimeter scale (complete with line weights, dash patterns, flow cross-over humps, sheet border, and Title Block), ready for printing on desktop and iPad.
- **DXF / DWG**: Export ASCII AutoCAD R2010 (`AC1024`) with layers, linetypes, blocks, attributes, dimensions, and `OBSIDIAN_CAD` XDATA. Import supports `.dxf` and ASCII-compatible `.dwg` files, while binary AutoCAD `.dwg` containers (`AC1009`–`AC1032`) are inspected losslessly to display release version, binary section counts, and embedded drawing thumbnails.

## Credits

Written and maintained by **Alessandro Abrami (ide-ale)** ([github.com/ide-ale/obsidian-cad-lab](https://github.com/ide-ale/obsidian-cad-lab)).

Design goals: zero runtime dependencies outside Obsidian and Web APIs, deterministic millimeter geometry, small bundle footprint, and transparent file formats. Released under the [MIT License](LICENSE).
