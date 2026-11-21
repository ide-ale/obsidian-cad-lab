import { englishBuiltinLabel } from '../core/legacy-labels';
import {
  CustomBlockSpec,
  LibrarySortOrder,
  createCustomBlock,
  deleteFromLibrary,
} from '../core/library-manager';
import {
  LINE_TYPES,
  LineDisciplinePreset,
  LineType,
  PIPING_LINE_PRESETS,
  SINGLE_LINE_PRESETS,
  customDashPattern,
  dashPattern,
  lineTypeChoices,
} from '../core/linetypes';
import { constrainedPoint, gridPoint, polarTrackPoint } from '../core/precision';
import { builtinLibrary } from '../core/library';
import {
  InputBindings,
  MiddleClickMode,
  RightClickMode,
  SHORTCUT_LABELS,
  ShortcutAction,
  WheelMode,
  defaultInputBindings,
  matchesKeyCombo,
  normalizeKeyCombo,
  sanitizeInputBindings,
} from '../core/bindings';
import {
  DRAWING_SCALES,
  SHEET_DIMENSIONS_MM,
  addDrawingPage,
  bestPrintFit,
  deleteDrawingPage,
  ensurePages,
  ensureSheetSetup,
  fitSheetToDrawing,
  moveDrawingPage,
  renameDrawingPage,
  rescaleDrawingElements,
  stampSheetToEntities,
  switchDrawingPage,
  syncActivePage,
  worldScaleMultiplier,
} from '../core/sheet';
import { setToolIcon } from './icons';
import {
  ArrowPlacement,
  ArrowStyle,
  Attachment,
  Block,
  ConnectorRoutingMode,
  DimensionKind,
  Drawing,
  Entity,
  Insert,
  JumpPriority,
  JumpScope,
  LabelAnchor,
  LabelOrientation,
  Layer,
  Line,
  LineArrows,
  LineDiscipline,
  Point,
  Polyline,
  SheetOrientation,
  SheetSize,
  TitleBlockData,
  TitleBlockMode,
  TitleBlockStandard,
  Wire,
  clone,
  defaultProjectSettings,
  isEditable,
  uid,
} from '../core/model';
import { CommandStack } from '../core/history';
import {
  Grip,
  GripMode,
  LineCrossing,
  OffsetSideMode,
  SearchMatch,
  add,
  alignEntities,
  angle,
  applyGripDrag,
  around,
  autoExtend,
  autoTrim,
  boundsOf,
  copyEntities,
  dimensionLabel,
  distance,
  drawingBounds,
  entityBounds,
  entityGrips,
  explodeEntity,
  filletLines,
  findAllLineCrossings,
  groupEntities,
  hitTest,
  identity,
  joinEntities,
  matchProperties,
  mergeLayers,
  normAngle,
  offsetBothSides,
  offsetEntity,
  polar,
  routeWire,
  scaleEntity,
  searchDrawing,
  setLineCrossingJump,
  selectBox,
  sub,
  toggleLineCrossingJump,
  transformEntity,
  ungroupEntity,
} from '../core/geometry';
import { AlignmentGuide, Snap, SnapIndex } from '../core/snap';
import { mergeLibrary } from '../io/dxf';
import { extractBom } from '../io/markdown';
import { PdfExporter } from '../io/pdf';
import { CanvasRenderer, Overlay, Theme, aciColor, toSvg } from '../render/renderer';

const ACI_PRESETS: [string, string][] = [
  ['7', 'Default (7)'],
  ['1', 'Red (1)'],
  ['2', 'Yellow (2)'],
  ['3', 'Green (3)'],
  ['4', 'Cyan (4)'],
  ['5', 'Blue (5)'],
  ['6', 'Magenta (6)'],
  ['8', 'Dark Gray (8)'],
  ['9', 'Light Gray (9)'],
];

export type Tool =
  | 'PAN'
  | 'SELECT'
  | 'L'
  | 'PL'
  | 'W'
  | 'C'
  | 'A'
  | 'REC'
  | 'DIM'
  | 'T'
  | 'I'
  | 'M'
  | 'CO'
  | 'RO'
  | 'SC'
  | 'MI'
  | 'MA'
  | 'E'
  | 'TR'
  | 'EX'
  | 'O'
  | 'J'
  | 'F'
  | 'DIST';

export interface Field {
  key: string;
  label: string;
  value: string;
  type?: 'number' | 'text';
}

export type RibbonDock = 'left' | 'right' | 'top' | 'bottom';
export type PanelDock = 'right' | 'left' | 'top' | 'bottom' | 'floating';

export interface EditorSettings {
  theme?: Theme;
  tablet?: boolean;
  penOnly?: boolean;
  penLoupeDelayMs?: number;
  gridSnap?: boolean;
  gridStep?: number;
  ortho?: boolean;
  polar?: boolean;
  polarAngle?: number;
  tracking?: boolean;
  dynamicInput?: boolean;
  postDrawMeasureTab?: boolean;
  ribbonDock?: RibbonDock;
  panelDock?: PanelDock;
  panelFloatingCollapsed?: boolean;
  panelFloatingPos?: { x: number; y: number };
  inputBindings?: InputBindings;
  defaultLabelAnchor?: LabelAnchor;
  defaultTextHeight?: number;
  defaultLabelOrientation?: LabelOrientation;
  dynamicPortConnectors?: boolean;
  connectorRoutingMode?: ConnectorRoutingMode;
}

export interface EditorHost {
  changed(d: Drawing): void;
  newDrawing?(): Promise<void>;
  save?(): Promise<void>;
  documentName?: string;
  frontmatter?: Record<string, unknown>;
  notice(message: string): void;
  exportDxf(d: Drawing): Promise<void>;
  exportSvg(svg: string): Promise<void>;
  exportPdf?(pdfBytes: Uint8Array, d: Drawing): Promise<void>;
  importLibrary(): Promise<Drawing | undefined>;
  saveLibrary(d: Drawing): Promise<void>;
  convert?(d: Drawing): Promise<void>;
  editDxfInPlace?(d: Drawing): Promise<void>;
  settingsChanged?(settings: EditorSettings): void;
  insertPresetYaml?(d: Drawing): void;
  saveFrontmatter?(nextFrontmatter: Record<string, unknown>, d: Drawing): void;
}

const tools: [Tool, string][] = [
  ['SELECT', 'Select'],
  ['PAN', 'Pan'],
  ['L', 'Line'],
  ['PL', 'Polyline'],
  ['W', 'Wire'],
  ['C', 'Circle'],
  ['A', 'Arc'],
  ['REC', 'Rectangle'],
  ['DIM', 'Dimension'],
  ['T', 'Text'],
  ['I', 'Insert block'],
  ['M', 'Move'],
  ['CO', 'Copy'],
  ['RO', 'Rotate'],
  ['SC', 'Scale'],
  ['MI', 'Mirror'],
  ['MA', 'Match Prop'],
  ['O', 'Offset'],
  ['J', 'Bridge Jump'],
  ['F', 'Fillet'],
  ['TR', 'Trim'],
  ['EX', 'Extend'],
  ['E', 'Erase'],
  ['DIST', 'Measure'],
];

const prompts: Record<Tool, string[]> = {
  PAN: ['Drag to pan • two fingers pan and pinch-zoom'],
  SELECT: ['Click or drag to select • drag grips to edit • drag selected objects to move'],
  L: ['Specify start point of line', 'Specify end point of line'],
  PL: [
    'Specify first vertex',
    'Specify next vertex • Enter/Double-click to finish • Close to close',
  ],
  W: ['Specify start port or point', 'Specify end port or point'],
  C: ['Specify center', 'Specify radius or point on circle'],
  A: ['Specify center', 'Specify start point', 'Specify end direction (counterclockwise)'],
  REC: ['Specify first corner', 'Specify opposite corner'],
  DIM: ['Specify first extension point in mm', 'Specify second extension point in mm'],
  T: ['Specify text insertion point'],
  I: ['Choose a symbol and specify insertion point'],
  M: ['Click object to grab & drag, or specify base point', 'Specify destination'],
  CO: ['Click destination to place copy (or drag from object)', 'Specify destination'],
  RO: ['Specify rotation center', 'Specify angle or press Enter to apply rotation'],
  SC: ['Specify scale base point', 'Specify destination point or enter scale factor'],
  MI: ['Specify first point of mirror axis', 'Specify second point of mirror axis'],
  MA: [
    'Click source object to copy properties from',
    'Click destination object(s) to apply properties',
  ],
  O: [
    'Click entity to offset (choose Inside / Outside / Both / Cursor side above)',
    'Click side to place offset copy',
  ],
  J: ['Click near any line intersection to toggle a cross-over bridge hump'],
  F: ['Select first line to fillet', 'Select second line to fillet'],
  TR: ['Click any segment to trim to nearest intersection (or pre-select cutting edges)'],
  EX: ['Click near line end to extend to nearest boundary (or pre-select boundaries)'],
  E: ['Select objects to erase'],
  DIST: ['Specify first measurement point', 'Specify second measurement point'],
};

const symbolIconCache = new Map<string, string>();

export function element<K extends keyof HTMLElementTagNameMap>(
  parent: HTMLElement,
  tag: K,
  className = '',
  text = '',
): HTMLElementTagNameMap[K] {
  const el = parent.ownerDocument.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  parent.append(el);
  return el;
}

export function button(
  parent: HTMLElement,
  label: string,
  action: () => void,
  title = label,
): HTMLButtonElement {
  const b = element(parent, 'button', '', label);
  b.type = 'button';
  b.title = title;
  b.setAttribute('aria-label', title);
  b.addEventListener('click', action);
  return b;
}

function choice(
  parent: HTMLElement,
  options: [string, string][],
  value: string,
  onChange: (v: string) => void,
): HTMLSelectElement {
  const select = element(parent, 'select');
  for (const [v, label] of options) {
    const o = element(select, 'option', '', label);
    o.value = v;
  }
  select.value = value;
  select.addEventListener('change', () => onChange(select.value));
  return select;
}

export class CadEditor {
  readonly root: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  readonly renderer: CanvasRenderer;
  stack: CommandStack;
  tool: Tool = 'SELECT';
  selected = new Set<string>();
  currentLayer = '0';
  currentBlock = '';
  ortho = false;
  gridSnap = false;
  gridStep = 1;
  polar = true;
  polarAngle = 45;
  tracking = true;
  dynamicInput = true;
  penOnly = true;
  offsetDistance = 10;
  filletRadius = 0;
  currentLineType: LineType | undefined;
  currentLinePattern: number[] | undefined;
  currentArrows: LineArrows | undefined;
  currentColor: number | undefined;
  currentDiscipline: LineDiscipline = 'general';
  currentServiceTag = '';
  currentPipeSpec = '';
  currentLineNotes = '';
  ribbonDock: RibbonDock = 'left';
  panelDock: PanelDock = 'right';
  panelFloatingCollapsed = false;
  panelFloatingPos?: { x: number; y: number };
  private hoverCrossing?: Point;
  private activeCrossingKey?: string;
  private bridgePopEl!: HTMLElement;
  private floatingCollapseBtn?: HTMLButtonElement;
  private sideContainerEl!: HTMLElement;
  private openLayers = new Set<string>();
  private interactiveLabelPos = false;
  dynamicPortConnectors = false;
  connectorRoutingMode: ConnectorRoutingMode = 'straight_to_polyline';
  private openPropSections = new Set<string>();
  private libraryBrowseOpen = false;
  private postDimSection: 'layer' | 'style' | 'arrow' | null = null;
  private statusCoordsEl!: HTMLElement;
  private statusGridBtn!: HTMLButtonElement;
  private statusTailEl!: HTMLElement;
  private frontmatter?: Record<string, unknown>;
  private virtualTitleEl?: HTMLElement;
  private colorSelect!: HTMLSelectElement;
  private colorSwatch!: HTMLElement;
  private libraryFilter = '';
  private standardFilter = '';
  private groupFilter = '';
  private librarySearch = '';
  private librarySort: LibrarySortOrder = 'name';
  private fullPlaceholder?: Comment;
  private fullscreenButton?: HTMLButtonElement;
  private pointerTypes = new Map<number, string>();
  private penActive?: number;
  private penPreviewStart?: Point;
  private penPreviewAttachment?: Attachment;
  private dimension: HTMLElement;
  private toolLabel: HTMLElement;
  osnap = true;
  tablet = false;
  rotation = 90;
  private readonly toolbar: HTMLElement;
  private layerSelect: HTMLSelectElement;
  private scaleSelect: HTMLSelectElement;
  private lastTool: Tool = 'L';
  private readonly side: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly status: HTMLElement;
  private readonly command: HTMLInputElement;
  private readonly prompt: HTMLElement;
  private readonly snapIndex = new SnapIndex();
  private snap?: Snap;
  private points: Point[] = [];
  private attachments: (Attachment | undefined)[] = [];
  private cursor?: Point;
  private cursorScreen?: Point;
  private pen = false;
  private penLoupeDelayMs = 1200;
  private penLoupeVisible = false;
  private penLoupeTimer?: number;
  private penLoupeOrigin?: Point;
  private pointers = new Map<number, Point>();
  private gesture?: { center: Point; distance: number };
  private touchTapGesture?: {
    maxCount: number;
    startTime: number;
    moved: boolean;
    startPoints: Map<number, Point>;
  };
  private pointerStart?: {
    screen: Point;
    world: Point;
    pan: boolean;
    shift: boolean;
    id: number;
  };
  private dragBox?: Overlay['box'];
  private panned = false;
  private space = false;
  private frame = 0;
  private disposed = false;
  private observer: ResizeObserver;
  private selectedTab = 'library';
  private lastRenderedTab = 'library';
  private toolButtons = new Map<Tool, HTMLButtonElement>();
  private toggles = new Map<string, HTMLButtonElement>();
  private cleanups: (() => void)[] = [];
  private message = '';
  private numeric?: HTMLElement;
  private modalClose?: () => void;
  private revision = 0;

  // Smart Guides, Polar Ray, Grips, Direct Drag & Dynamic Input state
  private guides: AlignmentGuide[] = [];
  private polarRay?: { origin: Point; angle: number };
  private activeGrip?: Grip;
  private gripMode: GripMode = 'stretch';
  private draggingGrip = false;
  private draggingSelection = false;
  private draggingCopy = false;
  private dragOriginWorld?: Point;
  private offsetSourceId?: string;
  private offsetSide: OffsetSideMode = 'pointer';
  private scaleFactor = 2;
  private matchSourceId?: string;
  private highlightId?: string;
  private postDrawMeasureTab = false;
  private inputBindings: InputBindings = defaultInputBindings();
  private filletFirstId?: string;
  private dynHud: HTMLElement;
  private dynDistInput: HTMLInputElement;
  private dynAngleInput: HTMLInputElement;
  private dynMode: 'dist' | 'angle' = 'dist';
  private dynEditing = false;
  private selectionBar: HTMLElement;
  private toolBarEl!: HTMLElement;
  private postDimEl!: HTMLElement;
  private pageBar!: HTMLElement;

  constructor(
    container: HTMLElement,
    drawing: Drawing,
    private readonly host: EditorHost,
    private readonly readOnly = false,
    settings: EditorSettings = {},
  ) {
    this.root = element(container, 'div', 'cad-root');
    this.root.tabIndex = -1;
    this.root.lang = 'en';
    this.root.dataset.mode = readOnly ? 'read-only' : 'editable';
    this.root.dataset.theme = settings.theme ?? 'adaptive';
    this.frontmatter = host.frontmatter;

    this.tablet = settings.tablet ?? false;
    this.penOnly = settings.penOnly ?? true;
    this.penLoupeDelayMs = settings.penLoupeDelayMs ?? 1200;
    this.gridSnap = settings.gridSnap ?? false;
    this.gridStep = settings.gridStep && settings.gridStep > 0 ? settings.gridStep : 1;
    this.ortho = settings.ortho ?? false;
    this.polar = settings.polar ?? true;
    this.polarAngle = settings.polarAngle ?? 45;
    this.tracking = settings.tracking ?? true;
    this.dynamicInput = settings.dynamicInput ?? true;
    this.postDrawMeasureTab = settings.postDrawMeasureTab ?? false;
    this.dynamicPortConnectors =
      settings.dynamicPortConnectors ?? drawing.projectSettings?.dynamicPortConnectors ?? false;
    this.connectorRoutingMode =
      settings.connectorRoutingMode ??
      drawing.projectSettings?.connectorRoutingMode ??
      'straight_to_polyline';
    if (
      settings.defaultLabelAnchor !== undefined ||
      settings.defaultTextHeight !== undefined ||
      settings.defaultLabelOrientation !== undefined ||
      settings.dynamicPortConnectors !== undefined ||
      settings.connectorRoutingMode !== undefined
    ) {
      drawing.projectSettings = {
        ...defaultProjectSettings(),
        ...(drawing.projectSettings ?? {}),
        ...(drawing.projectSettings?.defaultLabelAnchor === undefined && settings.defaultLabelAnchor
          ? { defaultLabelAnchor: settings.defaultLabelAnchor }
          : {}),
        ...(drawing.projectSettings?.defaultTextHeight === undefined && settings.defaultTextHeight
          ? { defaultTextHeight: settings.defaultTextHeight }
          : {}),
        ...(drawing.projectSettings?.defaultLabelOrientation === undefined &&
        settings.defaultLabelOrientation
          ? { defaultLabelOrientation: settings.defaultLabelOrientation }
          : {}),
        dynamicPortConnectors: this.dynamicPortConnectors,
        connectorRoutingMode: this.connectorRoutingMode,
      };
    }
    this.ribbonDock = settings.ribbonDock ?? 'left';
    this.panelDock = settings.panelDock ?? 'right';
    this.panelFloatingCollapsed = settings.panelFloatingCollapsed ?? false;
    this.panelFloatingPos = settings.panelFloatingPos;
    this.inputBindings = sanitizeInputBindings(settings.inputBindings);
    this.root.classList.toggle('cad-tablet', this.tablet);
    this.root.dataset.ribbonDock = this.ribbonDock;
    this.root.dataset.panelDock = this.panelDock;

    // Compact unified Header Bar (Document + Mode Badge + Primary Actions + Controls)
    this.toolbar = element(this.root, 'div', 'cad-toolbar');
    this.toolbar.setAttribute('role', 'toolbar');
    const docMeta = element(this.toolbar, 'div', 'cad-doc-pill');
    element(
      docMeta,
      'strong',
      '',
      host.documentName ?? (readOnly ? 'DXF drawing' : 'Untitled CAD drawing'),
    );
    element(docMeta, 'span', 'cad-mode-badge', readOnly ? 'DXF · READ ONLY' : 'CAD · EDITABLE');

    if (readOnly) {
      const banner = element(this.root, 'div', 'cad-readonly-banner');
      element(
        banner,
        'span',
        '',
        'This DXF is read-only. Edit the DXF directly in place or convert it to a .cad.md note (adds BOM, YAML & multi-page).',
      );
      const actions = element(banner, 'div', 'cad-readonly-actions');
      if (host.editDxfInPlace)
        button(actions, 'Edit DXF directly', () =>
          this.run(() => host.editDxfInPlace!(this.drawing)),
        );
      if (host.convert)
        button(actions, 'Convert to .cad.md…', () => this.run(() => host.convert!(this.drawing)));
    }

    // Grouped Import / Export dropdown menu (mounted via fixed positioning so scrollable toolbars never clip it)
    const exportWrap = element(this.toolbar, 'div', 'cad-menu-wrap');
    const exportMenu = element(this.root, 'div', 'cad-dropdown-menu cad-floating-popover');
    exportMenu.hidden = true;
    const exportBtn = button(
      exportWrap,
      '',
      () => {
        const willOpen = exportMenu.hidden;
        this.closeFloatingPopovers();
        if (willOpen) {
          exportMenu.hidden = false;
          this.placeFloatingPopover(exportBtn, exportMenu);
        }
      },
      'Import & Export',
    );
    setToolIcon(exportBtn, 'EXPORT', 'Export ▾');
    button(exportMenu, 'Export DXF (R2010)', () => {
      exportMenu.hidden = true;
      this.run(() => this.host.exportDxf(this.drawing));
    });
    button(exportMenu, 'Export SVG', () => {
      exportMenu.hidden = true;
      this.run(() => this.host.exportSvg(toSvg(this.drawing)));
    });
    button(exportMenu, 'Export Vector PDF (in scale)', () => {
      exportMenu.hidden = true;
      this.run(async () => {
        const bytes = new PdfExporter().exportBytes(this.drawing, {
          title: this.host.documentName,
        });
        if (this.host.exportPdf) await this.host.exportPdf(bytes, this.drawing);
        else this.say(`Vector PDF generated (${bytes.byteLength} bytes).`, true);
      });
    });
    button(exportMenu, 'Print / Fit to Standard Paper…', () => {
      exportMenu.hidden = true;
      this.openPrintModal();
    });
    if (!readOnly) {
      button(exportMenu, 'Import DXF / JSON Library…', () => {
        exportMenu.hidden = true;
        this.run(async () => {
          const imported = await this.host.importLibrary();
          if (!imported || this.disposed) return;
          let n = 0;
          this.transact('Import library', (d) => {
            n = mergeLibrary(d, imported);
          });
          this.say(`${n} blocks added to the library.`, true);
        });
      });
      button(exportMenu, 'Save Library JSON to Vault', () => {
        exportMenu.hidden = true;
        this.run(() => this.host.saveLibrary(this.drawing));
      });
    }
    this.listen(this.root, 'pointerdown', (ev) => {
      if (!exportWrap.contains(ev.target as Node) && !exportMenu.contains(ev.target as Node))
        exportMenu.hidden = true;
    });

    if (!readOnly) {
      button(
        this.toolbar,
        'Libraries',
        () => this.openLibraryManager(),
        'Open centralized Library Manager',
      );
      button(
        this.toolbar,
        'Sheet & BOM',
        () => {
          this.selectedTab = 'sheet';
          this.root.classList.add('cad-panel-open');
          this.root.classList.remove('cad-panel-collapsed');
          this.renderSide();
        },
        'Configure Sheet, Scale, Title Block and BOM',
      );
    }
    const findBtn = button(
      this.toolbar,
      '',
      () => this.openFindModal(),
      'Find & highlight objects / layers (Ctrl+F)',
    );
    setToolIcon(findBtn, 'FIND', 'Find');
    const pagesBtn = button(
      this.toolbar,
      '',
      () => this.openPagesModal(),
      'Manage Schematic Pages',
    );
    setToolIcon(pagesBtn, 'PAGES', 'Pages');

    const theme = choice(
      this.toolbar,
      [
        ['adaptive', 'Obsidian Adaptive'],
        ['dark', 'Technical Dark'],
        ['light', 'Technical Paper'],
        ['blueprint', 'Blueprint'],
      ],
      settings.theme ?? 'adaptive',
      (v) => {
        this.renderer.theme = v as Theme;
        this.root.dataset.theme = v;
        this.persistSettings();
        this.render();
      },
    );
    theme.setAttribute('aria-label', 'Theme');

    button(
      this.toolbar,
      this.tablet ? 'Tablet' : 'Desktop',
      () => {
        this.tablet = !this.tablet;
        this.root.classList.toggle('cad-tablet', this.tablet);
        mode.textContent = this.tablet ? 'Tablet' : 'Desktop';
        this.persistSettings(true);
        this.render();
      },
      'Switch Desktop / Tablet mode',
    );
    const mode = this.toolbar.lastElementChild as HTMLButtonElement;

    button(
      this.toolbar,
      'Inspector',
      () => {
        this.toggleInspectorCollapse();
        this.render();
      },
      'Toggle right inspector panel',
    );
    const settingsBtn = button(
      this.toolbar,
      '',
      () => this.openGeneralSettings(),
      'General project & editor settings',
    );
    setToolIcon(settingsBtn, 'GEAR');
    settingsBtn.setAttribute('aria-label', 'General settings');
    this.fullscreenButton = button(this.toolbar, '', () => this.toggleFullscreen(), 'Full screen');
    setToolIcon(this.fullscreenButton, 'FULL', 'Full screen');

    if (readOnly && host.convert)
      button(this.toolbar, 'Edit drawing', () => this.run(() => this.host.convert!(this.drawing)));

    const drawingOptions = element(this.toolbar, 'div', 'cad-drawing-options');
    this.scaleSelect = choice(
      drawingOptions,
      DRAWING_SCALES.map(([val]) => [val, `Scale ${val}`]),
      drawing.scale ?? drawing.sheet?.scale ?? '1:1',
      (v) => {
        this.transact('Change scale', (d) => {
          const sh = ensureSheetSetup(d, this.host.documentName);
          if (sh.autoScaleInserts) rescaleDrawingElements(d, v);
          else {
            d.scale = v;
            sh.scale = v;
            sh.titleBlock.scale = v;
          }
        });
      },
    );
    this.scaleSelect.setAttribute('aria-label', 'Drawing scale');
    this.scaleSelect.disabled = readOnly;

    this.layerSelect = choice(
      drawingOptions,
      drawing.layers.map((l) => [
        l.id,
        `Layer: ${l.name}${l.locked ? ' [locked]' : !l.visible ? ' [hidden]' : ''}`,
      ]),
      drawing.layers.find((l) => l.visible && !l.locked)?.id ?? '0',
      (v) => {
        this.currentLayer = v;
        this.updateColorSwatch();
        this.updatePrompt();
      },
    );
    this.layerSelect.setAttribute('aria-label', 'Current layer');
    this.layerSelect.disabled = readOnly;

    const colorWrap = element(drawingOptions, 'div', 'cad-color-wrap');
    this.colorSwatch = element(colorWrap, 'span', 'cad-color-dot');
    this.colorSelect = choice(
      colorWrap,
      [['BYLAYER', 'Color: By layer'], ...ACI_PRESETS],
      'BYLAYER',
      (v) => {
        this.currentColor = v === 'BYLAYER' ? undefined : Number(v);
        this.updateColorSwatch();
      },
    );
    this.colorSelect.setAttribute('aria-label', 'Current color');
    this.colorSelect.disabled = readOnly;

    const styleCtrl = this.createLinetypeControl(drawingOptions, {
      ariaLabel: 'Current linetype',
      includeByLayer: true,
      value: 'BYLAYER',
      pattern: this.currentLinePattern,
      disabled: readOnly,
      onChange: (v, pat) => {
        this.currentLineType = v === 'BYLAYER' ? undefined : (v as LineType);
        this.currentLinePattern = v === 'BYLAYER' ? undefined : pat;
      },
    });
    void styleCtrl;

    const penMode = choice(
      drawingOptions,
      [
        ['pen', 'Pen draws · fingers navigate'],
        ['all', 'Pen and finger draw'],
      ],
      this.penOnly ? 'pen' : 'all',
      (v) => {
        this.penOnly = v === 'pen';
        this.persistSettings();
      },
    );
    penMode.className = 'cad-pen-mode';
    penMode.setAttribute('aria-label', 'Input tablet');

    // Main workspace body: Vertical Tool Rail (left) + Canvas Stage (center) + Inspector Sidebar (right)
    const body = element(this.root, 'div', 'cad-body');

    const ribbon = element(body, 'div', 'cad-ribbon');
    ribbon.setAttribute('role', 'toolbar');
    ribbon.setAttribute('aria-label', 'Drawing and modification tools');
    for (const [group, ids] of [
      ['Nav', ['SELECT', 'PAN', 'DIST']],
      ['Draw', ['L', 'PL', 'W', 'C', 'A', 'REC', 'DIM', 'T', 'I']],
      ['Modify', ['M', 'CO', 'RO', 'SC', 'MI', 'MA', 'O', 'J', 'F', 'TR', 'EX', 'E']],
    ] as [string, Tool[]][]) {
      const section = element(ribbon, 'section', 'cad-tool-group');
      element(section, 'div', 'cad-tool-group-title', group);
      const items = element(section, 'div', 'cad-tool-group-items');
      for (const tool of ids) {
        const name = tools.find(([id]) => id === tool)![1];
        const b = button(items, '', () => this.setTool(tool), `${name} (${tool})`);
        setToolIcon(b, tool, name);
        this.toolButtons.set(tool, b);
        if (readOnly && !['SELECT', 'PAN', 'DIST'].includes(tool)) {
          b.disabled = true;
          b.title = 'DXF is read-only. Use Open editable drawing.';
        }
      }
      if (group === 'Modify') {
        const grpBtn = button(items, '', () => this.groupSelection(), 'Group (G)');
        setToolIcon(grpBtn, 'GROUP', 'Group');
        grpBtn.disabled = readOnly;
        const ungrpBtn = button(items, '', () => this.ungroupSelection(), 'Ungroup (UG)');
        setToolIcon(ungrpBtn, 'UNGROUP', 'Ungroup');
        ungrpBtn.disabled = readOnly;
      }
    }

    this.stage = element(body, 'div', 'cad-stage');
    this.canvas = element(this.stage, 'canvas', 'cad-canvas');
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute(
      'aria-label',
      readOnly ? 'DXF viewer' : 'CAD drawing area in millimeters',
    );
    this.renderer = new CanvasRenderer(this.canvas);
    this.renderer.theme = settings.theme ?? 'adaptive';
    this.renderer.gridStep = this.gridStep;

    const context = element(this.stage, 'div', 'cad-context-bar');
    this.toolLabel = element(context, 'strong', '', 'Select');
    this.dimension = element(context, 'span', 'cad-dimensions');
    this.dimension.title = 'Tap to enter exact numeric length or angle';
    this.dimension.addEventListener('click', () => {
      if (!this.readOnly) this.toggleNumeric();
    });

    // Floating Dynamic Input HUD (follows cursor / pen safely)
    this.dynHud = element(this.stage, 'div', 'cad-dyn-hud');
    this.dynHud.hidden = true;
    const distWrap = element(this.dynHud, 'label', 'cad-dyn-field');
    element(distWrap, 'span', '', 'L');
    this.dynDistInput = element(distWrap, 'input');
    this.dynDistInput.type = 'text';
    this.dynDistInput.setAttribute('aria-label', 'Dynamic length in mm');
    element(distWrap, 'small', '', 'mm');

    const angWrap = element(this.dynHud, 'label', 'cad-dyn-field');
    element(angWrap, 'span', '', '∠');
    this.dynAngleInput = element(angWrap, 'input');
    this.dynAngleInput.type = 'text';
    this.dynAngleInput.setAttribute('aria-label', 'Dynamic angle in degrees');
    element(angWrap, 'small', '', '°');

    const setupDynInput = (inp: HTMLInputElement, kind: 'dist' | 'angle'): void => {
      inp.addEventListener('focus', () => {
        this.dynEditing = true;
        this.dynMode = kind;
        inp.select();
      });
      inp.addEventListener('blur', () => {
        this.dynEditing = false;
      });
      inp.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.tablet && !this.numeric) this.toggleNumeric();
      });
      inp.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Tab') {
          e.preventDefault();
          const next = kind === 'dist' ? this.dynAngleInput : this.dynDistInput;
          this.dynMode = kind === 'dist' ? 'angle' : 'dist';
          next.focus();
          next.select();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.commitDynamicInput();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.dynEditing = false;
          this.cancel();
        }
      });
    };
    setupDynInput(this.dynDistInput, 'dist');
    setupDynInput(this.dynAngleInput, 'angle');

    // Selection Context Action Bar (floating pill when entities are selected)
    this.selectionBar = element(this.stage, 'div', 'cad-selection-bar');
    this.selectionBar.hidden = true;

    // Active Tool Options Bar (Offset inside/outside/both, Scale factor, Match Prop)
    this.toolBarEl = element(this.stage, 'div', 'cad-tool-options');
    this.toolBarEl.hidden = true;

    // Post-Draw Measurement Input Tab (appears right below the newly drawn entity)
    this.postDimEl = element(this.stage, 'div', 'cad-post-dim-tab');
    this.postDimEl.hidden = true;

    // Interactive Crossing Bridge Popover (for toggling & choosing horizontal/vertical bridge axis)
    this.bridgePopEl = element(this.stage, 'div', 'cad-bridge-popover');
    this.bridgePopEl.hidden = true;

    const hud = element(this.stage, 'div', 'cad-hud');
    button(hud, 'Panels', () => {
      this.root.classList.toggle('cad-panel-open');
      this.render();
    });
    if (!readOnly) {
      const undoBtn = button(hud, '', () => this.undo(), 'Undo');
      setToolIcon(undoBtn, 'UNDO');
      const redoBtn = button(hud, '', () => this.redo(), 'Redo');
      setToolIcon(redoBtn, 'REDO');
      button(hud, '123', () => this.toggleNumeric(), 'Exact length and angle');
      const finBtn = button(hud, '', () => this.finish(), 'Finish command');
      setToolIcon(finBtn, 'CHECK');
      button(hud, 'Esc', () => this.cancel(), 'Cancel command');
    }

    // Floating Zoom Pill on the canvas stage
    const zoomHud = element(this.stage, 'div', 'cad-zoom-hud');
    const zoomOutBtn = button(zoomHud, '', () => this.zoom(0.8), 'Zoom out');
    setToolIcon(zoomOutBtn, 'ZOOM_OUT');
    const zoomFitBtn = button(zoomHud, '', () => this.fit(), 'Zoom extents (Z)');
    setToolIcon(zoomFitBtn, 'ZOOM_FIT');
    const zoomInBtn = button(zoomHud, '', () => this.zoom(1.25), 'Zoom in');
    setToolIcon(zoomInBtn, 'ZOOM_IN');

    // Virtual Title Block HUD (YAML / Document Metadata overlay)
    this.virtualTitleEl = element(this.stage, 'div', 'cad-virtual-titleblock');
    this.virtualTitleEl.hidden = true;
    this.virtualTitleEl.title = 'Click to edit Markdown YAML Properties & BOM';
    this.virtualTitleEl.addEventListener('click', () => this.openVirtualTitleBlockModal());

    this.sideContainerEl = element(body, 'aside', 'cad-sidebar');
    const dockBar = element(this.sideContainerEl, 'div', 'cad-dock-bar');
    element(dockBar, 'span', 'cad-dock-title', 'Inspector');
    const dockCtrls = element(dockBar, 'div', 'cad-dock-controls');
    this.floatingCollapseBtn = button(
      dockCtrls,
      '',
      () => {
        this.toggleInspectorCollapse();
        this.render();
      },
      'Collapse / expand inspector panel',
    );
    setToolIcon(this.floatingCollapseBtn, 'COLLAPSE');
    this.floatingCollapseBtn.setAttribute('aria-label', 'Collapse floating inspector');
    let dragFloat: { startX: number; startY: number; origX: number; origY: number } | undefined;
    dockBar.addEventListener('pointerdown', (ev) => {
      if (this.panelDock !== 'floating') return;
      const target = ev.target as HTMLElement;
      if (target.closest('select, button, input')) return;
      ev.preventDefault();
      const bodyRect = body.getBoundingClientRect();
      const sideRect = this.sideContainerEl.getBoundingClientRect();
      dragFloat = {
        startX: ev.clientX,
        startY: ev.clientY,
        origX: sideRect.left - bodyRect.left,
        origY: sideRect.top - bodyRect.top,
      };
      try {
        dockBar.setPointerCapture(ev.pointerId);
      } catch {
        /* ignore synthetic pointer capture failure */
      }
    });
    dockBar.addEventListener('pointermove', (ev) => {
      if (!dragFloat || this.panelDock !== 'floating') return;
      const bodyRect = body.getBoundingClientRect();
      const nx = Math.max(
        6,
        Math.min(bodyRect.width - 140, dragFloat.origX + (ev.clientX - dragFloat.startX)),
      );
      const ny = Math.max(
        6,
        Math.min(bodyRect.height - 44, dragFloat.origY + (ev.clientY - dragFloat.startY)),
      );
      this.panelFloatingPos = { x: nx, y: ny };
      this.sideContainerEl.style.left = `${nx}px`;
      this.sideContainerEl.style.top = `${ny}px`;
      this.sideContainerEl.style.right = 'auto';
    });
    dockBar.addEventListener('pointerup', () => {
      if (!dragFloat) return;
      dragFloat = undefined;
      this.persistSettings();
    });

    this.side = element(this.sideContainerEl, 'div', 'cad-side-content');
    this.applyDockLayout();
    this.pageBar = element(this.root, 'div', 'cad-page-bar');
    const footer = element(this.root, 'div', 'cad-footer');
    this.prompt = element(footer, 'div', 'cad-prompt');
    this.prompt.setAttribute('aria-live', 'polite');

    const controls = element(footer, 'div', 'cad-precision');
    for (const [name, state, title] of [
      ['ORTHO', this.ortho, 'Ortho lock 0°/90° (F8)'],
      ['POLAR', this.polar, 'Polar tracking guides (F10)'],
      ['OSNAP', this.osnap, 'Object snap & extension (F3)'],
      ['OTRACK', this.tracking, 'Alignment tracking guides (F11)'],
      ['GRID', true, 'Show reference grid'],
      ['SNAP', this.gridSnap, 'Snap to grid (F9)'],
      ['DYN', this.dynamicInput, 'Dynamic cursor/pen input (F12)'],
      ['POSTDIM', this.postDrawMeasureTab, 'Open measurement tab right after drawing a shape'],
      [
        'DYNCONN',
        this.dynamicPortConnectors,
        'Dynamic port connectors: attached segments follow moved symbol ports',
      ],
      ['JUMPS', !!drawing.projectSettings?.lineJumps, 'Default cross-over bridge humps'],
    ] as [string, boolean, string][]) {
      const precisionLabels: Record<string, string> = {
        ORTHO: 'Ortho',
        POLAR: 'Polar',
        OSNAP: 'Object snap',
        OTRACK: 'Align',
        GRID: 'Grid',
        SNAP: 'Grid snap',
        DYN: 'Dyn Input',
        POSTDIM: 'Post-Dim',
        DYNCONN: 'Dyn Conn',
        JUMPS: 'Jumps',
      };
      const b = button(
        controls,
        precisionLabels[name],
        () => {
          if (name === 'ORTHO') {
            this.ortho = !this.ortho;
            if (this.ortho) this.polar = false;
          } else if (name === 'POLAR') {
            this.polar = !this.polar;
            if (this.polar) this.ortho = false;
          } else if (name === 'OSNAP') this.osnap = !this.osnap;
          else if (name === 'OTRACK') this.tracking = !this.tracking;
          else if (name === 'SNAP') this.gridSnap = !this.gridSnap;
          else if (name === 'DYN') this.dynamicInput = !this.dynamicInput;
          else if (name === 'POSTDIM') {
            this.postDrawMeasureTab = !this.postDrawMeasureTab;
            if (!this.postDrawMeasureTab) this.postDimEl.hidden = true;
          } else if (name === 'DYNCONN') {
            this.dynamicPortConnectors = !this.dynamicPortConnectors;
            if (!this.readOnly) {
              this.transact('Toggle dynamic port connectors', (d) => {
                d.projectSettings = {
                  ...defaultProjectSettings(),
                  ...(d.projectSettings ?? {}),
                  dynamicPortConnectors: this.dynamicPortConnectors,
                };
              });
            }
          } else if (name === 'JUMPS') {
            if (!this.readOnly) {
              this.transact('Toggle default line jumps', (d) => {
                const cur = d.projectSettings?.lineJumps ?? false;
                d.projectSettings = {
                  ...defaultProjectSettings(),
                  ...(d.projectSettings ?? {}),
                  lineJumps: !cur,
                };
              });
            }
          } else this.renderer.grid = !this.renderer.grid;
          this.persistSettings();
          this.updateToggles();
          this.updateDynamicHud();
          this.render();
        },
        title,
      );
      b.setAttribute('aria-pressed', String(state));
      this.toggles.set(name, b);
    }

    const polarStepSelect = choice(
      controls,
      [
        ['15', 'Polar: 15°'],
        ['30', 'Polar: 30°'],
        ['45', 'Polar: 45°'],
        ['90', 'Polar: 90°'],
      ],
      String(this.polarAngle),
      (v) => {
        this.polarAngle = Number(v);
        this.polar = true;
        this.ortho = false;
        this.updateToggles();
        this.persistSettings();
        this.render();
      },
    );
    polarStepSelect.setAttribute('aria-label', 'Polar tracking angle');

    this.status = element(controls, 'span', 'cad-status');
    this.statusCoordsEl = element(this.status, 'span', '', 'X 0.00  Y 0.00 mm · ');
    this.statusGridBtn = button(
      this.status,
      `Grid: ${this.gridStep} mm`,
      () => {
        this.run(async () => {
          const values = await this.form('Grid spacing', [
            { key: 'step', label: 'Spacing in mm', value: String(this.gridStep), type: 'number' },
          ]);
          if (values) {
            const n = Number(values.step);
            if (!Number.isFinite(n) || n < 0.001 || n > 1e6)
              throw new Error('Enter a spacing between 0.001 and 1000000 mm');
            this.gridStep = n;
            this.renderer.gridStep = n;
            this.updateGridStatusLabel();
            this.persistSettings();
            this.render();
          }
        });
      },
      'Click to change grid spacing (mm)',
    );
    this.statusGridBtn.className = 'cad-status-grid';
    this.statusGridBtn.setAttribute('aria-label', 'Edit grid size');
    this.statusTailEl = element(this.status, 'span', '', ' · zoom 100% · scale 1:1');
    this.command = element(footer, 'input', 'cad-command');
    this.command.type = 'text';
    this.command.placeholder =
      'Command: LINE, PLINE, WIRE, DIM, OFFSET, FILLET, TRIM, EXTEND… • x,y • @dx,dy • @length<angle';
    this.command.setAttribute('aria-label', 'CAD command line');
    this.command.autocomplete = 'off';
    this.command.spellcheck = false;
    this.command.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        const value = this.command.value;
        this.command.value = '';
        this.executeCommand(value);
      } else if (e.key === 'Escape') {
        e.stopPropagation();
        this.cancel();
        this.canvas.focus();
      }
    });

    this.stack = this.newStack(drawing);
    this.currentLayer =
      drawing.layers.find((l) => l.visible && !l.locked)?.id ?? drawing.layers[0].id;
    this.currentBlock = drawing.blocks[0]?.id ?? '';
    this.snapIndex.rebuild(drawing);

    this.listen(this.canvas, 'pointerdown', (e) => this.pointerDown(e));
    this.listen(this.canvas, 'pointermove', (e) => this.pointerMove(e));
    this.listen(this.canvas, 'pointerup', (e) => this.pointerUp(e));
    this.listen(this.canvas, 'pointercancel', (e) => this.pointerCancel(e));
    this.listen(this.canvas, 'lostpointercapture', (e) => {
      if (this.pointers.has(e.pointerId)) this.pointerCancel(e);
    });
    const touchGuard = (e: TouchEvent): void => {
      e.preventDefault();
      e.stopPropagation();
    };
    const touchEndGuard = (e: TouchEvent): void => {
      e.stopPropagation();
      this.reconcileTouches(e);
    };
    const gestureGuard = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
    };
    this.canvas.addEventListener('touchstart', touchGuard, { passive: false });
    this.canvas.addEventListener('touchmove', touchGuard, { passive: false });
    this.canvas.addEventListener('touchend', touchEndGuard, { passive: false });
    this.canvas.addEventListener('touchcancel', touchEndGuard, { passive: false });
    this.canvas.addEventListener('gesturestart', gestureGuard, { passive: false });
    this.canvas.addEventListener('gesturechange', gestureGuard, { passive: false });
    this.canvas.addEventListener('gestureend', gestureGuard, { passive: false });
    this.canvas.addEventListener('wheel', this.wheel, { passive: false });
    this.cleanups.push(() => {
      this.canvas.removeEventListener('touchstart', touchGuard);
      this.canvas.removeEventListener('touchmove', touchGuard);
      this.canvas.removeEventListener('touchend', touchEndGuard);
      this.canvas.removeEventListener('touchcancel', touchEndGuard);
      this.canvas.removeEventListener('gesturestart', gestureGuard);
      this.canvas.removeEventListener('gesturechange', gestureGuard);
      this.canvas.removeEventListener('gestureend', gestureGuard);
      this.canvas.removeEventListener('wheel', this.wheel);
    });
    this.listen(this.canvas, 'contextmenu', (e) => {
      e.preventDefault();
      if (this.panned) return;
      if (this.activeGrip && this.tool === 'SELECT') {
        const modes: GripMode[] = ['stretch', 'move', 'rotate', 'scale'];
        this.gripMode = modes[(modes.indexOf(this.gripMode) + 1) % modes.length];
        this.say(`Grip mode: ${this.gripMode.toUpperCase()}`);
        this.render();
      } else if (this.inputBindings.mouse.rightClick === 'repeat_last') {
        if (this.tool === 'SELECT') this.setTool(this.lastTool);
        else this.finish();
      } else if (this.inputBindings.mouse.rightClick === 'context_menu') {
        if (this.selected.size && this.tool === 'SELECT') this.updateSelectionBar();
        else this.finish();
      } else {
        this.finish();
      }
    });
    this.listen(this.canvas, 'dblclick', (e) => {
      e.preventDefault();
      if (this.tool === 'PL') this.finish();
    });
    this.listen(this.root, 'keydown', (e) => this.keyDown(e));
    this.listen(this.root, 'keyup', (e) => {
      if (e.code === 'Space') this.space = false;
    });
    this.listen(this.root, 'focusout', () => {
      this.space = false;
    });
    this.listen(this.canvas, 'pointerleave', () => {
      this.clearPenLoupe();
      if (!this.penActive && !this.dynEditing) {
        this.cursor = undefined;
        this.cursorScreen = undefined;
        this.snap = undefined;
        this.guides = [];
        this.polarRay = undefined;
        this.updateDynamicHud();
        this.render();
      }
    });

    this.observer = new ResizeObserver(() => this.render());
    this.observer.observe(this.stage);
    this.updateColorSwatch();
    this.updateVirtualTitleBlock();
    this.renderSide();
    this.renderPageBar();
    this.setTool('SELECT');
    this.fit();
  }

  setFrontmatter(fm?: Record<string, unknown>): void {
    this.frontmatter = fm;
    this.updateVirtualTitleBlock();
  }

  private updateColorSwatch(): void {
    if (!this.colorSwatch) return;
    const layer = this.drawing?.layers?.find((l) => l.id === this.currentLayer);
    const aci = this.currentColor ?? layer?.color ?? 7;
    this.colorSwatch.style.backgroundColor = aciColor(aci, '#e1e5eb');
  }

  private updateVirtualTitleBlock(): void {
    if (!this.virtualTitleEl || !this.stack) return;
    const sh = this.drawing.sheet;
    const mode = sh?.titleBlockMode ?? (sh?.enabled ? 'real' : 'virtual');
    if (mode !== 'virtual') {
      this.virtualTitleEl.hidden = true;
      return;
    }
    this.virtualTitleEl.hidden = false;
    this.virtualTitleEl.replaceChildren();
    const tb = sh?.titleBlock;
    const fm = this.frontmatter ?? {};
    const title = String(
      fm['cad-title'] ?? fm.title ?? tb?.title ?? this.host.documentName ?? 'CAD Schematic',
    );
    const project = String(fm['cad-project'] ?? fm.project ?? tb?.project ?? 'Engineering Project');
    const rev = String(fm['cad-revision'] ?? fm.revision ?? tb?.revision ?? 'A');
    const scale = this.drawing.scale ?? sh?.scale ?? String(fm['cad-scale'] ?? '1:1');
    const author = String(fm['cad-author'] ?? fm.author ?? tb?.author ?? '');
    const head = element(this.virtualTitleEl, 'div', 'cad-vtb-head');
    element(head, 'strong', '', title);
    element(head, 'span', 'cad-vtb-badge', `REV ${rev} · ${scale}`);
    element(
      this.virtualTitleEl,
      'div',
      'cad-vtb-meta',
      `${project}${author ? ` · ${author}` : ''} · mm`,
    );
    const customYaml = Object.entries(fm).filter(
      ([k]) =>
        ![
          'obsidian-cad',
          'tags',
          'cad-component-tags',
          'cad-units',
          'cad-scale',
          'cad-sheet',
          'cad-titleblock-mode',
          'cad-project',
          'cad-title',
          'cad-revision',
          'cad-author',
          'cad-date',
        ].includes(k),
    );
    if (customYaml.length) {
      const extra = customYaml
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
        .join(' · ');
      element(this.virtualTitleEl, 'div', 'cad-vtb-yaml', extra);
    }
  }

  get drawing(): Drawing {
    return this.stack.drawing;
  }

  private newStack(d: Drawing): CommandStack {
    return new CommandStack(d, (changed) => {
      this.revision++;
      syncActivePage(changed);
      this.selected = new Set(
        [...this.selected].filter((id) =>
          changed.entities.some((e) => e.id === id && isEditable(changed, e)),
        ),
      );
      this.snapIndex.rebuild(changed);
      if (!changed.layers.some((l) => l.id === this.currentLayer))
        this.currentLayer = changed.layers[0].id;
      if (!changed.blocks.some((b) => b.id === this.currentBlock))
        this.currentBlock = changed.blocks[0]?.id ?? '';
      this.renderSide();
      this.renderPageBar();
      this.updateSelectionBar();
      this.updateColorSwatch();
      this.updateVirtualTitleBlock();
      this.updateToggles();
      this.render();
      this.layerSelect.replaceChildren();
      for (const l of changed.layers) {
        const o = element(
          this.layerSelect,
          'option',
          '',
          `Layer: ${l.name}${l.locked ? ' [locked]' : !l.visible ? ' [hidden]' : ''}`,
        );
        o.value = l.id;
      }
      this.layerSelect.value = this.currentLayer;
      this.scaleSelect.value = changed.scale ?? changed.sheet?.scale ?? '1:1';
      this.host.changed(changed);
    });
  }

  load(d: Drawing): void {
    this.cancel();
    this.cursor = undefined;
    this.cursorScreen = undefined;
    this.snap = undefined;
    this.guides = [];
    this.polarRay = undefined;
    this.highlightId = undefined;
    this.pen = false;
    this.libraryBrowseOpen = false;
    this.librarySearch = '';
    this.libraryFilter = '';
    this.standardFilter = '';
    this.groupFilter = '';
    this.openPropSections.clear();
    this.openLayers.clear();
    if (d.projectSettings?.dynamicPortConnectors !== undefined) {
      this.dynamicPortConnectors = d.projectSettings.dynamicPortConnectors;
    }
    this.stack = this.newStack(d);
    this.selected.clear();
    this.snapIndex.rebuild(d);
    this.currentLayer = d.layers.find((l) => l.visible && !l.locked)?.id ?? d.layers[0].id;
    this.currentBlock = d.blocks[0]?.id ?? '';
    this.scaleSelect.value = d.scale ?? d.sheet?.scale ?? '1:1';
    this.renderSide();
    this.renderPageBar();
    this.updateSelectionBar();
    this.updateColorSwatch();
    this.updateVirtualTitleBlock();
    this.fit();
  }

  dispose(): void {
    this.clearPenLoupe();
    this.toggleFullscreen(false);
    this.disposed = true;
    this.modalClose?.();
    this.observer.disconnect();
    this.cleanups.forEach((fn) => fn());
    this.canvas.ownerDocument.defaultView!.cancelAnimationFrame(this.frame);
    this.root.remove();
  }

  private listen<K extends keyof HTMLElementEventMap>(
    el: HTMLElement,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
  ): void {
    el.addEventListener(type, fn as EventListener);
    this.cleanups.push(() => el.removeEventListener(type, fn as EventListener));
  }

  private toggleInspectorCollapse(): void {
    if (this.panelDock === 'floating') {
      this.panelFloatingCollapsed = !this.panelFloatingCollapsed;
    } else {
      const collapsed =
        this.root.classList.contains('cad-panel-collapsed') ||
        (this.tablet && !this.root.classList.contains('cad-panel-open'));
      if (collapsed) {
        this.root.classList.remove('cad-panel-collapsed');
        this.root.classList.add('cad-panel-open');
      } else {
        this.root.classList.add('cad-panel-collapsed');
        this.root.classList.remove('cad-panel-open');
      }
    }
    this.applyDockLayout();
    this.persistSettings();
  }

  private applyDockLayout(): void {
    this.root.dataset.ribbonDock = this.ribbonDock;
    this.root.dataset.panelDock = this.panelDock;
    const isFloat = this.panelDock === 'floating';
    this.sideContainerEl.classList.toggle(
      'cad-floating-collapsed',
      isFloat && this.panelFloatingCollapsed,
    );
    const isCollapsed = isFloat
      ? this.panelFloatingCollapsed
      : this.root.classList.contains('cad-panel-collapsed');
    if (this.floatingCollapseBtn) {
      this.floatingCollapseBtn.hidden = false;
      setToolIcon(this.floatingCollapseBtn, isCollapsed ? 'EXPAND' : 'COLLAPSE');
    }
    if (isFloat && this.panelFloatingPos) {
      this.sideContainerEl.style.left = `${this.panelFloatingPos.x}px`;
      this.sideContainerEl.style.top = `${this.panelFloatingPos.y}px`;
      this.sideContainerEl.style.right = 'auto';
    } else {
      this.sideContainerEl.style.left = '';
      this.sideContainerEl.style.top = '';
      this.sideContainerEl.style.right = '';
    }
  }

  private persistSettings(includeTablet = false): void {
    const next: EditorSettings = {
      theme: this.renderer.theme,
      penOnly: this.penOnly,
      penLoupeDelayMs: this.penLoupeDelayMs,
      gridSnap: this.gridSnap,
      gridStep: this.gridStep,
      ortho: this.ortho,
      polar: this.polar,
      polarAngle: this.polarAngle,
      tracking: this.tracking,
      dynamicInput: this.dynamicInput,
      postDrawMeasureTab: this.postDrawMeasureTab,
      ribbonDock: this.ribbonDock,
      panelDock: this.panelDock,
      panelFloatingCollapsed: this.panelFloatingCollapsed,
      panelFloatingPos: this.panelFloatingPos,
      inputBindings: this.inputBindings,
      dynamicPortConnectors: this.dynamicPortConnectors,
      connectorRoutingMode: this.connectorRoutingMode,
      ...(this.drawing?.projectSettings
        ? {
            defaultLabelAnchor: this.drawing.projectSettings.defaultLabelAnchor,
            defaultTextHeight: this.drawing.projectSettings.defaultTextHeight,
            defaultLabelOrientation: this.drawing.projectSettings.defaultLabelOrientation,
          }
        : {}),
    };
    if (includeTablet) next.tablet = this.tablet;
    this.host.settingsChanged?.(next);
  }

  private run(action: () => Promise<void>): void {
    void action().catch((e) => this.say(e instanceof Error ? e.message : String(e), true));
  }

  private transact(label: string, action: (d: Drawing) => void): void {
    if (this.readOnly) return;
    try {
      this.stack.execute(label, action);
    } catch (e) {
      this.say(e instanceof Error ? e.message : String(e), true);
    }
  }

  private say(message: string, notice = false): void {
    this.message = message;
    if (notice) this.host.notice(message);
    this.updatePrompt();
  }

  private updatePrompt(): void {
    const promptsForTool = prompts[this.tool];
    this.prompt.textContent =
      this.message ||
      (!this.selected.size && ['M', 'CO', 'RO', 'SC', 'MI', 'E'].includes(this.tool)
        ? 'Select an object to modify. Shift-click adds or removes objects.'
        : '') ||
      `${this.tool} · ${promptsForTool[Math.min(this.points.length, promptsForTool.length - 1)]}${this.readOnly ? ' · READ ONLY' : ''}`;
  }

  private updateGridStatusLabel(): void {
    if (this.statusGridBtn) this.statusGridBtn.textContent = `Grid: ${this.gridStep} mm`;
  }

  private closeFloatingPopovers(): void {
    this.root
      .querySelectorAll<HTMLElement>('.cad-floating-popover, .cad-ltype-popover')
      .forEach((el) => {
        el.hidden = true;
      });
  }

  private placeFloatingPopover(trigger: HTMLElement, pop: HTMLElement): void {
    const wasHidden = pop.hidden;
    if (wasHidden) pop.hidden = false;
    const rootRect = this.root.getBoundingClientRect();
    const rect = trigger.getBoundingClientRect();
    const rw = rootRect.width || this.root.clientWidth || 1200;
    const rh = rootRect.height || this.root.clientHeight || 800;
    const pw = pop.offsetWidth || 240;
    const ph = pop.offsetHeight || 220;
    const belowTop = rect.bottom - rootRect.top + 4;
    const aboveTop = rect.top - rootRect.top - ph - 4;
    const top =
      belowTop + ph <= rh - 8 || aboveTop < 8
        ? Math.max(8, Math.min(rh - ph - 8, belowTop))
        : Math.max(8, aboveTop);
    const left = Math.max(8, Math.min(rw - pw - 8, rect.left - rootRect.left));
    pop.style.position = 'absolute';
    pop.style.top = `${Math.round(top)}px`;
    pop.style.left = `${Math.round(left)}px`;
    pop.style.right = 'auto';
    pop.style.bottom = 'auto';
  }

  openVirtualTitleBlockModal(): void {
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-yaml-modal');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Markdown Properties & BOM');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    let showBom = false;
    const extraCols: string[] = [];
    for (const e of this.drawing.entities) {
      if (e.type !== 'insert') continue;
      for (const k of Object.keys(e.attributes)) {
        if (
          ![
            'TAG',
            'BRAND',
            'MARCA',
            'MANUFACTURER',
            'MODEL',
            'MODELLO',
            'VALORE',
            'DESCRIZIONE',
            'NOTES',
          ].includes(k) &&
          !extraCols.includes(k)
        ) {
          extraCols.push(k);
        }
      }
    }

    const sh = ensureSheetSetup(this.drawing, this.host.documentName);
    const fmDraft: Record<string, unknown> = { ...(this.frontmatter ?? {}) };
    if (fmDraft['cad-project'] === undefined && sh.titleBlock.project)
      fmDraft['cad-project'] = sh.titleBlock.project;
    if (fmDraft['cad-title'] === undefined && sh.titleBlock.title)
      fmDraft['cad-title'] = sh.titleBlock.title;
    if (fmDraft['cad-drawing-no'] === undefined && sh.titleBlock.drawingNumber)
      fmDraft['cad-drawing-no'] = sh.titleBlock.drawingNumber;
    if (fmDraft['cad-revision'] === undefined && sh.titleBlock.revision)
      fmDraft['cad-revision'] = sh.titleBlock.revision;
    if (fmDraft['cad-author'] === undefined && sh.titleBlock.author)
      fmDraft['cad-author'] = sh.titleBlock.author;
    if (fmDraft['cad-date'] === undefined && sh.titleBlock.date)
      fmDraft['cad-date'] = sh.titleBlock.date;

    const entries: [string, unknown][] = Object.entries(fmDraft);

    const head = element(dialog, 'div', 'cad-modal-header');
    element(head, 'h3', '', 'Markdown YAML Properties');
    const headActions = element(head, 'div', 'cad-actions');
    const bomBtn = button(
      headActions,
      'BOM',
      () => {
        showBom = !showBom;
        bomBtn.setAttribute('aria-pressed', String(showBom));
        renderBody();
      },
      'Toggle interactive Bill of Materials (BOM) table',
    );
    bomBtn.setAttribute('aria-pressed', String(showBom));
    button(headActions, 'Close', finish);

    const yamlContainer = element(dialog, 'div', 'cad-manager-section');
    const bomContainer = element(dialog, 'div', 'cad-manager-section');

    const saveYaml = (): void => {
      const nextFm: Record<string, unknown> = {};
      for (const [k, v] of entries) {
        const key = k.trim();
        if (!key) continue;
        nextFm[key] = v;
      }
      if (!this.readOnly) {
        this.transact('Update metadata from YAML', (d) => {
          const setup = ensureSheetSetup(d, this.host.documentName);
          if (typeof nextFm['cad-project'] === 'string')
            setup.titleBlock.project = nextFm['cad-project'];
          if (typeof nextFm['cad-title'] === 'string') setup.titleBlock.title = nextFm['cad-title'];
          if (typeof nextFm['cad-drawing-no'] === 'string')
            setup.titleBlock.drawingNumber = nextFm['cad-drawing-no'];
          if (typeof nextFm['cad-revision'] === 'string')
            setup.titleBlock.revision = nextFm['cad-revision'];
          if (typeof nextFm['cad-author'] === 'string')
            setup.titleBlock.author = nextFm['cad-author'];
          if (typeof nextFm['cad-date'] === 'string') setup.titleBlock.date = nextFm['cad-date'];
        });
      }
      if (this.host.saveFrontmatter) {
        this.host.saveFrontmatter(nextFm, this.drawing);
      } else {
        this.setFrontmatter(nextFm);
      }
      this.say('Markdown YAML properties updated.', true);
    };

    const renderBody = (): void => {
      yamlContainer.replaceChildren();
      element(yamlContainer, 'h4', '', 'Document Frontmatter (YAML)');
      for (let i = 0; i < entries.length; i++) {
        const [k, v] = entries[i];
        const row = element(yamlContainer, 'div', 'cad-yaml-row');
        const keyInp = element(row, 'input');
        keyInp.type = 'text';
        keyInp.value = k;
        keyInp.disabled = this.readOnly || k === 'cad-lab' || k === 'obsidian-cad';
        keyInp.setAttribute('aria-label', `YAML key ${k}`);
        keyInp.addEventListener('change', () => {
          entries[i][0] = keyInp.value.trim();
        });

        const valInp = element(row, 'input');
        valInp.type = 'text';
        const isArr = Array.isArray(v) || (typeof v === 'object' && v !== null);
        valInp.value = isArr ? JSON.stringify(v) : String(v ?? '');
        valInp.disabled = this.readOnly || k === 'cad-lab' || k === 'obsidian-cad';
        valInp.setAttribute('aria-label', `YAML value ${k}`);
        valInp.addEventListener('change', () => {
          const raw = valInp.value;
          if (raw === 'true') entries[i][1] = true;
          else if (raw === 'false') entries[i][1] = false;
          else if (raw.trim() !== '' && Number.isFinite(Number(raw)) && !/^0\d/.test(raw.trim()))
            entries[i][1] = Number(raw);
          else entries[i][1] = raw;
        });

        const del = button(
          row,
          '',
          () => {
            entries.splice(i, 1);
            renderBody();
          },
          'Remove YAML property',
        );
        setToolIcon(del, 'CLOSE');
        del.setAttribute('aria-label', 'Remove YAML property');
        del.disabled = this.readOnly || k === 'cad-lab' || k === 'obsidian-cad';
      }
      if (!this.readOnly) {
        const yamlBtns = element(yamlContainer, 'div', 'cad-actions');
        button(yamlBtns, '+ YAML Property', () => {
          entries.push([`custom-prop-${entries.length + 1}`, '']);
          renderBody();
        });
        button(yamlBtns, 'Save YAML Properties', () => saveYaml());
      }

      bomContainer.hidden = !showBom;
      if (!showBom) return;
      bomContainer.replaceChildren();
      const bomHead = element(bomContainer, 'div', 'cad-actions');
      element(bomHead, 'h4', '', 'Bill of Materials (BOM)');
      if (!this.readOnly) {
        button(bomHead, '+ Attribute Column', () =>
          this.run(async () => {
            const v = await this.form('New BOM Attribute Column', [
              { key: 'name', label: 'Attribute key (e.g. SUPPLIER)', value: 'SUPPLIER' },
            ]);
            if (!v || this.disposed) return;
            const col = v.name
              .trim()
              .toUpperCase()
              .replace(/[^A-Z0-9_-]+/g, '_');
            if (
              !col ||
              [
                'TAG',
                'BRAND',
                'MARCA',
                'MODEL',
                'MODELLO',
                'VALORE',
                'DESCRIZIONE',
                'NOTES',
              ].includes(col)
            )
              return;
            if (!extraCols.includes(col)) extraCols.push(col);
            renderBody();
          }),
        );
      }
      const inserts = this.drawing.entities.filter((e): e is Insert => e.type === 'insert');
      if (!inserts.length) {
        element(
          bomContainer,
          'p',
          'cad-help',
          'No schematic components placed yet. Insert symbols on canvas to populate BOM rows.',
        );
        return;
      }
      const wrap = element(bomContainer, 'div', 'cad-bom-table-wrap');
      const table = element(wrap, 'table', 'cad-bom-table');
      const thead = element(table, 'thead');
      const hrow = element(thead, 'tr');
      for (const colTitle of [
        'TAG',
        'Component',
        'Brand',
        'Model',
        'Standard',
        'Value',
        'Description',
        'Notes',
        ...extraCols,
      ]) {
        element(hrow, 'th', '', colTitle);
      }
      const tbody = element(table, 'tbody');
      const blockMap = new Map(this.drawing.blocks.map((b) => [b.id, b]));
      for (const ins of inserts) {
        const tr = element(tbody, 'tr');
        const blk = blockMap.get(ins.block);
        const editCell = (attrKey: string, initialVal?: string): void => {
          const td = element(tr, 'td');
          const inp = element(td, 'input');
          inp.type = 'text';
          inp.value = initialVal ?? ins.attributes[attrKey] ?? '';
          inp.disabled = this.readOnly || !isEditable(this.drawing, ins);
          inp.setAttribute('aria-label', `BOM ${ins.id} ${attrKey}`);
          inp.addEventListener('change', () => {
            this.transact(`Edit BOM ${attrKey}`, (d) => {
              const target = d.entities.find((x) => x.id === ins.id);
              if (target?.type === 'insert' && isEditable(d, target)) {
                target.attributes[attrKey] = inp.value;
              }
            });
          });
        };
        editCell('TAG');
        const compTd = element(tr, 'td');
        button(
          compTd,
          blk?.name ?? ins.block,
          () => {
            this.selected = new Set([ins.id]);
            this.highlightId = ins.id;
            this.renderSide();
            this.updateSelectionBar();
            this.render();
          },
          'Select component on canvas',
        );
        editCell(
          'BRAND',
          ins.attributes.BRAND ?? ins.attributes.MARCA ?? ins.attributes.MANUFACTURER ?? '',
        );
        editCell('MODEL', ins.attributes.MODEL ?? ins.attributes.MODELLO ?? '');
        element(tr, 'td', '', blk?.standard ?? blk?.category ?? 'Custom');
        editCell('VALORE');
        editCell('DESCRIZIONE');
        editCell('NOTES');
        for (const extra of extraCols) editCell(extra);
      }
    };

    renderBody();
  }

  private updateToggles(): void {
    for (const [name, b] of this.toggles)
      b.setAttribute(
        'aria-pressed',
        String(
          name === 'ORTHO'
            ? this.ortho
            : name === 'POLAR'
              ? this.polar
              : name === 'OSNAP'
                ? this.osnap
                : name === 'OTRACK'
                  ? this.tracking
                  : name === 'SNAP'
                    ? this.gridSnap
                    : name === 'DYN'
                      ? this.dynamicInput
                      : name === 'POSTDIM'
                        ? this.postDrawMeasureTab
                        : name === 'DYNCONN'
                          ? this.dynamicPortConnectors
                          : name === 'JUMPS'
                            ? !!this.drawing?.projectSettings?.lineJumps
                            : this.renderer.grid,
        ),
      );
  }

  private updateSelectionBar(): void {
    if (this.readOnly || !this.selected.size || this.tool !== 'SELECT') {
      this.selectionBar.hidden = true;
      return;
    }
    this.selectionBar.hidden = false;
    this.selectionBar.replaceChildren();
    element(this.selectionBar, 'span', 'cad-sel-count', `${this.selected.size} sel`);
    button(this.selectionBar, 'Move', () => this.setTool('M'));
    button(this.selectionBar, 'Copy', () => this.setTool('CO'));
    button(this.selectionBar, 'Rot 90°', () => {
      const entities = this.drawing.entities.filter((e) => this.selected.has(e.id));
      const b = drawingBounds({ ...this.drawing, entities });
      this.tool = 'RO';
      this.applyTransform(
        { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 },
        { x: 0, y: 0 },
        90,
      );
      this.setTool('SELECT');
    });
    button(this.selectionBar, 'Mirror', () => this.setTool('MI'));
    button(this.selectionBar, 'Scale', () => this.setTool('SC'));
    const ah = button(
      this.selectionBar,
      '',
      () => this.alignSelection('center-x'),
      'Align horizontal centers',
    );
    setToolIcon(ah, 'ALIGN_H', 'Align H');
    const av = button(
      this.selectionBar,
      '',
      () => this.alignSelection('center-y'),
      'Align vertical centers',
    );
    setToolIcon(av, 'ALIGN_V', 'Align V');
    button(this.selectionBar, 'Match Prop', () => {
      const firstId = [...this.selected][0];
      this.setTool('MA');
      this.matchSourceId = firstId;
      this.say('Source selected. Click objects to copy layer, color & linetype onto.');
      this.updateToolOptionsBar();
    });
    button(this.selectionBar, 'Offset', () => this.setTool('O'));
    const entities = this.drawing.entities.filter((e) => this.selected.has(e.id));
    if (entities.length >= 2) {
      button(this.selectionBar, 'Group', () => this.groupSelection());
    }
    if (entities.some((e) => e.type === 'insert' || e.type === 'polyline')) {
      button(this.selectionBar, 'Ungroup', () => this.ungroupSelection());
    }
    if (entities.filter((e) => e.type === 'line').length >= 2) {
      button(this.selectionBar, 'Join', () => {
        this.transact('Join', (d) => joinEntities(d, this.selected));
      });
    }
    button(this.selectionBar, 'Block…', () => this.openLibraryManager());
    button(this.selectionBar, 'Delete', () => this.erase());
  }

  setTool(tool: Tool): void {
    if (this.readOnly && !['SELECT', 'PAN', 'DIST'].includes(tool)) return;
    this.pointers.clear();
    this.pointerTypes.clear();
    this.penActive = undefined;
    this.gesture = undefined;
    this.panned = false;
    this.points = [];
    this.attachments = [];
    this.snap = undefined;
    this.guides = [];
    this.polarRay = undefined;
    this.hoverCrossing = undefined;
    if (tool !== 'J') {
      this.bridgePopEl.hidden = true;
      this.activeCrossingKey = undefined;
    }
    this.activeGrip = undefined;
    this.draggingGrip = false;
    this.draggingSelection = false;
    this.draggingCopy = false;
    this.dragOriginWorld = undefined;
    this.offsetSourceId = undefined;
    this.matchSourceId = undefined;
    this.filletFirstId = undefined;
    if (tool !== 'SELECT') this.postDimEl.hidden = true;
    this.message = '';
    this.tool = tool;
    if (!['SELECT', 'PAN'].includes(tool)) this.lastTool = tool;
    this.toolLabel.textContent = tools.find(([id]) => id === tool)?.[1] ?? tool;
    this.canvas.style.cursor =
      tool === 'PAN' ? 'grab' : tool === 'SELECT' ? 'default' : 'crosshair';
    this.penPreviewStart = undefined;
    this.dimension.textContent = '';
    this.pointerStart = undefined;
    this.dragBox = undefined;
    this.dynEditing = false;
    for (const [t, b] of this.toolButtons) b.setAttribute('aria-pressed', String(t === tool));
    if (tool === 'I') {
      this.selectedTab = 'library';
      this.renderSide();
    }
    if (tool === 'E') this.erase();
    this.updateSelectionBar();
    this.updateToolOptionsBar();
    this.updateDynamicHud();
    this.updatePrompt();
    this.render();
    this.canvas.focus({ preventScroll: true });
  }

  cancel(): void {
    this.postDimEl.hidden = true;
    if (this.tool !== 'SELECT') {
      this.setTool('SELECT');
    } else if (this.draggingGrip || this.draggingSelection) {
      this.draggingGrip = false;
      this.draggingSelection = false;
      this.activeGrip = undefined;
      this.render();
    } else if (this.selected.size) {
      this.selected.clear();
      this.renderSide();
      this.updateSelectionBar();
      this.render();
    }
  }

  undo(): void {
    if (this.readOnly) return;
    this.points = [];
    this.attachments = [];
    this.stack.undo();
    this.updatePrompt();
    this.render();
  }

  redo(): void {
    if (this.readOnly) return;
    this.points = [];
    this.attachments = [];
    this.stack.redo();
    this.updatePrompt();
    this.render();
  }

  fit(): void {
    this.renderer.fit(this.drawing);
    this.render();
  }

  /**
   * Enters or exits Full Screen mode ONLY when called explicitly via the Full Screen button or command.
   * Pressing Escape never exits Full Screen.
   */
  toggleFullscreen(force?: boolean): void {
    const enter = force ?? !this.fullPlaceholder;
    if (enter === !!this.fullPlaceholder) return;
    if (enter) {
      const marker = this.root.ownerDocument.createComment('cad-view-position');
      this.root.before(marker);
      this.fullPlaceholder = marker;
      this.root.ownerDocument.body.append(this.root);
      this.root.classList.add('cad-fullscreen');
    } else {
      this.fullPlaceholder?.replaceWith(this.root);
      this.fullPlaceholder = undefined;
      this.root.classList.remove('cad-fullscreen');
    }
    if (this.fullscreenButton) {
      const label = enter ? 'Exit' : 'Full screen';
      setToolIcon(this.fullscreenButton, enter ? 'EXIT' : 'FULL', label);
      this.fullscreenButton.title = label;
      this.fullscreenButton.setAttribute('aria-label', label);
      this.fullscreenButton.setAttribute('aria-pressed', String(enter));
    }
    this.render();
  }

  private zoom(factor: number): void {
    this.renderer.camera.zoom(factor, {
      x: this.renderer.camera.width / 2,
      y: this.renderer.camera.height / 2,
    });
    this.render();
  }

  private screen(event: PointerEvent | WheelEvent): Point {
    const r = this.canvas.getBoundingClientRect();
    return { x: event.clientX - r.left, y: event.clientY - r.top };
  }

  private allSelectedGrips(): Grip[] {
    if (this.readOnly || this.tool !== 'SELECT' || !this.selected.size || this.selected.size > 8)
      return [];
    const grips: Grip[] = [];
    for (const e of this.drawing.entities) {
      if (this.selected.has(e.id) && isEditable(this.drawing, e)) {
        grips.push(...entityGrips(this.drawing, e, this.interactiveLabelPos));
      }
    }
    return grips;
  }

  alignSelection(mode: 'center-x' | 'center-y'): void {
    if (!this.selected.size || this.readOnly) return;
    this.transact(
      mode === 'center-x' ? 'Align horizontal centers' : 'Align vertical centers',
      (d) => {
        alignEntities(d, this.selected, mode);
      },
    );
  }

  private hitGrip(p: Point): Grip | undefined {
    const tol = (this.pen ? 16 : 10) / this.renderer.camera.scale;
    const grips = this.allSelectedGrips();
    let best: Grip | undefined,
      bestD = tol;
    for (const g of grips) {
      const d = distance(g.point, p);
      if (d <= bestD) {
        bestD = d;
        best = g;
      }
    }
    return best;
  }

  private activeBasePoint(): Point | undefined {
    if (this.draggingGrip && this.activeGrip) return this.activeGrip.point;
    if (this.draggingSelection && this.dragOriginWorld) return this.dragOriginWorld;
    return this.points[this.points.length - 1] ?? this.penPreviewStart;
  }

  /**
   * Resolves pointer coordinates with OSNAP, Perpendicular, Snap Extension, Object Alignment Tracking,
   * Polar Tracking, Ortho, and Unified Millimeter Grid Snap.
   * Excludes moving/dragged entities so objects never snap onto themselves during Move or Grip drag.
   */
  private snapped(p: Point): Point {
    const base = this.activeBasePoint();
    const isMoving =
      this.draggingGrip ||
      this.draggingSelection ||
      (['M', 'RO', 'MI'].includes(this.tool) && this.points.length > 0);
    const excludeOwners = isMoving ? this.selected : undefined;

    this.guides = [];
    this.polarRay = undefined;

    if (this.osnap || this.tracking) {
      const tol = (this.pen ? 16 : 10) / this.renderer.camera.scale;
      const res = this.snapIndex.findWithGuides(p, tol, {
        excludeOwners,
        basePoint: base,
        enableExtension: this.osnap,
        enableTracking: this.tracking,
        gridStep: this.gridSnap ? this.gridStep : undefined,
      });
      this.guides = res.guides;
      if (res.snap && (this.osnap || res.snap.kind === 'Tracking')) {
        const directSnapTol = Math.min(this.gridStep * 0.25, 2.5 / this.renderer.camera.scale);
        const isOnGrid = (pt: Point): boolean =>
          Math.abs(pt.x - Math.round(pt.x / this.gridStep) * this.gridStep) < 1e-4 &&
          Math.abs(pt.y - Math.round(pt.y / this.gridStep) * this.gridStep) < 1e-4;
        const allowOffGridVertex =
          this.osnap &&
          (res.snap.kind === 'Endpoint' ||
            res.snap.kind === 'Center' ||
            res.snap.kind === 'Intersection') &&
          distance(res.snap.point, p) <= directSnapTol;
        if (
          !this.gridSnap ||
          res.snap.kind === 'Port' ||
          isOnGrid(res.snap.point) ||
          allowOffGridVertex
        ) {
          this.snap = res.snap;
          return res.snap.point;
        }
      }
    }

    this.snap = undefined;
    if (
      ['SELECT', 'PAN', 'TR', 'EX', 'E', 'O', 'F'].includes(this.tool) &&
      !this.draggingGrip &&
      !this.draggingSelection
    )
      return p;

    const allowOrtho =
      this.ortho &&
      (['L', 'PL', 'DIM', 'M', 'CO'].includes(this.tool) ||
        this.draggingGrip ||
        this.draggingSelection);
    const allowPolar =
      this.polar &&
      !this.gridSnap &&
      !allowOrtho &&
      !!base &&
      (['L', 'PL', 'W', 'DIM', 'M', 'CO'].includes(this.tool) ||
        this.draggingGrip ||
        this.draggingSelection);

    if (allowPolar && base) {
      const tracked = polarTrackPoint(p, base, this.polarAngle);
      if (tracked) this.polarRay = { origin: base, angle: tracked.angle };
    }

    const q = constrainedPoint(
      p,
      base,
      allowOrtho,
      this.gridSnap ? this.gridStep : undefined,
      allowPolar ? this.polarAngle : undefined,
    );
    if (this.gridSnap) this.snap = { point: q, kind: 'Grid' };
    return q;
  }

  private updateDynamicHud(): void {
    const base = this.activeBasePoint();
    const shouldShow =
      this.dynamicInput &&
      !this.readOnly &&
      !!base &&
      !!this.cursor &&
      !!this.cursorScreen &&
      (['L', 'PL', 'W', 'C', 'REC', 'DIM', 'M', 'CO', 'DIST'].includes(this.tool) ||
        this.draggingGrip ||
        this.draggingSelection);

    if (!shouldShow || !base || !this.cursor || !this.cursorScreen) {
      this.dynHud.hidden = true;
      return;
    }

    this.dynHud.hidden = false;
    const rect = this.stage.getBoundingClientRect();
    const offsetX = this.pen ? 32 : 18;
    const offsetY = this.pen ? -64 : 18;
    const left = Math.max(8, Math.min(rect.width - 200, this.cursorScreen.x + offsetX));
    const top = Math.max(44, Math.min(rect.height - 46, this.cursorScreen.y + offsetY));
    this.dynHud.style.left = `${left}px`;
    this.dynHud.style.top = `${top}px`;

    if (!this.dynEditing) {
      const dist = distance(base, this.cursor);
      const deg = normAngle(angle(base, this.cursor));
      this.dynDistInput.value = dist.toFixed(2);
      this.dynAngleInput.value = deg.toFixed(1);
    }
  }

  private commitDynamicInput(): void {
    const base = this.activeBasePoint();
    if (!base) return;
    const dist = Number(this.dynDistInput.value);
    const ang = Number(this.dynAngleInput.value);
    if (!Number.isFinite(dist) || !Number.isFinite(ang)) {
      this.say('Enter valid numeric length and angle values.', true);
      return;
    }
    const target = polar(base, dist, ang);
    this.dynEditing = false;
    this.snap = undefined;

    if (this.draggingGrip && this.activeGrip) {
      this.commitGripDrag(target);
    } else if (this.draggingSelection && this.dragOriginWorld) {
      this.commitSelectionDrag(target);
    } else {
      this.accept(target, false);
    }
    this.canvas.focus({ preventScroll: true });
    this.updateDynamicHud();
    this.render();
  }

  private commitGripDrag(target: Point): void {
    if (!this.activeGrip) return;
    const grip = this.activeGrip,
      mode = this.gripMode;
    this.transact('Grip edit', (d) => {
      const ent = d.entities.find((x) => x.id === grip.entityId);
      if (ent && isEditable(d, ent)) applyGripDrag(ent, grip, target, mode);
    });
    this.draggingGrip = false;
    this.activeGrip = undefined;
    this.gripMode = 'stretch';
  }

  private selectionCenter(): Point {
    const entities = this.drawing.entities.filter((e) => this.selected.has(e.id));
    if (!entities.length) return { x: 0, y: 0 };
    const b = drawingBounds({ ...this.drawing, entities });
    return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  }

  groupSelection(): void {
    if (this.readOnly || this.selected.size < 1) {
      this.say('Select 1 or more objects first to group.');
      return;
    }
    let createdId: string | undefined;
    this.transact('Group', (d) => {
      const grp = groupEntities(d, this.selected);
      createdId = grp?.id;
    });
    if (createdId) {
      this.selected = new Set([createdId]);
      this.renderSide();
      this.updateSelectionBar();
      this.say('Objects grouped into a block. Use Ungroup to decompose again.');
    }
  }

  ungroupSelection(): void {
    if (this.readOnly || !this.selected.size) {
      this.say('Select a symbol, group, or polyline to ungroup.');
      return;
    }
    let changed = false;
    this.transact('Ungroup', (d) => {
      for (const id of [...this.selected]) {
        if (ungroupEntity(d, id)) changed = true;
      }
    });
    if (changed) {
      this.selected.clear();
      this.renderSide();
      this.updateSelectionBar();
      this.say('Ungrouped into individual editable shapes.');
    } else {
      this.say('Selected entity cannot be ungrouped further.');
    }
  }

  private renderLineSvg(parent: HTMLElement, pattern: number[], width = 58): SVGSVGElement {
    const svg = parent.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} 14`);
    svg.setAttribute('class', 'cad-ltype-svg');
    svg.setAttribute('aria-hidden', 'true');
    const line = parent.ownerDocument.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', '2');
    line.setAttribute('y1', '7');
    line.setAttribute('x2', String(width - 2));
    line.setAttribute('y2', '7');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '2.1');
    line.setAttribute('stroke-linecap', 'round');
    if (pattern.length) {
      const dashStr = pattern
        .map((v, idx) => {
          const abs = Math.abs(v);
          const isGap = v < 0 || idx % 2 === 1;
          if (v === 0) return '1.6';
          if (isGap) return String(Math.max(3.2, Math.min(9, abs * 1.4)));
          return String(Math.max(3.5, Math.min(20, abs * 1.55)));
        })
        .join(' ');
      line.setAttribute('stroke-dasharray', dashStr);
    }
    svg.append(line);
    parent.append(svg);
    return svg;
  }

  private createLinetypeControl(
    parent: HTMLElement,
    opts: {
      ariaLabel: string;
      includeByLayer?: boolean;
      value: string;
      pattern?: number[];
      disabled?: boolean;
      onChange: (lineType: string, customPattern?: number[]) => void;
    },
  ): { button: HTMLButtonElement; refresh: (v: string, p?: number[]) => void } {
    const wrap = element(parent, 'div', 'cad-ltype-wrap');
    const previewBtn = element(wrap, 'button', 'cad-ltype-btn');
    previewBtn.type = 'button';
    previewBtn.title = 'Visual linetypes, Piping/Single-Line presets & arrow defaults';
    previewBtn.setAttribute('aria-label', opts.ariaLabel);
    previewBtn.disabled = !!opts.disabled;

    let curValue = opts.value;
    let curPattern = opts.pattern ? [...opts.pattern] : undefined;

    const drawPreview = (val: string, pat?: number[]): void => {
      previewBtn.replaceChildren();
      const ltKey = (val === 'BYLAYER' ? 'CONTINUOUS' : val) as LineType;
      const effPattern = pat && pat.length ? pat : (LINE_TYPES[ltKey]?.pattern ?? []);
      this.renderLineSvg(previewBtn, effPattern, 56);
      const txt = element(previewBtn, 'span', 'cad-ltype-btn-text');
      const labelText = val === 'BYLAYER' ? 'By layer' : (LINE_TYPES[ltKey]?.label ?? val);
      const descText =
        val === 'BYLAYER'
          ? 'BYLAYER'
          : pat?.length
            ? `${val} · ${pat.map((v) => Math.abs(v)).join('/')}`
            : val;
      element(txt, 'strong', '', labelText);
      element(txt, 'small', '', descText);
      element(previewBtn, 'span', 'cad-ltype-caret', '▾');
    };
    drawPreview(curValue, curPattern);

    const popover = element(this.root, 'div', 'cad-ltype-popover cad-floating-popover');
    popover.hidden = true;
    popover.dataset.ltypeOwner = opts.ariaLabel;

    const applyPresetChoice = (id: string, pat?: number[]): void => {
      curValue = id;
      curPattern = pat ? [...pat] : undefined;
      drawPreview(id, curPattern);
      opts.onChange(id, curPattern);
    };

    const buildPopover = (): void => {
      popover.replaceChildren();
      if (opts.includeByLayer) {
        const row = element(popover, 'button', 'cad-ltype-item');
        row.type = 'button';
        this.renderLineSvg(row, [], 88);
        const info = element(row, 'div', 'cad-ltype-meta');
        element(info, 'strong', '', 'By layer');
        element(info, 'small', '', 'Inherit active layer style');
        row.addEventListener('click', () => {
          applyPresetChoice('BYLAYER', undefined);
          popover.hidden = true;
        });
      }
      for (const [id, meta] of Object.entries(LINE_TYPES) as [
        LineType,
        { label: string; pattern: number[] },
      ][]) {
        const row = element(popover, 'button', 'cad-ltype-item');
        row.type = 'button';
        if (curValue === id) row.setAttribute('aria-pressed', 'true');
        this.renderLineSvg(row, curValue === id && curPattern ? curPattern : meta.pattern, 88);
        const info = element(row, 'div', 'cad-ltype-meta');
        element(info, 'strong', '', meta.label);
        const patSummary = meta.pattern.length
          ? meta.pattern.map((v) => `${Math.abs(v)}mm`).join(' / ')
          : 'Solid';
        element(info, 'small', '', `${id} · ${patSummary}`);
        row.addEventListener('click', () => {
          applyPresetChoice(id, undefined);
          popover.hidden = true;
        });
      }

      if (opts.ariaLabel === 'Current linetype') {
        const discSec = element(popover, 'div', 'cad-ltype-tune');
        element(discSec, 'small', '', 'Line Discipline (General / Piping P&ID / Single-Line)');
        const discTabs = element(discSec, 'div', 'cad-ltype-tune-row');
        for (const [dKey, dLbl] of [
          ['general', 'General'],
          ['piping', 'Piping (P&ID)'],
          ['single-line', 'Single-Line'],
        ] as [LineDiscipline, string][]) {
          const b = button(discTabs, dLbl, () => {
            this.currentDiscipline = dKey;
            buildPopover();
          });
          b.setAttribute('aria-pressed', String(this.currentDiscipline === dKey));
        }

        if (this.currentDiscipline !== 'general') {
          const presets: LineDisciplinePreset[] =
            this.currentDiscipline === 'piping' ? PIPING_LINE_PRESETS : SINGLE_LINE_PRESETS;
          for (const pr of presets) {
            const row = element(discSec, 'button', 'cad-ltype-item');
            row.type = 'button';
            this.renderLineSvg(row, pr.pattern ?? LINE_TYPES[pr.lineType].pattern, 88);
            const info = element(row, 'div', 'cad-ltype-meta');
            element(info, 'strong', '', pr.label);
            element(info, 'small', '', `${pr.defaultTagPrefix} · ${pr.defaultSpec}`);
            row.addEventListener('click', () => {
              this.currentDiscipline = pr.discipline;
              if (!this.currentServiceTag) this.currentServiceTag = pr.defaultTagPrefix;
              this.currentPipeSpec = pr.defaultSpec;
              applyPresetChoice(pr.lineType, pr.pattern);
              buildPopover();
            });
          }
          const tagLbl = element(
            discSec,
            'label',
            'cad-field',
            this.currentDiscipline === 'piping' ? 'Default Line Tag (e.g. P-101)' : 'Circuit ID',
          );
          const tagIn = element(tagLbl, 'input');
          tagIn.type = 'text';
          tagIn.value = this.currentServiceTag;
          tagIn.setAttribute('aria-label', 'Default discipline line tag');
          tagIn.addEventListener('input', () => {
            this.currentServiceTag = tagIn.value;
          });

          const specLbl = element(
            discSec,
            'label',
            'cad-field',
            this.currentDiscipline === 'piping' ? 'DN / Piping Spec' : 'Cable / Voltage',
          );
          const specIn = element(specLbl, 'input');
          specIn.type = 'text';
          specIn.value = this.currentPipeSpec;
          specIn.setAttribute('aria-label', 'Default discipline spec');
          specIn.addEventListener('input', () => {
            this.currentPipeSpec = specIn.value;
          });

          const noteLbl = element(discSec, 'label', 'cad-field', 'Default Line Notes');
          const noteIn = element(noteLbl, 'input');
          noteIn.type = 'text';
          noteIn.placeholder = 'Fluid, insulation, circuit notes…';
          noteIn.value = this.currentLineNotes;
          noteIn.setAttribute('aria-label', 'Default discipline line notes');
          noteIn.addEventListener('input', () => {
            this.currentLineNotes = noteIn.value;
          });
        }
      }

      // Custom dash/gap density presets & spacing tuner
      const tune = element(popover, 'div', 'cad-ltype-tune');
      element(tune, 'small', '', 'Dash density & custom dash/gap spacing (mm)');
      const ltKey = (curValue === 'BYLAYER' ? 'DASHED' : curValue) as LineType;
      const basePat = curPattern?.length ? curPattern : LINE_TYPES[ltKey].pattern;
      const densityRow = element(tune, 'div', 'cad-ltype-tune-row');
      for (const [factor, label] of [
        [0.5, 'Fine 0.5×'],
        [1, 'Normal 1×'],
        [2, 'Coarse 2×'],
      ] as [number, string][]) {
        button(densityRow, label, () => {
          const targetType = (
            curValue === 'BYLAYER' || curValue === 'CONTINUOUS' ? 'DASHED' : curValue
          ) as LineType;
          const srcPat = LINE_TYPES[targetType].pattern.length
            ? LINE_TYPES[targetType].pattern
            : [6, -3];
          const nextPat = srcPat.map((v) => (v === 0 ? 0 : Number((v * factor).toFixed(2))));
          applyPresetChoice(targetType, nextPat);
          popover.hidden = true;
        });
      }
      const tuneRow = element(tune, 'div', 'cad-ltype-tune-row');
      const firstPos = basePat.find((v) => v >= 0) ?? 6;
      const firstNeg = Math.abs(basePat.find((v) => v < 0) ?? -3);

      const dashIn = element(tuneRow, 'input');
      dashIn.type = 'number';
      dashIn.min = '0';
      dashIn.step = '0.5';
      dashIn.value = String(firstPos);
      dashIn.title = 'Dash length in mm (0 = dot)';
      dashIn.setAttribute('aria-label', 'Dash length mm');

      const gapIn = element(tuneRow, 'input');
      gapIn.type = 'number';
      gapIn.min = '0.2';
      gapIn.step = '0.5';
      gapIn.value = String(firstNeg);
      gapIn.title = 'Gap space in mm';
      gapIn.setAttribute('aria-label', 'Gap space mm');

      button(tuneRow, 'Apply', () => {
        const dVal = Math.max(0, Number(dashIn.value));
        const gVal = Math.max(0.2, Number(gapIn.value));
        if (!Number.isFinite(dVal) || !Number.isFinite(gVal)) return;
        const targetType = (
          curValue === 'BYLAYER' || curValue === 'CONTINUOUS'
            ? dVal === 0
              ? 'DOTTED'
              : 'DASHED'
            : curValue
        ) as LineType;
        const nextPat = dVal === 0 ? [0, -gVal] : customDashPattern(targetType, dVal, gVal);
        applyPresetChoice(targetType, nextPat);
        popover.hidden = true;
      });

      if (opts.ariaLabel === 'Current linetype') {
        const arrSec = element(popover, 'div', 'cad-ltype-tune');
        element(arrSec, 'small', '', 'Default arrows for new lines / polylines');
        const arrSel = choice(
          arrSec,
          [
            ['none', 'Arrows: None'],
            ['closed', 'Closed filled'],
            ['open', 'Open chevron'],
            ['stealth', 'Stealth barb'],
            ['triangle', 'Hollow triangle'],
            ['dot', 'Dot marker'],
            ['slash', 'Architectural slash'],
          ],
          this.currentArrows?.style ?? 'none',
          (v) => {
            if (v === 'none') this.currentArrows = undefined;
            else
              this.currentArrows = {
                style: v as ArrowStyle,
                placement: this.currentArrows?.placement ?? 'end',
                segments: this.currentArrows?.segments ?? 3,
                size: this.currentArrows?.size ?? 3.5,
                reversed: !!this.currentArrows?.reversed,
              };
            buildPopover();
          },
        );
        arrSel.setAttribute('aria-label', 'Default arrow style');
        if (this.currentArrows) {
          const plSel = choice(
            arrSec,
            [
              ['end', 'At end'],
              ['start', 'At start'],
              ['both', 'Both ends'],
              ['middle', 'In middle (L/2)'],
              ['every_n', 'Every L / N points'],
            ],
            this.currentArrows.placement,
            (v) => {
              if (this.currentArrows) {
                this.currentArrows = { ...this.currentArrows, placement: v as ArrowPlacement };
                buildPopover();
              }
            },
          );
          plSel.setAttribute('aria-label', 'Default arrow placement');
          const arrRow = element(arrSec, 'div', 'cad-ltype-tune-row');
          if (this.currentArrows.placement === 'every_n') {
            const nInp = element(arrRow, 'input');
            nInp.type = 'number';
            nInp.min = '1';
            nInp.max = '100';
            nInp.step = '1';
            nInp.value = String(this.currentArrows.segments ?? 3);
            nInp.title = 'Segments N (arrows at L/N)';
            nInp.setAttribute('aria-label', 'Default arrow subdivisions N');
            const updateN = (): void => {
              const raw = Math.round(Number(nInp.value));
              if (this.currentArrows && Number.isFinite(raw) && raw >= 1) {
                this.currentArrows.segments = Math.min(100, raw);
              }
            };
            nInp.addEventListener('input', updateN);
            nInp.addEventListener('change', updateN);
          }
          const revBtn = button(
            arrRow,
            '',
            () => {
              if (this.currentArrows) {
                this.currentArrows = {
                  ...this.currentArrows,
                  reversed: !this.currentArrows.reversed,
                };
                buildPopover();
              }
            },
            this.currentArrows.reversed ? 'Reversed arrow direction' : 'Reverse arrow direction',
          );
          setToolIcon(revBtn, 'REVERSE', this.currentArrows.reversed ? 'Reversed' : 'Reverse');
          revBtn.setAttribute('aria-pressed', String(!!this.currentArrows.reversed));
        }
      }
    };

    previewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = popover.hidden;
      this.closeFloatingPopovers();
      if (willOpen) {
        buildPopover();
        this.placeFloatingPopover(previewBtn, popover);
        popover.hidden = false;
      }
    });
    this.listen(this.root, 'pointerdown', (ev) => {
      if (
        !popover.hidden &&
        !wrap.contains(ev.target as Node) &&
        !popover.contains(ev.target as Node)
      )
        popover.hidden = true;
    });

    return {
      button: previewBtn,
      refresh: (v: string, p?: number[]) => {
        curValue = v;
        curPattern = p ? [...p] : undefined;
        drawPreview(v, p);
      },
    };
  }

  private commitSelectionDrag(target: Point): void {
    if (!this.dragOriginWorld) return;
    const delta = sub(target, this.dragOriginWorld);
    const wasCopy = this.draggingCopy;
    if (Math.hypot(delta.x, delta.y) > 1e-6) {
      this.transact(wasCopy ? 'Copy' : 'Move', (d) => {
        const m = { ...identity(), e: delta.x, f: delta.y };
        if (wasCopy) {
          const ids = new Set(
            d.entities.filter((e) => this.selected.has(e.id) && isEditable(d, e)).map((e) => e.id),
          );
          copyEntities(d, ids, m);
        } else {
          for (const e of d.entities) {
            if (this.selected.has(e.id) && isEditable(d, e)) transformEntity(e, m);
          }
        }
      });
    }
    this.draggingSelection = false;
    this.draggingCopy = false;
    this.dragOriginWorld = undefined;
  }

  private clearPenLoupe(): void {
    if (this.penLoupeTimer !== undefined) {
      this.canvas.ownerDocument.defaultView?.clearTimeout(this.penLoupeTimer);
      this.penLoupeTimer = undefined;
    }
    this.penLoupeVisible = false;
    this.penLoupeOrigin = undefined;
  }

  private schedulePenLoupe(screenPt: Point): void {
    if (this.penLoupeDelayMs <= 0) {
      this.clearPenLoupe();
      return;
    }
    if (this.penLoupeOrigin && distance(screenPt, this.penLoupeOrigin) <= 6) {
      if (this.penLoupeVisible || this.penLoupeTimer !== undefined) return;
    }
    this.clearPenLoupe();
    this.penLoupeOrigin = screenPt;
    const win = this.canvas.ownerDocument.defaultView;
    if (!win) return;
    this.penLoupeTimer = win.setTimeout(() => {
      this.penLoupeTimer = undefined;
      if (!this.disposed && this.pen && this.cursor) {
        this.penLoupeVisible = true;
        this.render();
      }
    }, this.penLoupeDelayMs);
  }

  private reconcileTouches(e: TouchEvent): void {
    const activeDirect = Array.from(e.touches).filter(
      (t) => (t as Touch & { touchType?: string }).touchType !== 'stylus',
    ).length;
    if (activeDirect > 0) return;
    let changed = false;
    for (const [id, kind] of [...this.pointerTypes.entries()]) {
      if (kind === 'touch') {
        this.pointers.delete(id);
        this.pointerTypes.delete(id);
        changed = true;
      }
    }
    if (!changed) return;
    this.gesture = undefined;
    this.touchTapGesture = undefined;
    if (this.pointers.size === 0) {
      this.pointerStart = undefined;
      this.dragBox = undefined;
      this.render();
    }
  }

  private remainingPanStart(): void {
    if (this.pointers.size !== 1) return;
    const [[id, pt]] = [...this.pointers.entries()];
    const kind = this.pointerTypes.get(id);
    const pan = (kind === 'touch' && this.penOnly) || this.tool === 'PAN';
    this.pointerStart = {
      screen: pt,
      world: this.renderer.camera.world(pt),
      pan,
      shift: false,
      id,
    };
  }

  private pointerDown(e: PointerEvent): void {
    const touchPalmLimit = this.penOnly ? 120 : 80;
    if (
      e.pointerType === 'touch' &&
      (this.penActive !== undefined || e.width > touchPalmLimit || e.height > touchPalmLimit)
    )
      return;
    if (e.pointerType === 'pen') {
      if (this.pointers.size) {
        this.pointers.clear();
        this.pointerTypes.clear();
        this.pointerStart = undefined;
        this.gesture = undefined;
        this.touchTapGesture = undefined;
      }
      this.penActive = e.pointerId;
    } else {
      this.clearPenLoupe();
    }
    e.preventDefault();
    this.canvas.focus({ preventScroll: true });
    if (e.pointerType !== 'touch') {
      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch {
        /* Ignore synthetic pointer capture rejection */
      }
    }
    const s = this.screen(e);
    this.cursorScreen = s;
    this.pointers.set(e.pointerId, s);
    this.pointerTypes.set(e.pointerId, e.pointerType);
    if (e.pointerType === 'pen') {
      this.pen = true;
      this.touchTapGesture = undefined;
      this.schedulePenLoupe(s);
    } else {
      this.pen = false;
      if (e.pointerType === 'touch') {
        if (!this.touchTapGesture || this.pointers.size === 1) {
          this.touchTapGesture = {
            maxCount: this.pointers.size,
            startTime: performance.now(),
            moved: false,
            startPoints: new Map([[e.pointerId, s]]),
          };
        } else {
          this.touchTapGesture.maxCount = Math.max(
            this.touchTapGesture.maxCount,
            this.pointers.size,
          );
          this.touchTapGesture.startPoints.set(e.pointerId, s);
        }
      }
    }
    if (this.pointers.size >= 2) {
      this.gesture = this.gestureState();
      this.panned = true;
      this.dragBox = undefined;
      this.draggingGrip = false;
      this.draggingSelection = false;
      this.render();
      return;
    }

    if (e.button === 1 && this.inputBindings.mouse.middleClick === 'zoom_extents') {
      e.preventDefault();
      this.fit();
      return;
    }
    if (e.button === 1 && this.inputBindings.mouse.middleClick === 'finish') {
      e.preventDefault();
      this.finish();
      return;
    }
    if (this.highlightId) {
      this.highlightId = undefined;
    }
    if (e.button === 0 && !this.postDimEl.hidden) {
      this.postDimEl.hidden = true;
    }

    const rawWorld = this.renderer.camera.world(s);
    const middlePans = e.button === 1 && this.inputBindings.mouse.middleClick === 'pan';
    const rightPans = e.button === 2 && this.inputBindings.mouse.rightClick === 'pan_or_finish';
    const isPan =
      this.tool === 'PAN' ||
      middlePans ||
      this.space ||
      rightPans ||
      (e.pointerType === 'touch' && this.penOnly);

    this.pointerStart = {
      screen: s,
      world: rawWorld,
      pan: isPan,
      shift: e.shiftKey,
      id: e.pointerId,
    };
    this.panned = false;

    // Check Multifunctional Grip hit or Direct Selection Drag in SELECT / M / CO mode
    if (!isPan && !this.readOnly && e.button === 0) {
      if (this.tool === 'SELECT') {
        const g = this.hitGrip(rawWorld);
        if (g) {
          this.activeGrip = g;
          this.draggingGrip = true;
          this.cursor = g.point;
          this.render();
          return;
        }
        const hit = hitTest(
          this.drawing,
          rawWorld,
          (this.pen ? 14 : 8) / this.renderer.camera.scale,
        );
        if (hit && this.selected.has(hit.id) && isEditable(this.drawing, hit)) {
          this.draggingSelection = true;
          this.draggingCopy = false;
          this.dragOriginWorld =
            this.gridSnap && hit.type === 'insert'
              ? hit.position
              : this.gridSnap
                ? gridPoint(rawWorld, this.gridStep)
                : rawWorld;
          this.cursor = this.dragOriginWorld;
          return;
        }
      } else if ((this.tool === 'M' || this.tool === 'CO') && this.points.length === 0) {
        const hit = hitTest(
          this.drawing,
          rawWorld,
          (this.pen ? 14 : 8) / this.renderer.camera.scale,
        );
        if (hit && isEditable(this.drawing, hit)) {
          if (!this.selected.has(hit.id)) {
            this.selected = new Set([hit.id]);
            this.renderSide();
            this.updateSelectionBar();
          }
          this.draggingSelection = true;
          this.draggingCopy = this.tool === 'CO';
          this.dragOriginWorld =
            this.gridSnap && hit.type === 'insert'
              ? hit.position
              : this.gridSnap
                ? gridPoint(rawWorld, this.gridStep)
                : this.snapped(rawWorld);
          this.cursor = this.dragOriginWorld;
          return;
        }
      }
    }

    if (
      e.pointerType === 'pen' &&
      !this.points.length &&
      ['L', 'C', 'REC', 'W', 'DIM'].includes(this.tool)
    ) {
      this.penPreviewStart = this.snapped(rawWorld);
      this.penPreviewAttachment = this.snap?.attachment;
    }
  }

  private gestureState(): { center: Point; distance: number } {
    const touchPts = [...this.pointers.entries()]
      .filter(([id]) => this.pointerTypes.get(id) === 'touch')
      .map(([, p]) => p);
    const pts = touchPts.length >= 2 ? touchPts : [...this.pointers.values()];
    const cx = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const cy = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    const center = { x: cx, y: cy };
    const meanRadius = pts.reduce((sum, p) => sum + distance(p, center), 0) / pts.length;
    return { center, distance: meanRadius * 2 };
  }

  private pointerMove(e: PointerEvent): void {
    if (e.pointerType === 'touch' && !this.pointers.has(e.pointerId)) return;
    if (this.penActive !== undefined && e.pointerType !== 'pen') return;
    if (e.pointerType === 'pen' && !this.pointers.has(e.pointerId) && this.pointers.size > 0)
      return;
    const samples = e.getCoalescedEvents?.();
    const latest = samples?.length ? samples[samples.length - 1] : e;
    const s = this.screen(latest),
      previous = this.pointers.get(e.pointerId);
    this.cursorScreen = s;
    if (previous) this.pointers.set(e.pointerId, s);
    if (e.pointerType === 'pen') {
      this.pen = true;
      this.schedulePenLoupe(s);
    } else {
      this.clearPenLoupe();
    }
    if (e.pointerType === 'touch' && this.touchTapGesture) {
      const originPt = this.touchTapGesture.startPoints.get(e.pointerId);
      if (originPt && distance(s, originPt) > 8) {
        this.touchTapGesture.moved = true;
      }
    }
    if (this.pointers.size >= 2) {
      const now = this.gestureState();
      if (this.gesture) {
        const dx = now.center.x - this.gesture.center.x;
        const dy = now.center.y - this.gesture.center.y;
        const dd = Math.abs(now.distance - this.gesture.distance);
        if (this.touchTapGesture && (Math.hypot(dx, dy) > 4 || dd > 4)) {
          this.touchTapGesture.moved = true;
        }
        this.renderer.camera.pan(dx, dy);
        if (this.gesture.distance > 4 && now.distance > 4) {
          this.renderer.camera.zoom(now.distance / this.gesture.distance, now.center);
        }
      }
      this.gesture = now;
      this.panned = true;
      this.render();
      return;
    }
    if (
      previous &&
      ((this.pointerTypes.get(e.pointerId) === 'touch' && this.penOnly) || this.pointerStart?.pan)
    ) {
      this.renderer.camera.pan(s.x - previous.x, s.y - previous.y);
      this.panned = true;
      this.render();
      return;
    }

    const rawWorld = this.renderer.camera.world(s);
    this.cursor = this.snapped(rawWorld);

    if (
      this.pointerStart &&
      this.tool === 'SELECT' &&
      !this.draggingGrip &&
      !this.draggingSelection &&
      distance(s, this.pointerStart.screen) > 4
    ) {
      this.dragBox = {
        a: this.pointerStart.world,
        b: rawWorld,
        crossing: s.x < this.pointerStart.screen.x,
      };
    } else if (this.tool === 'SELECT' && !this.draggingGrip && !this.draggingSelection) {
      this.activeGrip = this.hitGrip(rawWorld);
    }

    const zoomPct = Math.round((this.renderer.camera.scale / 4) * 100);
    if (this.statusCoordsEl) {
      this.statusCoordsEl.textContent = `X ${this.cursor.x.toFixed(2)}  Y ${this.cursor.y.toFixed(2)} mm · `;
      this.updateGridStatusLabel();
      this.statusTailEl.textContent = ` · zoom ${zoomPct}% · scale ${this.drawing.scale ?? this.drawing.sheet?.scale ?? '1:1'}`;
    } else {
      this.status.textContent = `X ${this.cursor.x.toFixed(2)}  Y ${this.cursor.y.toFixed(2)} mm · grid ${this.gridStep} mm · zoom ${zoomPct}% · scale ${this.drawing.scale ?? this.drawing.sheet?.scale ?? '1:1'}`;
    }
    if (this.tool === 'J') {
      const tol = (this.pen ? 28 : 20) / this.renderer.camera.scale;
      let best: { pt: Point; d: number } | undefined;
      for (const c of findAllLineCrossings(this.drawing)) {
        const dist = distance(c.point, rawWorld);
        if (dist <= tol && (!best || dist < best.d)) best = { pt: c.point, d: dist };
      }
      this.hoverCrossing = best?.pt;
    } else {
      this.hoverCrossing = undefined;
    }
    const base = this.activeBasePoint();
    if (base && this.cursor) {
      this.dimension.textContent = `${distance(base, this.cursor).toFixed(2)} mm · ${normAngle(angle(base, this.cursor)).toFixed(1)}°`;
    } else {
      this.dimension.textContent = '';
    }
    this.updateDynamicHud();
    this.render();
  }

  private pointerUp(e: PointerEvent): void {
    if (!this.pointers.has(e.pointerId)) return;
    const s = this.screen(e),
      start = this.pointerStart;
    this.pointers.delete(e.pointerId);
    this.pointerTypes.delete(e.pointerId);
    if (this.penActive === e.pointerId) this.penActive = undefined;
    if (e.pointerType !== 'touch') {
      try {
        if (this.canvas.hasPointerCapture(e.pointerId))
          this.canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* Ignore synthetic pointer release rejection */
      }
    }
    if (e.pointerType === 'pen') this.clearPenLoupe();
    if (this.pointers.size) {
      this.gesture = this.pointers.size >= 2 ? this.gestureState() : undefined;
      if (this.pointers.size === 1) this.remainingPanStart();
      this.panned = true;
      return;
    }
    if (e.pointerType === 'touch' && this.touchTapGesture) {
      const tap = this.touchTapGesture;
      this.touchTapGesture = undefined;
      if (!tap.moved && performance.now() - tap.startTime < 450) {
        if (tap.maxCount >= 2) {
          this.pointerStart = undefined;
          this.gesture = undefined;
          this.dragBox = undefined;
          if (tap.maxCount === 2) {
            this.undo();
            this.say('Two-finger tap: Undo');
          } else if (tap.maxCount >= 3) {
            this.redo();
            this.say('Three-finger tap: Redo');
          }
          return;
        }
        if (tap.maxCount === 1 && !this.panned && this.penOnly) {
          const w = this.renderer.camera.world(s);
          const hit = hitTest(this.drawing, w, 14 / this.renderer.camera.scale);
          this.selected.clear();
          if (hit && (this.readOnly || isEditable(this.drawing, hit))) {
            this.selected.add(hit.id);
            this.selectedTab = 'properties';
          }
          this.renderSide();
          this.updateSelectionBar();
          this.pointerStart = undefined;
          this.gesture = undefined;
          this.dragBox = undefined;
          this.render();
          return;
        }
      }
    }

    if (this.draggingGrip && this.activeGrip) {
      const target = this.snapped(this.renderer.camera.world(s));
      if (distance(s, start?.screen ?? s) > 3) {
        this.commitGripDrag(target);
      } else {
        this.draggingGrip = false;
      }
    } else if (this.draggingSelection && this.dragOriginWorld) {
      const target = this.snapped(this.renderer.camera.world(s));
      if (distance(s, start?.screen ?? s) > 3) {
        this.commitSelectionDrag(target);
      } else {
        this.draggingSelection = false;
        this.draggingCopy = false;
        this.dragOriginWorld = undefined;
        // Normal click without drag: Shift toggles selection in SELECT; in M/CO sets base grab point
        if (start?.shift || this.tool === 'M' || this.tool === 'CO') {
          this.accept(target, !!start?.shift, true);
        }
      }
    } else if (!this.panned && start?.id === e.pointerId) {
      if (this.dragBox) {
        const ids = selectBox(
          this.drawing,
          boundsOf([this.dragBox.a, this.dragBox.b]),
          this.dragBox.crossing,
        ).filter((id) => {
          const en = this.drawing.entities.find((en) => en.id === id)!;
          return this.readOnly || isEditable(this.drawing, en);
        });
        if (!start.shift) this.selected.clear();
        ids.forEach((id) => this.selected.add(id));
        this.renderSide();
        this.updateSelectionBar();
      } else if (!start.pan) {
        const p = this.snapped(this.renderer.camera.world(s));
        const dragStart = this.penPreviewStart;
        this.penPreviewStart = undefined;
        if (
          e.pointerType === 'pen' &&
          dragStart &&
          !this.points.length &&
          distance(s, start.screen) > 8 &&
          ['L', 'C', 'REC', 'W', 'DIM'].includes(this.tool)
        ) {
          const endSnap = this.snap;
          this.snap = this.penPreviewAttachment
            ? { point: dragStart, kind: 'Port', attachment: this.penPreviewAttachment }
            : undefined;
          this.accept(dragStart, false, true);
          this.snap = endSnap;
          this.accept(p, e.shiftKey, true);
        } else this.accept(p, e.shiftKey, true);
      }
    }

    this.pointerStart = undefined;
    this.penPreviewStart = undefined;
    this.penPreviewAttachment = undefined;
    this.dragBox = undefined;
    this.gesture = undefined;
    this.updateDynamicHud();
    this.render();
  }

  private pointerCancel(e: PointerEvent): void {
    this.clearPenLoupe();
    this.pointers.delete(e.pointerId);
    this.pointerTypes.delete(e.pointerId);
    if (this.penActive === e.pointerId) this.penActive = undefined;
    if (e.pointerType === 'pen') {
      this.penPreviewStart = undefined;
      this.pen = false;
    }
    if (this.pointers.size > 0) {
      this.gesture = this.pointers.size >= 2 ? this.gestureState() : undefined;
      if (this.pointers.size === 1) this.remainingPanStart();
      this.panned = true;
      this.render();
      return;
    }
    this.touchTapGesture = undefined;
    this.pointerStart = undefined;
    this.penPreviewStart = undefined;
    this.dragBox = undefined;
    this.gesture = undefined;
    this.draggingGrip = false;
    this.draggingSelection = false;
    this.draggingCopy = false;
    this.dragOriginWorld = undefined;
    this.panned = true;
    this.pen = false;
    this.cursor = undefined;
    this.cursorScreen = undefined;
    this.snap = undefined;
    this.guides = [];
    this.polarRay = undefined;
    this.updateDynamicHud();
    this.render();
  }

  private wheel = (e: WheelEvent): void => {
    e.preventDefault();
    const mouse = this.inputBindings.mouse;
    if (mouse.wheelMode === 'pan_vertical') {
      this.renderer.camera.pan(-e.deltaX * 0.5, -e.deltaY * 0.5);
    } else {
      const sign = mouse.invertWheelZoom ? 1 : -1;
      this.renderer.camera.zoom(Math.exp(sign * e.deltaY * 0.0015), this.screen(e));
    }
    this.render();
  };

  private runShortcutAction(action: ShortcutAction): boolean {
    switch (action) {
      case 'toggleOsnap':
        this.osnap = !this.osnap;
        this.updateToggles();
        return true;
      case 'toggleOrtho':
        this.ortho = !this.ortho;
        if (this.ortho) this.polar = false;
        this.updateToggles();
        this.persistSettings();
        this.render();
        return true;
      case 'toggleGridSnap':
        this.gridSnap = !this.gridSnap;
        this.updateToggles();
        this.persistSettings();
        this.render();
        return true;
      case 'togglePolar':
        this.polar = !this.polar;
        if (this.polar) this.ortho = false;
        this.updateToggles();
        this.persistSettings();
        this.render();
        return true;
      case 'toggleTracking':
        this.tracking = !this.tracking;
        this.updateToggles();
        this.persistSettings();
        this.render();
        return true;
      case 'toggleDynamicInput':
        this.dynamicInput = !this.dynamicInput;
        this.updateToggles();
        this.updateDynamicHud();
        this.persistSettings();
        return true;
      case 'find':
        this.openFindModal();
        return true;
      case 'toolSelect':
        this.setTool('SELECT');
        return true;
      case 'toolLine':
        this.setTool('L');
        return true;
      case 'toolPolyline':
        this.setTool('PL');
        return true;
      case 'toolMove':
        this.setTool('M');
        return true;
      case 'toolCopy':
        this.setTool('CO');
        return true;
      case 'toolRotate':
        this.setTool('RO');
        return true;
      case 'toolScale':
        this.setTool('SC');
        return true;
      case 'toolOffset':
        this.setTool('O');
        return true;
      case 'toolMatchProp':
        this.setTool('MA');
        return true;
      case 'toolTrim':
        this.setTool('TR');
        return true;
      case 'toolExtend':
        this.setTool('EX');
        return true;
    }
  }

  private keyDown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    if (target.matches('input,textarea,select') || target.closest('[role="dialog"]')) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && this.host.save) {
      e.preventDefault();
      e.stopPropagation();
      this.run(() => this.host.save!());
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      e.stopPropagation();
      e.shiftKey ? this.redo() : this.undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      e.stopPropagation();
      this.redo();
      return;
    }
    for (const [action, combo] of Object.entries(this.inputBindings.shortcuts) as [
      ShortcutAction,
      string | undefined,
    ][]) {
      if (combo && matchesKeyCombo(e, combo)) {
        e.preventDefault();
        e.stopPropagation();
        this.runShortcutAction(action);
        return;
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this.cancel();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.finish();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.erase();
    } else if (e.code === 'Space') {
      e.preventDefault();
      this.finish();
    } else if (
      this.dynamicInput &&
      this.activeBasePoint() &&
      /^[0-9.\-]$/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      // Typing digits while drawing with Dynamic Input immediately populates the floating length box
      e.preventDefault();
      this.dynEditing = true;
      this.dynHud.hidden = false;
      this.dynDistInput.value = e.key;
      this.dynDistInput.focus();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      this.command.focus();
      this.command.value = e.key;
    }
  }

  executeCommand(input: string): void {
    const raw = input.trim(),
      upper = raw.toUpperCase();
    if (!raw) {
      this.finish();
      return;
    }
    if (upper === 'U' && this.tool === 'PL' && this.points.length > 1) {
      this.points.pop();
      this.attachments.pop();
      this.updatePrompt();
      this.render();
      return;
    }
    if (upper === 'UNDO' || upper === 'U') {
      this.undo();
      return;
    }
    if (upper === 'REDO') {
      this.redo();
      return;
    }
    if (upper === 'Z' || upper === 'ZOOM') {
      this.fit();
      return;
    }
    if (upper === 'ESC') {
      this.cancel();
      return;
    }
    if (upper === 'GROUP' || upper === 'G') {
      this.groupSelection();
      return;
    }
    if (upper === 'UNGROUP' || upper === 'UG' || upper === 'EXPLODE' || upper === 'X') {
      this.ungroupSelection();
      return;
    }
    if (upper === 'JOIN') {
      if (this.selected.size >= 2) {
        this.transact('Join', (d) => joinEntities(d, this.selected));
      } else this.say('Select at least 2 connected lines to join.');
      return;
    }
    if (['ORTHO', 'OSNAP', 'SNAP', 'POLAR', 'OTRACK', 'DYN'].includes(upper)) {
      if (upper === 'ORTHO') {
        this.ortho = !this.ortho;
        if (this.ortho) this.polar = false;
      } else if (upper === 'POLAR') {
        this.polar = !this.polar;
        if (this.polar) this.ortho = false;
      } else if (upper === 'SNAP') this.gridSnap = !this.gridSnap;
      else if (upper === 'OTRACK') this.tracking = !this.tracking;
      else if (upper === 'DYN') this.dynamicInput = !this.dynamicInput;
      else this.osnap = !this.osnap;
      this.updateToggles();
      this.updateDynamicHud();
      this.persistSettings();
      this.render();
      return;
    }
    if (['C', 'CH', 'CLOSE'].includes(upper) && this.tool === 'PL' && this.points.length > 0) {
      this.finish(true);
      return;
    }
    const [rawTyped, arg] = upper.split(/\s+/, 2);
    const mappedCmd = this.inputBindings.customAliases[rawTyped] ?? rawTyped;
    if (mappedCmd === 'FIND' || mappedCmd === 'SEARCH') {
      this.openFindModal();
      return;
    }
    if (mappedCmd === 'PRINT' || mappedCmd === 'PLOT') {
      this.openPrintModal();
      return;
    }
    if (mappedCmd === 'PAGES' || mappedCmd === 'PAGE') {
      this.openPagesModal();
      return;
    }
    const aliases: Record<string, Tool> = {
      LINE: 'L',
      PLINE: 'PL',
      POLYLINE: 'PL',
      WIRE: 'W',
      CIRCLE: 'C',
      ARC: 'A',
      RECTANGLE: 'REC',
      RECTANG: 'REC',
      DIM: 'DIM',
      DIMENSION: 'DIM',
      DIMALIGNED: 'DIM',
      DIMLINEAR: 'DIM',
      D: 'DIM',
      TEXT: 'T',
      INSERT: 'I',
      MOVE: 'M',
      COPY: 'CO',
      ROTATE: 'RO',
      SCALE: 'SC',
      MIRROR: 'MI',
      MATCHPROP: 'MA',
      MATCH: 'MA',
      OFFSET: 'O',
      BRIDGE: 'J',
      JUMP: 'J',
      FILLET: 'F',
      ERASE: 'E',
      DELETE: 'E',
      TRIM: 'TR',
      EXTEND: 'EX',
      DIST: 'DIST',
      DI: 'DIST',
      MEASURE: 'DIST',
      SELECT: 'SELECT',
      PAN: 'PAN',
    };
    const alias = aliases[mappedCmd] ?? mappedCmd;
    if (tools.some(([t]) => t === alias)) {
      if (alias === 'SELECT') this.postDimEl.hidden = true;
      this.setTool(alias as Tool);
      if (arg && Number.isFinite(Number(arg))) {
        if (alias === 'RO') this.rotation = Number(arg);
        else if (alias === 'SC' && Number(arg) > 0) this.scaleFactor = Number(arg);
        else if (alias === 'O') this.offsetDistance = Math.abs(Number(arg));
        else if (alias === 'F') this.filletRadius = Math.max(0, Number(arg));
      }
      return;
    }
    const coordinate = raw.match(/^(@)?\s*(-?\d+(?:\.\d*)?)\s*([,<])\s*(-?\d+(?:\.\d*)?)$/);
    if (coordinate) {
      const last = this.points[this.points.length - 1] ?? { x: 0, y: 0 },
        x = Number(coordinate[2]),
        y = Number(coordinate[4]);
      let p: Point;
      if (coordinate[3] === '<') p = polar(coordinate[1] ? last : { x: 0, y: 0 }, x, y);
      else p = coordinate[1] ? add(last, { x, y }) : { x, y };
      this.snap = undefined;
      this.accept(p, false);
      this.render();
      return;
    }
    const number = Number(raw);
    if (Number.isFinite(number)) {
      if (this.tool === 'RO') {
        this.rotation = number;
        if (this.points.length) this.finish();
        return;
      }
      if (this.tool === 'SC' && number > 0) {
        this.scaleFactor = number;
        if (this.selected.size) {
          const origin = this.points[0] ?? this.selectionCenter();
          this.applyTransform(origin, origin, number);
          this.setTool('SELECT');
        } else {
          this.say(`Scale factor set to ${number}×. Select objects to scale.`);
        }
        return;
      }
      if (this.tool === 'O' && number > 0) {
        this.offsetDistance = number;
        this.say(`Offset distance set to ${number} mm. Click entity to offset.`);
        return;
      }
      if (this.tool === 'F' && number >= 0) {
        this.filletRadius = number;
        this.say(`Fillet radius set to ${number} mm.`);
        return;
      }
      const last = this.points[this.points.length - 1];
      if (last) {
        this.snap = undefined;
        this.accept(polar(last, number, this.cursor ? angle(last, this.cursor) : 0), false);
        this.render();
        return;
      }
    }
    this.say(
      'Unknown command. Use LINE / PLINE / WIRE / DIM / OFFSET / FILLET / TRIM / EXTEND or x,y coordinates.',
    );
  }

  private canDraw(): boolean {
    const layer = this.drawing.layers.find((l) => l.id === this.currentLayer);
    if (!layer || layer.locked || !layer.visible) {
      this.say('Choose a visible, unlocked layer.', true);
      return false;
    }
    return !this.readOnly;
  }

  private accept(p: Point, shift: boolean, fromPointer = false): void {
    this.message = '';
    const hit = hitTest(this.drawing, p, (this.pen ? 14 : 8) / this.renderer.camera.scale);
    if (this.tool === 'PAN') return;
    if (this.tool === 'SELECT') {
      if (!shift) this.selected.clear();
      if (hit && (this.readOnly || isEditable(this.drawing, hit))) {
        if (shift && this.selected.has(hit.id)) this.selected.delete(hit.id);
        else this.selected.add(hit.id);
      }
      if (this.selected.size) this.selectedTab = 'properties';
      this.renderSide();
      this.updateSelectionBar();
      this.render();
      return;
    }
    if (this.tool === 'DIST') {
      this.points.push(p);
      if (this.points.length === 2) {
        const a = this.points[0],
          b = this.points[1],
          dx = Math.abs(b.x - a.x),
          dy = Math.abs(b.y - a.y),
          d = distance(a, b),
          ang = normAngle(angle(a, b));
        this.say(
          `Measure: ${d.toFixed(2)} mm | ΔX=${dx.toFixed(2)} mm, ΔY=${dy.toFixed(2)} mm, ∠=${ang.toFixed(1)}°`,
          true,
        );
        this.points = [];
      } else {
        this.updatePrompt();
      }
      this.render();
      return;
    }
    if (this.readOnly) return;

    // Smart One-Click Trim & Extend (also supports pre-selected cutting/boundary edges!)
    if (this.tool === 'TR' || this.tool === 'EX') {
      if (!hit || !isEditable(this.drawing, hit)) {
        this.say(
          this.tool === 'TR'
            ? 'Click directly on the segment portion you want to trim.'
            : 'Click near the endpoint of the line you want to extend.',
        );
        return;
      }
      const boundaries =
        this.selected.size && !this.selected.has(hit.id) ? this.selected : undefined;
      let success = false;
      this.transact(this.tool === 'TR' ? 'Trim' : 'Extend', (d) => {
        success =
          this.tool === 'TR'
            ? autoTrim(d, hit.id, p, boundaries)
            : autoExtend(d, hit.id, p, boundaries);
      });
      if (!success) {
        this.say(
          this.tool === 'TR'
            ? 'No intersection found along that segment to trim.'
            : 'No intersecting boundary found in that direction to extend to.',
        );
      }
      this.render();
      return;
    }

    if (this.tool === 'J') {
      const tol = (this.pen ? 28 : 20) / this.renderer.camera.scale;
      let best: LineCrossing | undefined;
      let bestD = Infinity;
      for (const c of findAllLineCrossings(this.drawing)) {
        const d = distance(c.point, p);
        if (d <= tol && d < bestD) {
          best = c;
          bestD = d;
        }
      }
      if (!best) {
        this.bridgePopEl.hidden = true;
        this.activeCrossingKey = undefined;
        this.say('Click directly on an intersection between two lines/wires.');
        return;
      }
      this.activeCrossingKey = best.key;
      this.openBridgePopover(best);
      this.say(
        `Intersection selected · Bridge ${best.active ? 'ON' : 'OFF'} (${best.axis}). Toggle or switch Horizontal/Vertical.`,
      );
      this.render();
      return;
    }

    if (this.tool === 'MA') {
      if (!hit || !isEditable(this.drawing, hit)) {
        this.say('Click an editable object to sample or apply properties.');
        return;
      }
      if (!this.matchSourceId) {
        this.matchSourceId = hit.id;
        this.say('Source captured. Click target objects to match layer, color & linetype.');
        this.updateToolOptionsBar();
        this.render();
        return;
      }
      if (this.matchSourceId === hit.id) return;
      const srcId = this.matchSourceId;
      this.transact('Match Properties', (d) => {
        const src = d.entities.find((e) => e.id === srcId);
        const dst = d.entities.find((e) => e.id === hit.id);
        if (src && dst && isEditable(d, dst)) matchProperties(src, dst);
      });
      this.say('Properties copied. Click another object or press Esc to finish.');
      this.render();
      return;
    }

    if (this.tool === 'O') {
      if (!this.offsetSourceId) {
        if (hit && ['line', 'polyline', 'circle', 'arc'].includes(hit.type)) {
          if (this.offsetSide !== 'pointer') {
            const created =
              this.offsetSide === 'both'
                ? offsetBothSides(hit, this.offsetDistance)
                : (() => {
                    const one = offsetEntity(hit, this.offsetDistance, p, this.offsetSide);
                    return one ? [one] : [];
                  })();
            if (created.length) {
              this.addEntities(created, true);
              this.say(`Offset ${this.offsetDistance} mm (${this.offsetSide}) applied.`);
            } else {
              this.say('Offset collapsed or invalid at that distance.', true);
            }
            this.render();
            return;
          }
          this.offsetSourceId = hit.id;
          this.say(`Offset ${this.offsetDistance} mm: click the side to place copy.`);
        } else {
          this.say('Click a line, polyline, circle, or arc to offset.');
        }
        return;
      }
      const source = this.drawing.entities.find((e) => e.id === this.offsetSourceId);
      if (source) {
        const created =
          this.offsetSide === 'both'
            ? offsetBothSides(source, this.offsetDistance)
            : (() => {
                const one = offsetEntity(
                  source,
                  this.offsetDistance,
                  p,
                  this.offsetSide === 'pointer' ? 'pointer' : this.offsetSide,
                );
                return one ? [one] : [];
              })();
        if (created.length) this.addEntities(created, true);
        else this.say('Offset collapsed at that distance.', true);
      }
      this.offsetSourceId = undefined;
      this.updatePrompt();
      this.render();
      return;
    }

    if (this.tool === 'F') {
      if (!hit || hit.type !== 'line' || !isEditable(this.drawing, hit)) {
        this.say('Select a straight LINE entity to fillet.');
        return;
      }
      if (!this.filletFirstId) {
        this.filletFirstId = hit.id;
        this.say(`First line selected (R=${this.filletRadius} mm). Select second line.`);
        return;
      }
      if (this.filletFirstId === hit.id) return;
      const firstId = this.filletFirstId,
        secondId = hit.id;
      let ok = false;
      this.transact('Fillet', (d) => {
        const l1 = d.entities.find((e): e is Line => e.id === firstId && e.type === 'line');
        const l2 = d.entities.find((e): e is Line => e.id === secondId && e.type === 'line');
        if (!l1 || !l2) return;
        const arc = filletLines(l1, l2, this.filletRadius);
        if (arc) d.entities.push(arc);
        ok = true;
      });
      this.filletFirstId = undefined;
      if (!ok) this.say('Lines are parallel and cannot be filleted.');
      this.updatePrompt();
      this.render();
      return;
    }

    if (['M', 'CO', 'RO', 'SC', 'MI', 'E'].includes(this.tool)) {
      if (!this.selected.size) {
        if (hit && isEditable(this.drawing, hit)) {
          this.selected.add(hit.id);
          this.renderSide();
          this.updateSelectionBar();
          if (this.tool === 'E') {
            this.erase();
            return;
          }
          if (fromPointer && this.tool === 'M') {
            this.points.push(p);
            this.say('Object grabbed. Click destination to move.');
          } else {
            this.say('Object selected. Specify the base point.');
          }
        } else this.say('Select an editable object first.');
        this.render();
        return;
      }
      if (this.tool === 'E') {
        this.erase();
        return;
      }
      if (
        fromPointer &&
        this.tool === 'CO' &&
        this.points.length === 0 &&
        (!hit || !this.selected.has(hit.id))
      ) {
        this.applyTransform(this.selectionCenter(), p);
        this.say('Copy placed at cursor. Click again to stamp another copy or Esc to finish.');
        this.render();
        return;
      }
      this.points.push(p);
      if (this.points.length === 2) {
        this.applyTransform(this.points[0], p);
        this.points = [];
      }
      this.updatePrompt();
      this.render();
      return;
    }
    if (!this.canDraw()) return;
    if (this.tool === 'T') {
      const revision = this.revision;
      const baseTextH = this.drawing.projectSettings?.defaultTextHeight ?? 3.5;
      const defaultHeight = this.drawing.sheet?.autoScaleInserts
        ? Number(
            (
              baseTextH * worldScaleMultiplier(this.drawing.scale ?? this.drawing.sheet?.scale)
            ).toFixed(2),
          )
        : baseTextH;
      this.run(async () => {
        const values = await this.form('Technical text', [
          { key: 'text', label: 'Text', value: '' },
          { key: 'height', label: 'Height in mm', value: String(defaultHeight), type: 'number' },
          { key: 'rotation', label: 'Angle in degrees', value: '0', type: 'number' },
        ]);
        if (!values || this.disposed || revision !== this.revision) return;
        const height = Number(values.height),
          rotation = Number(values.rotation);
        if (!values.text || !(height > 0) || !Number.isFinite(rotation))
          throw new Error('Invalid text, height or angle');
        this.addEntities([
          {
            id: uid(),
            type: 'text',
            layer: this.currentLayer,
            position: p,
            text: values.text,
            height,
            rotation,
          },
        ]);
      });
      return;
    }
    if (this.tool === 'I') {
      const block = this.drawing.blocks.find((b) => b.id === this.currentBlock);
      if (!block) {
        this.say('Import or select a block.');
        return;
      }
      const attributes = { ...block.attributes };
      if (attributes.TAG) {
        const stem = attributes.TAG.replace(/[-\d]+$/, '');
        let n = 1;
        while (
          this.drawing.entities.some(
            (e) => e.type === 'insert' && e.attributes.TAG === `${stem}-${n}`,
          )
        )
          n++;
        attributes.TAG = `${stem}-${n}`;
      }
      const mult = this.drawing.sheet?.autoScaleInserts
        ? worldScaleMultiplier(this.drawing.scale ?? this.drawing.sheet?.scale)
        : 1;
      this.addEntities([
        {
          id: uid(),
          type: 'insert',
          layer: this.currentLayer,
          block: block.id,
          position: p,
          rotation: 0,
          scale: { x: mult, y: mult },
          attributes,
        },
      ]);
      return;
    }
    if (this.points.length && distance(p, this.points[this.points.length - 1]) < 1e-8) return;
    this.points.push(p);
    this.attachments.push(this.snap?.attachment);
    const count = this.tool === 'A' ? 3 : this.tool === 'PL' ? Infinity : 2;
    if (this.points.length === count) {
      const entities = this.makeEntities(this.points, false);
      this.addEntities(entities);
      // Single Line (`L`) completes after 2 points (non-broken straight line), unlike Polyline (`PL`).
      this.points = [];
      this.attachments = [];
    }
    this.updatePrompt();
    this.updateDynamicHud();
    this.render();
  }

  private addEntities(entities: Entity[], skipMeasureTab = false): void {
    if (!entities.length) return;
    entities.forEach((e) => {
      if (this.currentLineType) e.lineType = this.currentLineType;
      if (this.currentLinePattern?.length) e.linePattern = [...this.currentLinePattern];
      if (this.currentColor !== undefined) e.color = this.currentColor;
      if (e.type === 'line' || e.type === 'polyline' || e.type === 'wire') {
        if (this.currentArrows) e.arrows = clone(this.currentArrows);
        if (this.currentDiscipline !== 'general') e.discipline = this.currentDiscipline;
        if (this.currentServiceTag.trim()) e.serviceTag = this.currentServiceTag.trim();
        if (this.currentPipeSpec.trim()) e.pipeSpec = this.currentPipeSpec.trim();
        if (this.currentLineNotes.trim()) e.lineNotes = this.currentLineNotes.trim();
      }
    });
    this.transact(this.tool, (d) => d.entities.push(...entities));
    if (
      !skipMeasureTab &&
      this.postDrawMeasureTab &&
      ['L', 'PL', 'C', 'REC'].includes(this.tool) &&
      entities.length === 1
    ) {
      this.showPostDrawMeasureTab(entities[0]);
    }
  }

  private makeEntities(points: Point[], closed: boolean): Entity[] {
    const [a, b, c] = points,
      base = {
        id: uid(),
        layer: this.currentLayer,
        lineType: this.currentLineType,
        ...(this.currentLinePattern?.length ? { linePattern: [...this.currentLinePattern] } : {}),
      };
    if (!a || !b) return [];
    const attachDynamic =
      this.dynamicPortConnectors || !!this.drawing.projectSettings?.dynamicPortConnectors;
    switch (this.tool) {
      case 'L': {
        const from = attachDynamic ? this.attachments[0] : undefined;
        const to = attachDynamic ? (this.attachments[1] ?? this.snap?.attachment) : undefined;
        return [
          {
            ...base,
            type: 'line',
            a,
            b,
            ...(from ? { from } : {}),
            ...(to ? { to } : {}),
          },
        ];
      }
      case 'PL': {
        const from = attachDynamic && !closed ? this.attachments[0] : undefined;
        const to =
          attachDynamic && !closed
            ? (this.attachments[points.length - 1] ?? this.snap?.attachment)
            : undefined;
        return [
          {
            ...base,
            type: 'polyline',
            points: [...points],
            closed,
            ...(from ? { from } : {}),
            ...(to ? { to } : {}),
          },
        ];
      }
      case 'W': {
        const wire: Extract<Entity, { type: 'wire' }> = {
          ...base,
          type: 'wire',
          points: [a, b],
          from: this.attachments[0],
          to: this.attachments[1] ?? this.snap?.attachment,
        };
        routeWire(this.drawing, wire);
        return [wire];
      }
      case 'C':
        return distance(a, b) > 1e-8
          ? [{ ...base, type: 'circle', center: a, radius: distance(a, b) }]
          : [];
      case 'A':
        return c && distance(a, b) > 1e-8
          ? [
              {
                ...base,
                type: 'arc',
                center: a,
                radius: distance(a, b),
                start: angle(a, b),
                end: angle(a, c),
              },
            ]
          : [];
      case 'REC':
        return [
          {
            ...base,
            type: 'polyline',
            points: [a, { x: b.x, y: a.y }, b, { x: a.x, y: b.y }],
            closed: true,
          },
        ];
      case 'DIM': {
        if (distance(a, b) <= 1e-8) return [];
        const mult = this.drawing.sheet?.autoScaleInserts
          ? worldScaleMultiplier(this.drawing.scale ?? this.drawing.sheet?.scale)
          : 1;
        return [
          {
            ...base,
            type: 'dimension',
            kind: 'aligned',
            a,
            b,
            offset: 8 * mult,
          },
        ];
      }
      default:
        return [];
    }
  }

  finish(closed = false): void {
    if (this.tool === 'SELECT') {
      this.setTool(this.lastTool);
      return;
    }
    if (this.tool === 'PL' && this.points.length >= 2)
      this.addEntities(this.makeEntities(this.points, closed));
    if (this.tool === 'RO' && this.points.length === 1)
      this.applyTransform(this.points[0], polar(this.points[0], 1, this.rotation), this.rotation);
    if (this.tool === 'SC' && this.selected.size) {
      const origin = this.points[0] ?? this.selectionCenter();
      this.applyTransform(origin, origin, this.scaleFactor);
    }
    if (this.tool === 'E') this.erase();
    this.setTool('SELECT');
  }

  private scaleFactorFor(base: Point, destination: Point): number {
    const center = this.selectionCenter();
    const ref = Math.max(10, distance(base, center));
    return Math.max(0.05, Number((distance(base, destination) / ref).toFixed(3)));
  }

  private applyTransform(base: Point, destination: Point, param?: number): void {
    const tool = this.tool;
    if (tool === 'SC') {
      const factor = param && param > 0 ? param : this.scaleFactorFor(base, destination);
      this.transact('Scale', (d) => {
        const ids = new Set(
          d.entities.filter((e) => this.selected.has(e.id) && isEditable(d, e)).map((e) => e.id),
        );
        d.entities.forEach((e) => {
          if (ids.has(e.id)) scaleEntity(e, base, factor);
        });
      });
      return;
    }
    let matrix = identity();
    if (tool === 'M' || tool === 'CO') {
      matrix.e = destination.x - base.x;
      matrix.f = destination.y - base.y;
    } else if (tool === 'RO') matrix = around(base, param ?? angle(base, destination));
    else if (tool === 'MI') matrix = around(base, angle(base, destination) * 2, true);
    this.transact(tool, (d) => {
      const ids = new Set(
        d.entities.filter((e) => this.selected.has(e.id) && isEditable(d, e)).map((e) => e.id),
      );
      if (tool === 'CO') copyEntities(d, ids, matrix);
      else
        d.entities.forEach((e) => {
          if (ids.has(e.id)) transformEntity(e, matrix);
        });
    });
  }

  private erase(): void {
    this.transact('Erase', (d) => {
      d.entities = d.entities.filter((e) => !this.selected.has(e.id) || !isEditable(d, e));
    });
    this.selected.clear();
    this.renderSide();
    this.updateSelectionBar();
    this.render();
  }

  private preview(): Entity[] {
    if (!this.cursor) return [];
    if (this.draggingGrip && this.activeGrip) {
      const target = this.drawing.entities.find((e) => e.id === this.activeGrip!.entityId);
      if (target) {
        const copy = clone(target);
        applyGripDrag(copy, this.activeGrip, this.cursor, this.gripMode);
        return [copy];
      }
    }
    if (this.draggingSelection && this.dragOriginWorld) {
      const delta = sub(this.cursor, this.dragOriginWorld);
      const m = { ...identity(), e: delta.x, f: delta.y };
      return this.drawing.entities
        .filter((e) => this.selected.has(e.id))
        .map((e) => {
          const copy = clone(e);
          transformEntity(copy, m);
          return copy;
        });
    }
    if (this.tool === 'CO' && this.selected.size > 0 && this.points.length === 0) {
      const center = this.selectionCenter();
      const m = {
        ...identity(),
        e: this.cursor.x - center.x,
        f: this.cursor.y - center.y,
      };
      return this.drawing.entities
        .filter((e) => this.selected.has(e.id))
        .map((e) => {
          const copy = clone(e);
          transformEntity(copy, m);
          return copy;
        });
    }
    if (this.tool === 'O' && this.offsetSourceId) {
      const source = this.drawing.entities.find((e) => e.id === this.offsetSourceId);
      if (source) {
        if (this.offsetSide === 'both') return offsetBothSides(source, this.offsetDistance);
        const prev = offsetEntity(
          source,
          this.offsetDistance,
          this.cursor,
          this.offsetSide === 'pointer' ? 'pointer' : this.offsetSide,
        );
        return prev ? [prev] : [];
      }
    }
    if (this.tool === 'I') {
      const b = this.drawing.blocks.find((b) => b.id === this.currentBlock);
      const mult = this.drawing.sheet?.autoScaleInserts
        ? worldScaleMultiplier(this.drawing.scale ?? this.drawing.sheet?.scale)
        : 1;
      return b
        ? [
            {
              id: 'preview',
              type: 'insert',
              layer: this.currentLayer,
              block: b.id,
              position: this.cursor,
              rotation: 0,
              scale: { x: mult, y: mult },
              attributes: {},
            },
          ]
        : [];
    }
    if (this.penPreviewStart && !this.points.length)
      return this.makeEntities([this.penPreviewStart, this.cursor], false);
    if (!this.points.length) return [];
    if (this.tool === 'DIST') {
      return [
        {
          id: 'preview-dist',
          type: 'line',
          layer: '0',
          lineType: 'DASHED',
          a: this.points[0],
          b: this.cursor,
        },
      ];
    }
    if (['M', 'CO', 'RO', 'SC', 'MI'].includes(this.tool)) {
      const base = this.points[0];
      if (this.tool === 'SC') {
        const factor = this.scaleFactorFor(base, this.cursor);
        return this.drawing.entities
          .filter((e) => this.selected.has(e.id))
          .map((e) => {
            const copy = clone(e);
            scaleEntity(copy, base, factor);
            return copy;
          });
      }
      const m =
        this.tool === 'M' || this.tool === 'CO'
          ? {
              ...identity(),
              e: this.cursor.x - base.x,
              f: this.cursor.y - base.y,
            }
          : around(
              base,
              angle(base, this.cursor) * (this.tool === 'MI' ? 2 : 1),
              this.tool === 'MI',
            );
      return this.drawing.entities
        .filter((e) => this.selected.has(e.id))
        .map((e) => {
          const copy = clone(e);
          transformEntity(copy, m);
          return copy;
        });
    }
    return this.makeEntities([...this.points, this.cursor], false);
  }

  render(): void {
    if (this.disposed || this.frame) return;
    this.frame = this.canvas.ownerDocument.defaultView!.requestAnimationFrame(() => {
      this.frame = 0;
      if (this.disposed) return;
      this.renderer.gridStep = this.gridStep;
      this.renderer.render(this.drawing, {
        selected: this.selected,
        preview: this.preview(),
        cursor: this.cursor,
        snap: this.snap,
        pen: this.pen,
        penLoupe: this.penLoupeVisible,
        box: this.dragBox,
        guides: this.guides,
        polarRay: this.polarRay,
        grips: this.allSelectedGrips(),
        activeGripId: this.activeGrip?.id,
        highlightId: this.highlightId,
        crossingHighlight: this.hoverCrossing,
      });
    });
  }

  private renderSide(): void {
    const prevScroll =
      this.selectedTab === this.lastRenderedTab
        ? (this.side.querySelector<HTMLElement>('.cad-panel')?.scrollTop ?? 0)
        : 0;
    this.lastRenderedTab = this.selectedTab;
    this.root.querySelectorAll<HTMLElement>('.cad-ltype-popover[data-ltype-owner]').forEach((p) => {
      if (p.dataset.ltypeOwner !== 'Current linetype') p.remove();
    });
    this.side.replaceChildren();
    const tabs = element(this.side, 'div', 'cad-tabs');
    for (const [id, label] of [
      ['library', 'Symbols'],
      ['layers', 'Layers'],
      ['properties', 'Properties'],
      ['sheet', 'Sheet & BOM'],
    ]) {
      const b = button(tabs, label, () => {
        this.selectedTab = id;
        this.renderSide();
      });
      b.setAttribute('aria-pressed', String(id === this.selectedTab));
    }
    const pane = element(this.side, 'div', 'cad-panel');
    if (this.selectedTab === 'library') this.renderLibrary(pane);
    else if (this.selectedTab === 'layers') this.renderLayers(pane);
    else if (this.selectedTab === 'sheet') this.renderSheetAndBom(pane);
    else this.renderProperties(pane);
    if (prevScroll > 0) pane.scrollTop = prevScroll;
  }

  private blockPreviewSrc(b: Block): string {
    const key = `${b.id}:${b.entities.length}`;
    const cached = symbolIconCache.get(key);
    if (cached) return cached;
    const preview: Drawing = {
      version: 1,
      units: 'mm',
      layers: this.drawing.layers,
      blocks: this.drawing.blocks,
      entities: [
        {
          id: 'icon',
          type: 'insert',
          layer: '0',
          block: b.id,
          position: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          attributes: {},
        },
      ],
    };
    const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(preview, '#a5b7c9', 'transparent', 0.7))}`;
    symbolIconCache.set(key, uri);
    return uri;
  }

  private renderLibrary(pane: HTMLElement): void {
    element(pane, 'h3', '', 'Block library');

    const libSection = (title: string): HTMLElement => {
      const det = element(pane, 'details', 'cad-prop-section');
      const key = `lib:${title}`;
      det.open = this.openPropSections.has(key);
      const sum = element(det, 'summary', '', title);
      sum.addEventListener('click', (ev) => {
        ev.preventDefault();
        det.open = !det.open;
        if (det.open) this.openPropSections.add(key);
        else this.openPropSections.delete(key);
      });
      return element(det, 'div', 'cad-prop-body');
    };

    if (!this.readOnly) {
      const toolsBody = libSection('Library Tools');
      const actions = element(toolsBody, 'div', 'cad-actions');
      button(actions, 'Library Manager', () => this.openLibraryManager());
      button(actions, 'Import DXF', () =>
        this.run(async () => {
          const imported = await this.host.importLibrary();
          if (!imported || this.disposed) return;
          let n = 0;
          this.transact('Import library', (d) => {
            n = mergeLibrary(d, imported);
          });
          this.say(`${n} blocks added to the library.`, true);
        }),
      );
      button(actions, 'Save library', () => this.run(() => this.host.saveLibrary(this.drawing)));
    }

    const catalogs = new Map(builtinLibrary().map((b) => [b.id, b]));
    const info = (b: Block): Block => {
      const official = catalogs.get(b.id);
      return official
        ? {
            ...b,
            library: official.library,
            group: official.group,
            standard: official.standard,
          }
        : b;
    };
    const libraryOf = (b: Block) => info(b).library ?? 'User / imported';
    const standardOf = (b: Block) => info(b).standard ?? 'Custom';
    const groupOf = (b: Block) => info(b).group ?? b.category;

    const browseBar = element(pane, 'div', 'cad-browse-row');
    const search = element(browseBar, 'input');
    search.type = 'search';
    search.value = this.librarySearch;
    search.placeholder = 'Search symbols or standard (ISA-5.1, IEC 60617)…';
    search.setAttribute('aria-label', 'Search symbols');

    const browseBtn = button(
      browseBar,
      '',
      () => {
        this.libraryBrowseOpen = !this.libraryBrowseOpen;
        if (!this.libraryBrowseOpen) this.openPropSections.delete('lib:symbols');
        this.renderSide();
      },
      'Browse all symbols',
    );
    setToolIcon(browseBtn, 'FIND', 'Browse');
    browseBtn.setAttribute('aria-pressed', String(this.libraryBrowseOpen));

    const filtersBody = libSection('Filters');
    const libraries = [...new Set(this.drawing.blocks.map(libraryOf))].sort();
    const librarySelect = choice(
      filtersBody,
      [
        ['', 'All libraries'],
        ...libraries.map(
          (v) =>
            [v, `${v} (${this.drawing.blocks.filter((b) => libraryOf(b) === v).length})`] as [
              string,
              string,
            ],
        ),
      ],
      this.libraryFilter,
      (v) => {
        this.libraryFilter = v;
        this.standardFilter = '';
        this.groupFilter = '';
        if (v) this.libraryBrowseOpen = true;
        this.renderSide();
      },
    );
    librarySelect.setAttribute('aria-label', 'Symbol library');

    const standards = [
      ...new Set(
        this.drawing.blocks
          .filter((b) => !this.libraryFilter || libraryOf(b) === this.libraryFilter)
          .map(standardOf),
      ),
    ].sort();
    const standardSelect = choice(
      filtersBody,
      [['', 'All standards'], ...standards.map((v) => [v, `Standard: ${v}`] as [string, string])],
      this.standardFilter,
      (v) => {
        this.standardFilter = v;
        this.groupFilter = '';
        if (v) this.libraryBrowseOpen = true;
        this.renderSide();
      },
    );
    standardSelect.setAttribute('aria-label', 'Symbol standard');

    const groups = [
      ...new Set(
        this.drawing.blocks
          .filter(
            (b) =>
              (!this.libraryFilter || libraryOf(b) === this.libraryFilter) &&
              (!this.standardFilter || standardOf(b) === this.standardFilter),
          )
          .map(groupOf),
      ),
    ].sort();
    const groupSelect = choice(
      filtersBody,
      [['', 'All families'], ...groups.map((v) => [v, v] as [string, string])],
      this.groupFilter,
      (v) => {
        this.groupFilter = v;
        if (v) this.libraryBrowseOpen = true;
        this.renderSide();
      },
    );
    groupSelect.setAttribute('aria-label', 'Symbol family');

    const sortSelect = choice(
      filtersBody,
      [
        ['name', 'Sort: Name (A–Z)'],
        ['standard', 'Sort: Standard'],
        ['tag', 'Sort: TAG prefix'],
        ['group', 'Sort: Family'],
      ],
      this.librarySort,
      (v) => {
        this.librarySort = v as LibrarySortOrder;
        this.renderSide();
      },
    );
    sortSelect.setAttribute('aria-label', 'Sort symbols');

    const symDet = element(pane, 'details', 'cad-prop-section');
    const hasActiveFilter =
      this.libraryBrowseOpen ||
      !!this.librarySearch.trim() ||
      !!this.libraryFilter ||
      !!this.standardFilter ||
      !!this.groupFilter ||
      this.openPropSections.has('lib:symbols');
    symDet.open = hasActiveFilter;
    const symSum = element(
      symDet,
      'summary',
      '',
      `Available Symbols (${this.drawing.blocks.length})`,
    );
    symSum.addEventListener('click', (ev) => {
      ev.preventDefault();
      symDet.open = !symDet.open;
      this.libraryBrowseOpen = symDet.open;
      if (symDet.open) this.openPropSections.add('lib:symbols');
      else this.openPropSections.delete('lib:symbols');
    });
    const list = element(symDet, 'div', 'cad-symbols');

    const populate = (): void => {
      list.replaceChildren();
      let currentHeader = '';
      const matches = this.drawing.blocks.filter(
        (b) =>
          (!this.libraryFilter || libraryOf(b) === this.libraryFilter) &&
          (!this.standardFilter || standardOf(b) === this.standardFilter) &&
          (!this.groupFilter || groupOf(b) === this.groupFilter),
      );
      const q = search.value.toLocaleLowerCase();
      const filtered = matches
        .filter((b) =>
          `${b.name} ${b.category} ${libraryOf(b)} ${standardOf(b)} ${groupOf(b)} ${b.attributes.TAG ?? ''}`
            .toLocaleLowerCase()
            .includes(q),
        )
        .sort((a, b) => {
          const libCmp = libraryOf(a).localeCompare(libraryOf(b));
          if (libCmp !== 0) return libCmp;
          const stdCmp = standardOf(a).localeCompare(standardOf(b));
          if (stdCmp !== 0) return stdCmp;
          if (this.librarySort === 'tag') {
            const tCmp = (a.attributes.TAG ?? '').localeCompare(b.attributes.TAG ?? '');
            if (tCmp !== 0) return tCmp;
          }
          const grpCmp = groupOf(a).localeCompare(groupOf(b));
          if (grpCmp !== 0 && this.librarySort !== 'name') return grpCmp;
          return a.name.localeCompare(b.name);
        });
      symSum.textContent = `Available Symbols (${filtered.length})`;

      for (const b of filtered) {
        const header = `${libraryOf(b)} / ${standardOf(b)} / ${groupOf(b)}`;
        if (header !== currentHeader) {
          currentHeader = header;
          element(list, 'h4', 'cad-tree-header', header);
        }
        const item = button(list, catalogs.has(b.id) ? englishBuiltinLabel(b.name) : b.name, () => {
          this.currentBlock = b.id;
          this.setTool('I');
          this.root.classList.remove('cad-panel-open');
        });
        item.className = 'cad-symbol';
        item.setAttribute('aria-pressed', String(this.currentBlock === b.id));
        const badge = element(item, 'small', 'cad-std-badge', standardOf(b));
        badge.setAttribute('aria-hidden', 'true');
        const img = element(item, 'img');
        img.alt = '';
        img.src = this.blockPreviewSrc(b);
      }
    };
    search.addEventListener('input', () => {
      this.librarySearch = search.value;
      if (search.value.trim()) symDet.open = true;
      populate();
    });
    populate();
  }

  /** Opens the centralized Library Manager modal for creating, importing, organizing, and deleting symbols/libraries. */
  openLibraryManager(): void {
    if (this.readOnly) return;
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-library-modal');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Centralized Library Manager');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    const head = element(dialog, 'div', 'cad-modal-header');
    element(head, 'h3', '', 'Centralized Symbol Library Manager');
    button(head, 'Close', finish);

    element(
      dialog,
      'p',
      'cad-help',
      'Create custom symbol sets for any discipline (P&ID, Electrical, Mechanical, Civil), assign custom metadata attributes, or import/remove libraries.',
    );

    const createBox = element(dialog, 'section', 'cad-manager-section');
    element(
      createBox,
      'h4',
      '',
      this.selected.size
        ? `Create Custom Symbol from Selection (${this.selected.size} entities selected)`
        : 'Create Custom Symbol / New Discipline Library',
    );
    const nameLabel = element(createBox, 'label', 'cad-field', 'Symbol name');
    const nameInput = element(nameLabel, 'input');
    nameInput.placeholder = 'e.g. Hydraulic Pump, Civil Column, Relief Valve';

    const libLabel = element(
      createBox,
      'label',
      'cad-field',
      'Library / Discipline (e.g. P&ID, Electrical multi-line, Mechanical, Civil)',
    );
    const libInput = element(libLabel, 'input');
    libInput.value = this.libraryFilter || 'Mechanical';

    const stdLabel = element(
      createBox,
      'label',
      'cad-field',
      'Standard (e.g. ANSI/ISA-5.1, ISO 10628, ISO 14617, IEC 60617, ANSI Y32, NFPA 79)',
    );
    const stdInput = element(stdLabel, 'input');
    stdInput.value = this.standardFilter || 'ISO 1219';

    const grpLabel = element(createBox, 'label', 'cad-field', 'Sub-tree Family / Group');
    const grpInput = element(grpLabel, 'input');
    grpInput.value = this.groupFilter || 'Custom Components';

    const tagLabel = element(createBox, 'label', 'cad-field', 'Default TAG prefix');
    const tagInput = element(tagLabel, 'input');
    tagInput.value = 'EQ';

    const portLabel = element(createBox, 'label', 'cad-field', 'Connection ports');
    const portSelect = choice(
      portLabel,
      [
        ['lr', 'Left & Right (IN / OUT)'],
        ['tb', 'Top & Bottom (IN / OUT)'],
        ['quad', '4-Way (IN / OUT / TOP / BOTTOM)'],
        ['none', 'No ports'],
      ],
      'lr',
      () => {},
    );

    const attrLabel = element(
      createBox,
      'label',
      'cad-field',
      'Custom metadata / attributes (KEY=VALUE comma-separated)',
    );
    const attrInput = element(attrLabel, 'input');
    attrInput.placeholder = 'RATING=PN16, MATERIAL=SS316, MANUFACTURER=ABB';

    const createActions = element(createBox, 'div', 'cad-actions');
    button(createActions, 'Create Symbol in Library', () => {
      const name = nameInput.value.trim();
      if (!name) {
        this.say('Enter a symbol name.', true);
        return;
      }
      const extraAttrs: Record<string, string> = {};
      for (const part of attrInput.value.split(',')) {
        const [k, ...rest] = part.split('=');
        const cleanK = k
          ?.trim()
          .toUpperCase()
          .replace(/[^A-Z0-9_-]/g, '_');
        if (cleanK) extraAttrs[cleanK] = rest.join('=').trim();
      }
      const spec: CustomBlockSpec = {
        name,
        library: libInput.value.trim() || 'Custom',
        standard: stdInput.value.trim() || 'Custom',
        group: grpInput.value.trim() || 'General',
        tagPrefix: tagInput.value.trim() || 'X',
        portPreset: portSelect.value as CustomBlockSpec['portPreset'],
        attributes: extraAttrs,
      };
      let createdBlock: Block | undefined;
      this.transact('Create custom symbol', (d) => {
        createdBlock = createCustomBlock(d, this.selected, spec);
      });
      if (createdBlock) {
        this.currentBlock = createdBlock.id;
        this.libraryFilter = createdBlock.library ?? '';
        this.standardFilter = createdBlock.standard ?? '';
        this.groupFilter = '';
        this.say(`Custom symbol "${createdBlock.name}" added to ${createdBlock.category}.`, true);
        finish();
        this.setTool('I');
      }
    });

    const manageBox = element(dialog, 'section', 'cad-manager-section');
    element(manageBox, 'h4', '', 'Manage & Delete Libraries or Symbols');
    const customBlocks = this.drawing.blocks;
    const blockPicker = choice(
      manageBox,
      customBlocks.map((b) => [
        b.id,
        `[${b.library ?? 'User'} / ${b.standard ?? 'Standard'}] ${englishBuiltinLabel(b.name)}`,
      ]),
      this.currentBlock || customBlocks[0]?.id || '',
      () => {},
    );
    blockPicker.setAttribute('aria-label', 'Select symbol to manage');

    const manageActions = element(manageBox, 'div', 'cad-actions');
    button(manageActions, 'Delete Selected Symbol', () => {
      const targetId = blockPicker.value;
      if (!targetId) return;
      let res = { removed: 0, inUse: 0 };
      this.transact('Delete symbol', (d) => {
        res = deleteFromLibrary(d, { blockId: targetId });
      });
      if (res.inUse)
        this.say('Cannot delete symbol: placed instances exist in the current drawing.', true);
      else if (res.removed) {
        this.say('Symbol removed from library.', true);
        finish();
        this.openLibraryManager();
      }
    });
    button(manageActions, 'Import External DXF Library', () => {
      finish();
      this.run(async () => {
        const imported = await this.host.importLibrary();
        if (!imported || this.disposed) return;
        let n = 0;
        this.transact('Import library', (d) => {
          n = mergeLibrary(d, imported);
        });
        this.say(`${n} blocks added to the library.`, true);
      });
    });
    button(manageActions, 'Export / Save Library JSON', () => {
      finish();
      this.run(() => this.host.saveLibrary(this.drawing));
    });
  }

  private drawingContentBounds(d: Drawing): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    const contentEntities = d.entities.filter(
      (e) => e.layer !== 'TITLE_BLOCK' && !e.id.startsWith('sheet-frame-'),
    );
    if (!contentEntities.length) return { minX: -50, minY: -35, maxX: 50, maxY: 35 };
    return drawingBounds({ ...d, entities: contentEntities });
  }

  private renderSheetAndBom(pane: HTMLElement): void {
    element(pane, 'h3', '', 'Sheet, Title Block & BOM');
    const setup = ensureSheetSetup(this.drawing, this.host.documentName);

    const sheetSection = (title: string): HTMLElement => {
      const det = element(pane, 'details', 'cad-prop-section');
      const key = `sheet:${title}`;
      det.open = this.openPropSections.has(key);
      const sum = element(det, 'summary', '', title);
      sum.addEventListener('click', (ev) => {
        ev.preventDefault();
        det.open = !det.open;
        if (det.open) this.openPropSections.add(key);
        else this.openPropSections.delete(key);
      });
      return element(det, 'div', 'cad-prop-body');
    };

    const layoutBody = sheetSection('Sheet Format, Scale & Mode');
    element(layoutBody, 'label', 'cad-field', 'Title Block Mode (Cartiglio)');
    const modeSelect = choice(
      layoutBody,
      [
        ['virtual', 'Virtual (YAML & Metadata HUD)'],
        ['real', 'Real / Print Standard Border'],
        ['none', 'Off (Hidden)'],
      ],
      setup.titleBlockMode ?? (setup.enabled ? 'real' : 'virtual'),
      (v) => {
        const nextMode = v as TitleBlockMode;
        this.transact('Title block mode', (d) => {
          const sh = ensureSheetSetup(d, this.host.documentName);
          sh.titleBlockMode = nextMode;
          sh.enabled = nextMode === 'real';
        });
        if (nextMode === 'real') this.fit();
      },
    );
    modeSelect.disabled = this.readOnly;
    modeSelect.setAttribute('aria-label', 'Title block mode');

    element(layoutBody, 'label', 'cad-field', 'Standard Title Block Format');
    const stdSelect = choice(
      layoutBody,
      [
        ['ISO-7200', 'ISO 7200 / ISO 5457 (Full)'],
        ['ANSI-Y14', 'ANSI Y14.1 (North American)'],
        ['MINIMAL', 'Minimal Engineering Strip'],
      ],
      setup.titleBlockStandard ?? 'ISO-7200',
      (v) => {
        this.transact('Title block standard', (d) => {
          ensureSheetSetup(d, this.host.documentName).titleBlockStandard = v as TitleBlockStandard;
        });
      },
    );
    stdSelect.disabled = this.readOnly;
    stdSelect.setAttribute('aria-label', 'Title block standard');

    element(layoutBody, 'label', 'cad-field', 'Sheet format (ISO / ANSI)');
    const sizeSelect = choice(
      layoutBody,
      Object.entries(SHEET_DIMENSIONS_MM).map(([k, v]) => [k, v.label]),
      setup.size,
      (v) => {
        this.transact('Sheet format', (d) => {
          ensureSheetSetup(d, this.host.documentName).size = v as SheetSize;
        });
        this.fit();
      },
    );
    sizeSelect.disabled = this.readOnly;
    sizeSelect.setAttribute('aria-label', 'Sheet format');

    element(layoutBody, 'label', 'cad-field', 'Orientation');
    const orientSelect = choice(
      layoutBody,
      [
        ['landscape', 'Landscape (Horizontal)'],
        ['portrait', 'Portrait (Vertical)'],
      ],
      setup.orientation,
      (v) => {
        this.transact('Sheet orientation', (d) => {
          ensureSheetSetup(d, this.host.documentName).orientation = v as SheetOrientation;
        });
        this.fit();
      },
    );
    orientSelect.disabled = this.readOnly;
    orientSelect.setAttribute('aria-label', 'Sheet orientation');

    const marginLbl = element(
      layoutBody,
      'label',
      'cad-field',
      'Symmetric margins (mm, all 4 sides)',
    );
    const marginInp = element(marginLbl, 'input');
    marginInp.type = 'number';
    marginInp.step = '1';
    marginInp.min = '0';
    marginInp.max = '100';
    marginInp.value = String(setup.marginMm ?? 10);
    marginInp.disabled = this.readOnly;
    marginInp.setAttribute('aria-label', 'Sheet symmetric margins');
    marginInp.addEventListener('change', () => {
      const m = Number(marginInp.value);
      if (Number.isFinite(m) && m >= 0 && m <= 100) {
        this.transact('Sheet margins', (d) => {
          ensureSheetSetup(d, this.host.documentName).marginMm = m;
        });
      } else {
        marginInp.value = String(setup.marginMm ?? 10);
      }
    });

    element(layoutBody, 'label', 'cad-field', 'Drawing scale (mm)');
    const scaleChoices = DRAWING_SCALES.some(([k]) => k === setup.scale)
      ? DRAWING_SCALES
      : [...DRAWING_SCALES, [setup.scale, setup.scale] as [string, string]];
    const scaleSelect = choice(layoutBody, scaleChoices, setup.scale, (v) => {
      this.transact('Drawing scale', (d) => {
        const sh = ensureSheetSetup(d, this.host.documentName);
        if (sh.autoScaleInserts) rescaleDrawingElements(d, v);
        else {
          d.scale = v;
          sh.scale = v;
          sh.titleBlock.scale = v;
        }
      });
    });
    scaleSelect.disabled = this.readOnly;
    scaleSelect.setAttribute('aria-label', 'Sheet scale');

    const autoScaleLabel = element(
      layoutBody,
      'label',
      'cad-checkbox',
      'Auto-scale symbols & text to drawing scale',
    );
    const autoScaleCheck = element(autoScaleLabel, 'input');
    autoScaleCheck.type = 'checkbox';
    autoScaleCheck.checked = !!setup.autoScaleInserts;
    autoScaleCheck.disabled = this.readOnly;
    autoScaleCheck.addEventListener('change', () => {
      this.transact('Auto-scale setting', (d) => {
        ensureSheetSetup(d, this.host.documentName).autoScaleInserts = autoScaleCheck.checked;
      });
    });

    if (!this.readOnly) {
      const sheetActions = element(layoutBody, 'div', 'cad-actions');
      button(sheetActions, 'Fit Sheet Frame to Drawing', () => {
        this.transact('Fit sheet frame to drawing', (d) => {
          const sh = ensureSheetSetup(d, this.host.documentName);
          sh.enabled = true;
          sh.titleBlockMode = 'real';
          fitSheetToDrawing(d, this.drawingContentBounds(d), {
            size: sh.size,
            orientation: sh.orientation,
            marginMm: sh.marginMm ?? 10,
            snapToStandard: true,
          });
        });
        this.fit();
        this.say('Sheet frame & fixed-proportion title block fitted around drawing.', true);
      });
      button(sheetActions, 'Rescale elements', () => {
        this.transact('Rescale elements', (d) => {
          const sh = ensureSheetSetup(d, this.host.documentName);
          rescaleDrawingElements(d, sh.scale);
        });
      });
      button(sheetActions, 'Stamp border to layer', () => {
        this.transact('Stamp title block', (d) => {
          ensureSheetSetup(d, this.host.documentName);
          stampSheetToEntities(d);
        });
        this.say('Sheet border and Title Block stamped onto layer TITLE_BLOCK.', true);
      });
      button(sheetActions, 'Print / Fit Paper…', () => this.openPrintModal());
      button(sheetActions, 'Manage Pages…', () => this.openPagesModal());
      if (this.host.insertPresetYaml) {
        button(sheetActions, 'Insert Optional Title YAML', () => {
          this.host.insertPresetYaml!(this.drawing);
          this.say('Optional CAD metadata added to Markdown YAML frontmatter.', true);
        });
      }
    }

    const metaBody = sheetSection('Title Block Metadata (Cartiglio)');
    const tbFields: [keyof TitleBlockData, string][] = [
      ['project', 'Project / Plant'],
      ['title', 'Drawing Title'],
      ['drawingNumber', 'Drawing Number'],
      ['revision', 'Revision'],
      ['standard', 'Normative Standard'],
      ['author', 'Author / Engineer'],
      ['date', 'Date'],
      ['company', 'Company / Organization'],
      ['sheet', 'Sheet No.'],
      ['notes', 'General Notes'],
    ];
    for (const [key, label] of tbFields) {
      const fieldLabel = element(metaBody, 'label', 'cad-field', label);
      const input = element(fieldLabel, 'input');
      input.type = 'text';
      input.value = setup.titleBlock[key] ?? '';
      input.disabled = this.readOnly;
      input.setAttribute('aria-label', `Title block ${label}`);
      input.addEventListener('change', () => {
        this.transact('Update title block', (d) => {
          ensureSheetSetup(d, this.host.documentName).titleBlock[key] = input.value;
        });
      });
    }

    const bomBody = sheetSection('Bill of Materials (BOM)');
    const inserts = this.drawing.entities.filter((e): e is Insert => e.type === 'insert');
    const bomRows = extractBom(this.drawing);
    element(
      bomBody,
      'p',
      'cad-help',
      `${bomRows.length} components · Click a row to highlight & edit inline`,
    );
    if (inserts.length) {
      const table = element(bomBody, 'div', 'cad-bom-preview');
      const blockMap = new Map(this.drawing.blocks.map((b) => [b.id, b]));
      for (const ins of inserts) {
        const blk = blockMap.get(ins.block);
        const isSel = this.selected.has(ins.id);
        const item = element(table, 'div', `cad-bom-row${isSel ? ' is-selected' : ''}`);
        const headRow = button(
          item,
          `${ins.attributes.TAG || '-'} · ${blk?.name ?? ins.block}`,
          () => {
            this.selected = new Set([ins.id]);
            this.highlightId = ins.id;
            this.updateSelectionBar();
            this.render();
            this.renderSide();
          },
          'Select component on canvas',
        );
        headRow.className = 'cad-bom-head-btn';
        element(item, 'span', 'cad-help', blk?.standard ?? blk?.category ?? 'Custom');

        const fields = element(item, 'div', 'cad-bom-fields');
        for (const [attrKey, placeholder, initialOverride] of [
          ['TAG', 'Tag', ins.attributes.TAG],
          [
            'BRAND',
            'Brand',
            ins.attributes.BRAND ?? ins.attributes.MARCA ?? ins.attributes.MANUFACTURER,
          ],
          ['MODEL', 'Model', ins.attributes.MODEL ?? ins.attributes.MODELLO],
          ['VALORE', 'Value', ins.attributes.VALORE ?? ins.attributes.VALUE],
          ['DESCRIZIONE', 'Description', ins.attributes.DESCRIZIONE ?? ins.attributes.DESCRIPTION],
          ['NOTES', 'Notes', ins.attributes.NOTES ?? ins.attributes.NOTE],
        ] as const) {
          const inp = element(fields, 'input');
          inp.type = 'text';
          inp.placeholder = placeholder;
          inp.value = initialOverride ?? '';
          inp.disabled = this.readOnly || !isEditable(this.drawing, ins);
          inp.setAttribute('aria-label', `Inspector BOM ${ins.id} ${attrKey}`);
          inp.addEventListener('click', (ev) => ev.stopPropagation());
          inp.addEventListener('change', () => {
            this.transact(`Edit BOM ${attrKey}`, (d) => {
              const target = d.entities.find((x) => x.id === ins.id);
              if (target?.type === 'insert' && isEditable(d, target)) {
                target.attributes[attrKey] = inp.value;
              }
            });
          });
        }
      }
    }
  }

  private renderLayers(pane: HTMLElement): void {
    element(pane, 'h3', '', 'Layers');
    if (!this.readOnly)
      button(pane, '+ New layer', () =>
        this.run(async () => {
          const v = await this.form('New layer', [
            { key: 'name', label: 'Name', value: 'New layer' },
          ]);
          if (!v || this.disposed) return;
          const name = v.name.trim();
          if (!name || this.drawing.layers.some((l) => l.name === name))
            throw new Error('Layer name is empty or already exists');
          const id = uid();
          this.currentLayer = id;
          this.transact('Create layer', (d) =>
            d.layers.push({
              id,
              name,
              visible: true,
              locked: false,
              color: 7,
              lineType: 'CONTINUOUS',
            }),
          );
        }),
      );
    for (const l of this.drawing.layers) {
      const card = element(pane, 'details', 'cad-layer cad-layer-card');
      card.open = this.openLayers.has(l.id);
      const summary = element(card, 'summary', 'cad-layer-head');
      summary.addEventListener('click', (ev) => {
        if ((ev.target as HTMLElement).closest('button')) return;
        ev.preventDefault();
        card.open = !card.open;
        if (card.open) this.openLayers.add(l.id);
        else this.openLayers.delete(l.id);
      });

      const current = button(
        summary,
        '',
        () => {
          this.currentLayer = l.id;
          this.renderSide();
        },
        'Set current layer',
      );
      setToolIcon(current, l.id === this.currentLayer ? 'LAYER_ACTIVE' : 'LAYER_IDLE');
      current.setAttribute('aria-label', 'Set current layer');
      current.disabled = this.readOnly;
      current.addEventListener('click', (ev) => ev.stopPropagation());

      const colorSwatch = element(summary, 'span', 'cad-color-dot');
      colorSwatch.style.backgroundColor = aciColor(l.color, '#eeeeee');
      element(
        summary,
        'strong',
        'cad-layer-name',
        `${l.name}${l.locked ? ' [Locked]' : ''}${!l.visible ? ' [Hidden]' : ''}`,
      );

      const quick = element(summary, 'div', 'cad-layer-quick');
      const visBtn = button(
        quick,
        '',
        () =>
          this.transact(
            'Layer state',
            (d) => (d.layers.find((x) => x.id === l.id)!.visible = !l.visible),
          ),
        'Toggle layer visibility',
      );
      setToolIcon(visBtn, l.visible ? 'EYE' : 'EYE_OFF');
      visBtn.setAttribute('aria-label', 'Toggle layer visibility');
      visBtn.setAttribute('aria-pressed', String(l.visible));
      visBtn.disabled = this.readOnly;
      visBtn.addEventListener('click', (ev) => ev.stopPropagation());

      const lockBtn = button(
        quick,
        '',
        () =>
          this.transact(
            'Layer state',
            (d) => (d.layers.find((x) => x.id === l.id)!.locked = !l.locked),
          ),
        'Toggle layer lock',
      );
      setToolIcon(lockBtn, l.locked ? 'LOCK' : 'UNLOCK');
      lockBtn.setAttribute('aria-label', 'Toggle layer lock');
      lockBtn.setAttribute('aria-pressed', String(l.locked));
      lockBtn.disabled = this.readOnly;
      lockBtn.addEventListener('click', (ev) => ev.stopPropagation());

      const body = element(card, 'div', 'cad-prop-body');
      const nameLbl = element(body, 'label', 'cad-field', 'Layer name');
      const name = element(nameLbl, 'input');
      name.value = l.name;
      name.setAttribute('aria-label', 'Layer name');
      name.disabled = this.readOnly || l.id === '0';
      name.addEventListener('change', () => {
        const value = name.value.trim();
        if (!value || this.drawing.layers.some((x) => x.id !== l.id && x.name === value)) {
          name.value = l.name;
          this.say('Invalid or duplicate layer name.', true);
          return;
        }
        this.transact('Rename layer', (d) => (d.layers.find((x) => x.id === l.id)!.name = value));
      });

      const controls = element(body, 'div', 'cad-actions');
      for (const [key, label] of [
        ['visible', 'Visible'],
        ['locked', 'Locked'],
      ] as const) {
        const labelEl = element(controls, 'label', 'cad-checkbox', label);
        const input = element(labelEl, 'input');
        input.type = 'checkbox';
        input.checked = l[key];
        input.disabled = this.readOnly;
        input.addEventListener('change', () =>
          this.transact(
            'Layer state',
            (d) => (d.layers.find((x) => x.id === l.id)![key] = input.checked),
          ),
        );
      }

      const colorPreset = choice(
        body,
        [
          ...ACI_PRESETS,
          ...(!ACI_PRESETS.some(([id]) => Number(id) === l.color)
            ? [[String(l.color), `ACI ${l.color}`] as [string, string]]
            : []),
        ],
        String(l.color),
        (v) =>
          this.transact(
            'Layer color',
            (d) => (d.layers.find((x) => x.id === l.id)!.color = Number(v)),
          ),
      );
      colorPreset.disabled = this.readOnly;
      colorPreset.setAttribute('aria-label', 'Layer color');

      const aciLbl = element(body, 'label', 'cad-field', 'ACI color (1–255)');
      const color = element(aciLbl, 'input');
      color.type = 'number';
      color.min = '1';
      color.max = '255';
      color.value = String(l.color);
      color.title = 'ACI color (1–255)';
      color.setAttribute('aria-label', 'ACI color');
      color.disabled = this.readOnly;
      color.addEventListener('change', () => {
        const n = Number(color.value);
        if (Number.isInteger(n) && n >= 1 && n <= 255)
          this.transact('Layer color', (d) => (d.layers.find((x) => x.id === l.id)!.color = n));
        else color.value = String(l.color);
      });

      const ltCtrl = this.createLinetypeControl(body, {
        ariaLabel: 'Linetype',
        includeByLayer: false,
        value: l.lineType,
        pattern: l.linePattern,
        disabled: this.readOnly,
        onChange: (v, pat) =>
          this.transact('Linetype', (d) => {
            const target = d.layers.find((x) => x.id === l.id);
            if (!target) return;
            target.lineType = v as Layer['lineType'];
            if (pat?.length) target.linePattern = [...pat];
            else delete target.linePattern;
          }),
      });
      void ltCtrl;

      if (!this.readOnly && l.id !== '0') {
        const otherLayers = this.drawing.layers.filter((x) => x.id !== l.id);
        if (otherLayers.length) {
          const mergeRow = element(body, 'div', 'cad-actions');
          const mergeSel = choice(
            mergeRow,
            otherLayers.map((x) => [x.id, `Merge into: ${x.name}`]),
            otherLayers[0].id,
            () => {},
          );
          mergeSel.setAttribute('aria-label', `Merge layer ${l.name} target`);
          const mergeBtn = button(
            mergeRow,
            'Merge',
            () => {
              const targetId = mergeSel.value;
              if (!targetId) return;
              if (this.currentLayer === l.id) this.currentLayer = targetId;
              this.openLayers.delete(l.id);
              this.transact('Merge layers', (d) => {
                mergeLayers(d, l.id, targetId);
              });
              this.say(`Merged layer "${l.name}" cleanly.`, true);
            },
            'Merge layer into target layer',
          );
          setToolIcon(mergeBtn, 'MERGE', 'Merge');
        }
        button(body, 'Delete → layer 0', () => {
          this.openLayers.delete(l.id);
          this.transact('Delete layer', (d) => {
            d.entities.forEach((e) => {
              if (e.layer === l.id) e.layer = '0';
            });
            d.blocks.forEach((b) =>
              b.entities.forEach((e) => {
                if (e.layer === l.id) e.layer = '0';
              }),
            );
            d.layers = d.layers.filter((x) => x.id !== l.id);
          });
        });
      }
    }
  }

  private renderProperties(pane: HTMLElement): void {
    element(pane, 'h3', '', `${this.selected.size} objects selected`);
    const entities = this.drawing.entities.filter((e) => this.selected.has(e.id));
    if (!entities.length) {
      element(
        pane,
        'p',
        'cad-help',
        'Click or drag to select. Drag grips directly on selected entities to stretch, move, rotate, or resize.',
      );
      if (!this.readOnly) {
        element(pane, 'label', '', 'Current layer');
        choice(
          pane,
          this.drawing.layers.map((l) => [l.id, l.name]),
          this.currentLayer,
          (v) => (this.currentLayer = v),
        );
      }
      return;
    }

    const propSection = (parent: HTMLElement, title: string, _defaultOpen = false): HTMLElement => {
      const det = element(parent, 'details', 'cad-prop-section');
      det.open = this.openPropSections.has(title);
      const sum = element(det, 'summary', '', title);
      sum.addEventListener('click', (ev) => {
        ev.preventDefault();
        det.open = !det.open;
        if (det.open) this.openPropSections.add(title);
        else this.openPropSections.delete(title);
      });
      return element(det, 'div', 'cad-prop-body');
    };

    const styleBody = propSection(pane, 'Appearance & Actions', true);
    const layer = choice(
      styleBody,
      this.drawing.layers.map((l) => [l.id, l.name]),
      entities[0].layer,
      (v) =>
        this.transact('Assign layer', (d) => {
          const target = d.layers.find((l) => l.id === v);
          if (!target || target.locked || !target.visible)
            throw new Error('Target layer is locked or hidden');
          d.entities.forEach((e) => {
            if (this.selected.has(e.id) && isEditable(d, e)) e.layer = v;
          });
        }),
    );
    layer.disabled = this.readOnly;
    layer.setAttribute('aria-label', 'Selection layer');

    const colorWrap = element(styleBody, 'div', 'cad-color-wrap');
    const selDot = element(colorWrap, 'span', 'cad-color-dot');
    const selLayer = this.drawing.layers.find((l) => l.id === entities[0].layer);
    selDot.style.backgroundColor = aciColor(entities[0].color ?? selLayer?.color ?? 7, '#e1e5eb');
    const selColor = choice(
      colorWrap,
      [
        ['BYLAYER', 'Color: by layer'],
        ...ACI_PRESETS,
        ...(entities[0].color !== undefined &&
        !ACI_PRESETS.some(([id]) => Number(id) === entities[0].color)
          ? [[String(entities[0].color), `ACI ${entities[0].color}`] as [string, string]]
          : []),
      ],
      entities[0].color !== undefined ? String(entities[0].color) : 'BYLAYER',
      (v) =>
        this.transact('Selection color', (d) => {
          for (const e of d.entities)
            if (this.selected.has(e.id) && isEditable(d, e)) {
              if (v === 'BYLAYER') delete e.color;
              else e.color = Number(v);
            }
        }),
    );
    selColor.disabled = this.readOnly;
    selColor.setAttribute('aria-label', 'Selection color');

    const lineTypeCtrl = this.createLinetypeControl(styleBody, {
      ariaLabel: 'Selection linetype',
      includeByLayer: true,
      value: entities[0].lineType ?? 'BYLAYER',
      pattern: entities[0].linePattern,
      disabled: this.readOnly,
      onChange: (v, pat) =>
        this.transact('Selection linetype', (d) => {
          for (const e of d.entities)
            if (this.selected.has(e.id) && isEditable(d, e)) {
              if (v === 'BYLAYER') {
                delete e.lineType;
                delete e.linePattern;
              } else {
                e.lineType = v as LineType;
                if (pat?.length) e.linePattern = [...pat];
                else delete e.linePattern;
              }
            }
        }),
    });
    void lineTypeCtrl;
    if (!this.readOnly) {
      const actions = element(styleBody, 'div', 'cad-action-grid');
      for (const t of ['M', 'CO', 'RO', 'MI', 'SC', 'E'] as Tool[]) {
        const title = tools.find(([id]) => id === t)![1];
        const b = button(actions, '', () => this.setTool(t), title);
        setToolIcon(b, t);
      }
      const ah = button(
        actions,
        '',
        () => this.alignSelection('center-x'),
        'Align horizontal centers',
      );
      setToolIcon(ah, 'ALIGN_H');
      const av = button(
        actions,
        '',
        () => this.alignSelection('center-y'),
        'Align vertical centers',
      );
      setToolIcon(av, 'ALIGN_V');
      const grp = button(actions, '', () => this.groupSelection(), 'Group selection (G)');
      setToolIcon(grp, 'GROUP');
      const ungrp = button(actions, '', () => this.ungroupSelection(), 'Ungroup selection (UG)');
      setToolIcon(ungrp, 'UNGROUP');
      button(styleBody, 'Save Selection as Custom Symbol…', () => this.openLibraryManager());
    }
    if (entities.length !== 1) return;
    const e = entities[0];
    element(pane, 'p', 'cad-help', `Type: ${e.type} · coordinates in mm`);
    const editable = !this.readOnly && isEditable(this.drawing, e);
    const makeField = (
      target: HTMLElement,
      label: string,
      value: string,
      change: (v: string, draft: Entity) => void,
      numeric = false,
      liveDraftUpdate?: (v: string, draft: Entity) => void,
    ): HTMLInputElement => {
      const l = element(target, 'label', 'cad-field', label),
        input = element(l, 'input');
      input.type = numeric ? 'number' : 'text';
      input.step = 'any';
      input.value = value;
      input.disabled = !editable;
      if (liveDraftUpdate) {
        input.addEventListener('input', () => {
          const draft = this.drawing.entities.find((x) => x.id === e.id);
          if (draft && isEditable(this.drawing, draft)) {
            liveDraftUpdate(input.value, draft);
            this.render();
          }
        });
      }
      input.addEventListener('change', () => {
        if (numeric && !Number.isFinite(Number(input.value))) {
          input.value = value;
          return;
        }
        this.transact('Properties', (d) => {
          const draft = d.entities.find((x) => x.id === e.id)!;
          if (isEditable(d, draft)) change(input.value, draft);
        });
      });
      return input;
    };
    const pointField = (
      target: HTMLElement,
      key: 'a' | 'b' | 'position' | 'center',
      p: Point,
    ): void => {
      for (const axis of ['x', 'y'] as const)
        makeField(
          target,
          `${key}.${axis}`,
          String(p[axis]),
          (v, draft) => {
            if (key in draft) (draft as unknown as Record<string, Point>)[key][axis] = Number(v);
          },
          true,
        );
    };

    if (e.type === 'line' || e.type === 'polyline' || e.type === 'wire') {
      const notesBody = propSection(pane, 'Line Discipline, Tag & Notes', true);
      const discVal = e.discipline ?? 'general';
      const discSel = choice(
        notesBody,
        [
          ['general', 'Discipline: General Line'],
          ['piping', 'Discipline: Piping (P&ID)'],
          ['single-line', 'Discipline: Single-Line (Electrical)'],
        ],
        discVal,
        (v) =>
          this.transact('Line discipline', (d) => {
            const draft = d.entities.find((x) => x.id === e.id);
            if (
              draft &&
              (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire')
            ) {
              if (v === 'general') delete draft.discipline;
              else draft.discipline = v as LineDiscipline;
            }
          }),
      );
      discSel.disabled = !editable;
      discSel.setAttribute('aria-label', 'Line discipline');

      if (discVal !== 'general') {
        const presets = discVal === 'piping' ? PIPING_LINE_PRESETS : SINGLE_LINE_PRESETS;
        const presetSel = choice(
          notesBody,
          [
            ['', 'Apply preset specification…'],
            ...presets.map((pr) => [pr.id, pr.label] as [string, string]),
          ],
          '',
          (pid) => {
            const pr = presets.find((x) => x.id === pid);
            if (!pr) return;
            this.transact('Apply line preset', (d) => {
              const draft = d.entities.find((x) => x.id === e.id);
              if (
                draft &&
                (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire')
              ) {
                draft.discipline = pr.discipline;
                draft.lineType = pr.lineType;
                if (pr.pattern?.length) draft.linePattern = [...pr.pattern];
                else delete draft.linePattern;
                if (!draft.serviceTag) draft.serviceTag = pr.defaultTagPrefix;
                draft.pipeSpec = pr.defaultSpec;
              }
            });
          },
        );
        presetSel.disabled = !editable;
        presetSel.setAttribute('aria-label', 'Discipline line preset');
      }

      makeField(
        notesBody,
        discVal === 'single-line' ? 'Circuit ID' : 'Line Tag / Service',
        e.serviceTag ?? '',
        (v, draft) => {
          if (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire') {
            if (v.trim()) draft.serviceTag = v.trim();
            else delete draft.serviceTag;
          }
        },
      );
      makeField(
        notesBody,
        discVal === 'single-line' ? 'Cable / Voltage' : 'DN / Pipe Spec',
        e.pipeSpec ?? '',
        (v, draft) => {
          if (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire') {
            if (v.trim()) draft.pipeSpec = v.trim();
            else delete draft.pipeSpec;
          }
        },
      );
      makeField(
        notesBody,
        'Line Notes (Fluid / Process / Remark)',
        e.lineNotes ?? '',
        (v, draft) => {
          if (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire') {
            if (v.trim()) draft.lineNotes = v.trim();
            else delete draft.lineNotes;
          }
        },
      );

      const arrowBody = propSection(pane, 'Arrows & Cross-Over Bridges', true);
      const curArrows = e.arrows;
      const updateArrows = (next?: LineArrows): void => {
        this.transact('Line arrows', (d) => {
          const draft = d.entities.find((x) => x.id === e.id);
          if (
            draft &&
            (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire')
          ) {
            if (next) draft.arrows = clone(next);
            else delete draft.arrows;
          }
        });
      };

      const styleSel = choice(
        arrowBody,
        [
          ['none', 'Arrows: None'],
          ['closed', 'Closed filled'],
          ['open', 'Open chevron'],
          ['stealth', 'Stealth barb'],
          ['triangle', 'Hollow triangle'],
          ['dot', 'Dot marker'],
          ['slash', 'Architectural slash'],
        ],
        curArrows?.style ?? 'none',
        (v) => {
          if (v === 'none') {
            updateArrows(undefined);
            return;
          }
          const base: LineArrows = curArrows
            ? { ...curArrows, style: v as ArrowStyle }
            : { style: v as ArrowStyle, placement: 'end', size: 3.5, segments: 3, reversed: false };
          updateArrows(base);
        },
      );
      styleSel.disabled = !editable;
      styleSel.setAttribute('aria-label', 'Line arrow style');

      if (curArrows) {
        const placeSel = choice(
          arrowBody,
          [
            ['end', 'At end'],
            ['start', 'At start'],
            ['both', 'Both ends (Start & End)'],
            ['middle', 'In middle (L/2)'],
            ['every_n', 'Every L / N points'],
          ],
          curArrows.placement,
          (v) => updateArrows({ ...curArrows, placement: v as ArrowPlacement }),
        );
        placeSel.disabled = !editable;
        placeSel.setAttribute('aria-label', 'Arrow placement');

        if (curArrows.placement === 'every_n') {
          const nInp = makeField(
            arrowBody,
            'Subdivisions N (arrows at L/N)',
            String(curArrows.segments ?? 3),
            (v) => {
              const raw = Math.round(Number(v));
              if (Number.isFinite(raw) && raw >= 1) {
                updateArrows({ ...curArrows, segments: Math.min(100, raw) });
              }
            },
            true,
            (v, draft) => {
              const raw = Math.round(Number(v));
              if (
                Number.isFinite(raw) &&
                raw >= 1 &&
                (draft.type === 'line' || draft.type === 'polyline' || draft.type === 'wire') &&
                draft.arrows
              ) {
                draft.arrows.segments = Math.min(100, raw);
              }
            },
          );
          nInp.min = '1';
          nInp.max = '100';
          nInp.step = '1';
        }

        makeField(
          arrowBody,
          'Arrow size (mm)',
          String(curArrows.size ?? 3.5),
          (v) => {
            const sz = Number(v);
            if (Number.isFinite(sz) && sz > 0.4) updateArrows({ ...curArrows, size: sz });
          },
          true,
        );

        const revBtn = button(
          arrowBody,
          '',
          () => updateArrows({ ...curArrows, reversed: !curArrows.reversed }),
          curArrows.reversed ? 'Direction: Reversed' : 'Reverse Arrow Direction',
        );
        setToolIcon(
          revBtn,
          'REVERSE',
          curArrows.reversed ? 'Direction: Reversed' : 'Reverse Arrow Direction',
        );
        revBtn.disabled = !editable;
        revBtn.setAttribute('aria-pressed', String(!!curArrows.reversed));
      }

      const jumpLbl = element(arrowBody, 'label', 'cad-field', 'Intersection bridge jump');
      const jumpSel = choice(
        jumpLbl,
        [
          ['auto', 'Auto (Follow Project Default)'],
          ['always', 'Always create bridge jump'],
          ['never', 'Never create bridge jump'],
        ],
        e.lineJump ?? 'auto',
        (v) =>
          this.transact('Line jump mode', (d) => {
            const draft = d.entities.find((x) => x.id === e.id);
            if (draft) {
              if (v === 'auto') delete draft.lineJump;
              else draft.lineJump = v as 'always' | 'never';
            }
          }),
      );
      jumpSel.disabled = !editable;
      jumpSel.setAttribute('aria-label', 'Intersection bridge jump mode');

      const entityCrossings = findAllLineCrossings(this.drawing).filter(
        (c) => c.winnerId === e.id || c.loserId === e.id,
      );
      if (entityCrossings.length && editable) {
        element(
          arrowBody,
          'small',
          'cad-help',
          `${entityCrossings.length} intersection(s) detected:`,
        );
        entityCrossings.forEach((c, idx) => {
          const row = element(arrowBody, 'div', 'cad-actions');
          element(
            row,
            'small',
            '',
            `#${idx + 1} (${c.point.x.toFixed(1)}, ${c.point.y.toFixed(1)})`,
          );
          const togBtn = button(row, c.active ? 'Bridge: ON' : 'Bridge: OFF', () => {
            this.transact('Set intersection bridge', (d) => {
              setLineCrossingJump(d, c.key, { active: !c.active });
            });
          });
          togBtn.setAttribute('aria-pressed', String(c.active));
          const axisBtn = button(row, c.axis === 'horizontal' ? '↔ Horiz' : '↕ Vert', () => {
            this.transact('Set intersection bridge axis', (d) => {
              setLineCrossingJump(d, c.key, {
                active: true,
                axis: c.axis === 'horizontal' ? 'vertical' : 'horizontal',
              });
            });
          });
          axisBtn.title = 'Switch Horizontal vs Vertical bridge direction';
        });
      }

      if (e.type === 'wire') {
        const wireBody = propSection(pane, 'Wire Ports', true);
        element(
          wireBody,
          'p',
          'cad-help',
          `Ports: ${e.from?.portId ?? 'free'} → ${e.to?.portId ?? 'free'}`,
        );
        if (editable)
          button(wireBody, 'Detach ports', () =>
            this.transact('Detach', (d) => {
              const wire = d.entities.find((x) => x.id === e.id);
              if (wire?.type === 'wire') {
                delete wire.from;
                delete wire.to;
              }
            }),
          );
      }

      const geomBody = propSection(pane, 'Coordinates & Geometry', false);
      if (e.type === 'line') {
        pointField(geomBody, 'a', e.a);
        pointField(geomBody, 'b', e.b);
        element(geomBody, 'p', 'cad-help', `Length: ${distance(e.a, e.b).toFixed(2)} mm`);
      } else {
        element(geomBody, 'p', 'cad-help', `${e.points.length} vertices · coordinates in mm`);
      }
    }

    if (e.type === 'dimension') {
      const dimBody = propSection(pane, 'Dimension Properties', true);
      element(dimBody, 'p', 'cad-help', `Measured: ${dimensionLabel(e)}`);
      const kindSelect = choice(
        dimBody,
        [
          ['aligned', 'Aligned dimension'],
          ['horizontal', 'Horizontal dimension'],
          ['vertical', 'Vertical dimension'],
          ['diameter', 'Diameter (Ø)'],
          ['radius', 'Radius (R)'],
        ],
        e.kind ?? 'aligned',
        (v) =>
          this.transact('Dimension kind', (d) => {
            const draft = d.entities.find((x) => x.id === e.id);
            if (draft?.type === 'dimension') draft.kind = v as DimensionKind;
          }),
      );
      kindSelect.disabled = !editable;
      makeField(
        dimBody,
        'Dimension offset (mm)',
        String(e.offset ?? 8),
        (v, draft) => {
          if (draft.type === 'dimension') draft.offset = Number(v);
        },
        true,
      );
      makeField(dimBody, 'Label override (empty = auto mm)', e.text ?? '', (v, draft) => {
        if (draft.type === 'dimension') {
          if (v.trim()) draft.text = v.trim();
          else delete draft.text;
        }
      });
      const coordBody = propSection(pane, 'Coordinates (X / Y)', false);
      pointField(coordBody, 'a', e.a);
      pointField(coordBody, 'b', e.b);
    }

    if (e.type === 'circle' || e.type === 'arc') {
      const geoBody = propSection(pane, 'Circle / Arc Geometry', true);
      makeField(
        geoBody,
        'Radius',
        String(e.radius),
        (v, draft) => {
          if ((draft.type === 'circle' || draft.type === 'arc') && Number(v) > 0)
            draft.radius = Number(v);
        },
        true,
      );
      if (e.type === 'arc') {
        for (const key of ['start', 'end'] as const)
          makeField(
            geoBody,
            key === 'start' ? 'Start angle' : 'End angle',
            String(e[key]),
            (v, draft) => {
              if (draft.type === 'arc') draft[key] = Number(v);
            },
            true,
          );
      }
      const centerBody = propSection(pane, 'Center Coordinates (X / Y)', false);
      pointField(centerBody, 'center', e.center);
    }

    if (e.type === 'insert') {
      const attrBody = propSection(pane, 'Symbol Attributes & TAG', true);
      const keys = [...new Set([...Object.keys(e.attributes), 'NOTES'])];
      for (const key of keys)
        makeField(
          attrBody,
          key === 'VALORE'
            ? 'Value'
            : key === 'DESCRIZIONE'
              ? 'Description'
              : key === 'NOTES'
                ? 'BOM Notes'
                : key,
          e.attributes[key] ?? '',
          (v, draft) => {
            if (draft.type === 'insert') draft.attributes[key] = v;
          },
        );
      if (editable)
        button(attrBody, '+ Attribute', () =>
          this.run(async () => {
            const v = await this.form('Attribute', [
              { key: 'key', label: 'Attribute name', value: 'DESCRIPTION' },
              { key: 'value', label: 'Value', value: '' },
            ]);
            if (!v || this.disposed) return;
            const key = v.key.trim().toUpperCase();
            if (!/^[A-Z][A-Z0-9_-]*$/.test(key)) throw new Error('Invalid attribute name');
            this.transact('Add attribute', (d) => {
              const item = d.entities.find((x) => x.id === e.id);
              if (item?.type === 'insert' && isEditable(d, item)) item.attributes[key] = v.value;
            });
          }),
        );

      const labelBody = propSection(pane, 'Label & Text Options', false);
      const ls = e.labelStyle ?? {};
      const ps = this.drawing.projectSettings;
      element(labelBody, 'label', 'cad-field', 'Label placement');
      const anchorSelect = choice(
        labelBody,
        [
          ['default', 'Default (Right / Top)'],
          ['center', 'Center'],
          ['top', 'Top side'],
          ['bottom', 'Bottom side'],
          ['left', 'Left side'],
          ['right', 'Right side'],
          ['top-left', 'Top-Left corner'],
          ['top-right', 'Top-Right corner'],
          ['bottom-left', 'Bottom-Left corner'],
          ['bottom-right', 'Bottom-Right corner'],
        ],
        ls.anchor ?? ps?.defaultLabelAnchor ?? 'default',
        (v) =>
          this.transact('Label placement', (d) => {
            const item = d.entities.find((x) => x.id === e.id);
            if (item?.type === 'insert' && isEditable(d, item)) {
              item.labelStyle = { ...(item.labelStyle ?? {}), anchor: v as LabelAnchor };
            }
          }),
      );
      anchorSelect.disabled = !editable;
      anchorSelect.setAttribute('aria-label', 'Label placement');

      makeField(
        labelBody,
        'Text height (mm)',
        String(ls.textHeight ?? ps?.defaultTextHeight ?? 3),
        (v, draft) => {
          const h = Number(v);
          if (draft.type === 'insert' && h > 0) {
            draft.labelStyle = { ...(draft.labelStyle ?? {}), textHeight: h };
          }
        },
        true,
      );

      element(labelBody, 'label', 'cad-field', 'Text orientation');
      const orientVal =
        ls.rotateWithBlock !== undefined
          ? ls.rotateWithBlock
            ? 'follow'
            : ls.textRotation === 90
              ? 'vertical'
              : 'horizontal'
          : ls.textRotation === 90
            ? 'vertical'
            : (ps?.defaultLabelOrientation ?? 'horizontal');
      const orientSelect = choice(
        labelBody,
        [
          ['horizontal', 'Horizontal (0°)'],
          ['vertical', 'Vertical (90°)'],
          ['follow', 'Follow block rotation'],
        ],
        orientVal,
        (v) =>
          this.transact('Label orientation', (d) => {
            const item = d.entities.find((x) => x.id === e.id);
            if (item?.type === 'insert' && isEditable(d, item)) {
              const cur = { ...(item.labelStyle ?? {}) };
              if (v === 'follow') {
                cur.rotateWithBlock = true;
                delete cur.textRotation;
              } else if (v === 'vertical') {
                cur.rotateWithBlock = false;
                cur.textRotation = 90;
              } else {
                cur.rotateWithBlock = false;
                cur.textRotation = 0;
              }
              item.labelStyle = cur;
            }
          }),
      );
      orientSelect.disabled = !editable;
      orientSelect.setAttribute('aria-label', 'Label orientation');

      const scaleTextLbl = element(
        labelBody,
        'label',
        'cad-checkbox',
        'Scale label text when scaling object',
      );
      const scaleTextChk = element(scaleTextLbl, 'input');
      scaleTextChk.type = 'checkbox';
      scaleTextChk.checked = ls.scaleWithBlock ?? !!ps?.defaultLabelScaleWithBlock;
      scaleTextChk.disabled = !editable;
      scaleTextChk.addEventListener('change', () => {
        this.transact('Scale label with object', (d) => {
          const item = d.entities.find((x) => x.id === e.id);
          if (item?.type === 'insert' && isEditable(d, item)) {
            item.labelStyle = {
              ...(item.labelStyle ?? {}),
              scaleWithBlock: scaleTextChk.checked,
            };
          }
        });
      });

      if (editable) {
        const moveLbl = element(
          labelBody,
          'label',
          'cad-checkbox',
          'Interactive label position (drag label grip on canvas)',
        );
        const moveChk = element(moveLbl, 'input');
        moveChk.type = 'checkbox';
        moveChk.checked = this.interactiveLabelPos;
        moveChk.setAttribute('aria-label', 'Interactive label position');
        moveChk.addEventListener('change', () => {
          this.interactiveLabelPos = moveChk.checked;
          this.render();
        });
        if (ls.textOffset) {
          button(labelBody, 'Reset label position', () => {
            this.transact('Reset label position', (d) => {
              const item = d.entities.find((x) => x.id === e.id);
              if (item?.type === 'insert' && isEditable(d, item) && item.labelStyle) {
                delete item.labelStyle.textOffset;
              }
            });
          });
        }
      }

      const posBody = propSection(pane, 'Coordinates & Transform', false);
      pointField(posBody, 'position', e.position);
      makeField(
        posBody,
        'Rotation in degrees',
        String(e.rotation),
        (v, draft) => {
          if (draft.type === 'insert') draft.rotation = Number(v);
        },
        true,
      );
      makeField(
        posBody,
        'Scale (uniform)',
        String(Math.abs(e.scale.x)),
        (v, draft) => {
          const s = Number(v);
          if (draft.type === 'insert' && s > 0) {
            draft.scale.x = Math.sign(draft.scale.x || 1) * s;
            draft.scale.y = Math.sign(draft.scale.y || 1) * s;
          }
        },
        true,
      );
    }

    if (e.type === 'text') {
      const txtBody = propSection(pane, 'Text Content', true);
      makeField(txtBody, 'Text', e.text, (v, draft) => {
        if (draft.type === 'text') draft.text = v;
      });
      makeField(
        txtBody,
        'Height',
        String(e.height),
        (v, draft) => {
          if (draft.type === 'text' && Number(v) > 0) draft.height = Number(v);
        },
        true,
      );
      const txtCoordBody = propSection(pane, 'Coordinates & Rotation', false);
      pointField(txtCoordBody, 'position', e.position);
      makeField(
        txtCoordBody,
        'Rotation in degrees',
        String(e.rotation),
        (v, draft) => {
          if (draft.type === 'text') draft.rotation = Number(v);
        },
        true,
      );
    }
  }

  openGeneralSettings(): void {
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-settings-modal');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'General Project Settings');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    const head = element(dialog, 'div', 'cad-modal-header');
    element(head, 'h3', '', 'General Settings');
    button(head, 'Close', finish);

    const ps = { ...defaultProjectSettings(), ...(this.drawing.projectSettings ?? {}) };
    const updateProject = (label: string, patch: Partial<typeof ps>): void => {
      if (this.readOnly) return;
      this.transact(label, (d) => {
        d.projectSettings = { ...defaultProjectSettings(), ...(d.projectSettings ?? {}), ...patch };
      });
    };

    const grid = element(dialog, 'div', 'cad-settings-grid');

    const settingsCard = (title: string, defaultOpen: boolean, wide = false): HTMLElement => {
      const det = element(
        grid,
        'details',
        `cad-manager-section cad-settings-card${wide ? ' cad-settings-wide' : ''}`,
      );
      det.open = defaultOpen;
      element(det, 'summary', 'cad-settings-summary', title);
      return element(det, 'div', 'cad-settings-body');
    };

    // Card 1: Project Text & Label Defaults
    const textSec = settingsCard('Text & Object Label Defaults (Project)', true);

    const textHLbl = element(textSec, 'label', 'cad-field', 'Default text & label height (mm)');
    const textHInput = element(textHLbl, 'input');
    textHInput.type = 'number';
    textHInput.step = '0.5';
    textHInput.min = '0.2';
    textHInput.value = String(ps.defaultTextHeight);
    textHInput.disabled = this.readOnly;
    textHInput.setAttribute('aria-label', 'Default label text height');
    textHInput.addEventListener('change', () => {
      const n = Number(textHInput.value);
      if (Number.isFinite(n) && n > 0) {
        updateProject('Default text height', { defaultTextHeight: n });
        this.persistSettings();
      }
    });

    const anchorLbl = element(textSec, 'label', 'cad-field', 'Default label placement');
    const anchorSel = choice(
      anchorLbl,
      [
        ['default', 'Default (Right / Top)'],
        ['center', 'Center'],
        ['top', 'Top side'],
        ['bottom', 'Bottom side'],
        ['left', 'Left side'],
        ['right', 'Right side'],
        ['top-left', 'Top-Left corner'],
        ['top-right', 'Top-Right corner'],
        ['bottom-left', 'Bottom-Left corner'],
        ['bottom-right', 'Bottom-Right corner'],
      ],
      ps.defaultLabelAnchor,
      (v) => {
        updateProject('Default label placement', { defaultLabelAnchor: v as LabelAnchor });
        this.persistSettings();
      },
    );
    anchorSel.disabled = this.readOnly;
    anchorSel.setAttribute('aria-label', 'Default label placement');

    const orientLbl = element(textSec, 'label', 'cad-field', 'Default label orientation');
    const orientSel = choice(
      orientLbl,
      [
        ['horizontal', 'Horizontal (0°)'],
        ['vertical', 'Vertical (90°)'],
        ['follow', 'Follow block rotation'],
      ],
      ps.defaultLabelOrientation,
      (v) => {
        updateProject('Default label orientation', {
          defaultLabelOrientation: v as LabelOrientation,
        });
        this.persistSettings();
      },
    );
    orientSel.disabled = this.readOnly;
    orientSel.setAttribute('aria-label', 'Default label orientation');

    const scaleTextLbl = element(
      textSec,
      'label',
      'cad-checkbox',
      'Scale label text when scaling objects by default',
    );
    const scaleTextChk = element(scaleTextLbl, 'input');
    scaleTextChk.type = 'checkbox';
    scaleTextChk.checked = ps.defaultLabelScaleWithBlock;
    scaleTextChk.disabled = this.readOnly;
    scaleTextChk.addEventListener('change', () =>
      updateProject('Default label scaling', {
        defaultLabelScaleWithBlock: scaleTextChk.checked,
      }),
    );

    // Card 2: Dynamic Port Connectors & Cross-Over Humps
    const jumpSec = settingsCard('Dynamic Connectors & Cross-Over Bridges', true);

    const dynConnLbl = element(
      jumpSec,
      'label',
      'cad-checkbox',
      'Dynamic port connectors active for new Lines & Polylines',
    );
    const dynConnChk = element(dynConnLbl, 'input');
    dynConnChk.type = 'checkbox';
    dynConnChk.checked = this.dynamicPortConnectors;
    dynConnChk.setAttribute('aria-label', 'Dynamic port connectors default');
    dynConnChk.addEventListener('change', () => {
      this.dynamicPortConnectors = dynConnChk.checked;
      updateProject('Toggle dynamic port connectors', {
        dynamicPortConnectors: dynConnChk.checked,
      });
      this.updateToggles();
      this.persistSettings();
    });

    const routeModeLbl = element(jumpSec, 'label', 'cad-field', 'Line connector behavior on move');
    const routeModeSel = choice(
      routeModeLbl,
      [
        ['straight_to_polyline', 'Convert orthogonal Line to Polyline'],
        ['keep_original', 'Keep straight Line stretched to port'],
      ],
      this.connectorRoutingMode,
      (v) => {
        this.connectorRoutingMode = v as ConnectorRoutingMode;
        updateProject('Connector routing behavior', {
          connectorRoutingMode: this.connectorRoutingMode,
        });
        this.persistSettings();
      },
    );
    routeModeSel.setAttribute('aria-label', 'Connector routing behavior');

    const jumpLbl = element(
      jumpSec,
      'label',
      'cad-checkbox',
      'Show semicircular cross-over hump where lines/wires cross',
    );
    const jumpChk = element(jumpLbl, 'input');
    jumpChk.type = 'checkbox';
    jumpChk.checked = ps.lineJumps;
    jumpChk.disabled = this.readOnly;
    jumpChk.setAttribute('aria-label', 'Enable line cross-over humps');
    jumpChk.addEventListener('change', () =>
      updateProject('Toggle line cross-over humps', { lineJumps: jumpChk.checked }),
    );

    const humpSub = element(jumpSec, 'details', 'cad-settings-sub');
    element(humpSub, 'summary', '', 'Cross-Over Hump Tuning');
    const jumpRadLbl = element(humpSub, 'label', 'cad-field', 'Hump arc radius (mm)');
    const jumpRadInput = element(jumpRadLbl, 'input');
    jumpRadInput.type = 'number';
    jumpRadInput.step = '0.5';
    jumpRadInput.min = '0.5';
    jumpRadInput.value = String(ps.jumpRadius);
    jumpRadInput.disabled = this.readOnly;
    jumpRadInput.setAttribute('aria-label', 'Hump arc radius');
    jumpRadInput.addEventListener('change', () => {
      const r = Number(jumpRadInput.value);
      if (Number.isFinite(r) && r >= 0.5) updateProject('Hump radius', { jumpRadius: r });
    });

    const jumpPrioLbl = element(humpSub, 'label', 'cad-field', 'Hump axis priority');
    const jumpPrioSel = choice(
      jumpPrioLbl,
      [
        ['horizontal', 'Horizontal lines jump over vertical'],
        ['vertical', 'Vertical lines jump over horizontal'],
      ],
      ps.jumpPriority,
      (v) => updateProject('Hump axis priority', { jumpPriority: v as JumpPriority }),
    );
    jumpPrioSel.disabled = this.readOnly;
    jumpPrioSel.setAttribute('aria-label', 'Hump axis priority');

    const jumpScopeLbl = element(humpSub, 'label', 'cad-field', 'Apply humps to');
    const jumpScopeSel = choice(
      jumpScopeLbl,
      [
        ['all', 'All crossing lines, polylines & wires'],
        ['wires', 'Wires & process piping only'],
      ],
      ps.jumpScope,
      (v) => updateProject('Hump scope', { jumpScope: v as JumpScope }),
    );
    jumpScopeSel.disabled = this.readOnly;
    jumpScopeSel.setAttribute('aria-label', 'Hump scope');

    // Card 3: Tablet, Docking & Grid Preferences
    const tabletSec = settingsCard('Workspace Panels, Tablet & Grid', true);

    const loupeLbl = element(tabletSec, 'label', 'cad-field', 'Apple Pencil zoom loupe delay');
    const loupeSel = choice(
      loupeLbl,
      [
        ['0', 'Off (Never auto-open)'],
        ['600', '600 ms (Fast hold)'],
        ['1200', '1200 ms (Balanced)'],
        ['1800', '1800 ms (Long hold)'],
        ['2500', '2500 ms (Extra long)'],
      ],
      String(this.penLoupeDelayMs),
      (v) => {
        this.penLoupeDelayMs = Number(v);
        this.clearPenLoupe();
        this.persistSettings();
      },
    );
    loupeSel.setAttribute('aria-label', 'Apple Pencil loupe delay');

    const gridStepLbl = element(tabletSec, 'label', 'cad-field', 'Grid step (mm)');
    const gridStepInput = element(gridStepLbl, 'input');
    gridStepInput.type = 'number';
    gridStepInput.step = 'any';
    gridStepInput.min = '0.001';
    gridStepInput.value = String(this.gridStep);
    gridStepInput.setAttribute('aria-label', 'Settings grid step');
    gridStepInput.addEventListener('change', () => {
      const n = Number(gridStepInput.value);
      if (Number.isFinite(n) && n >= 0.001) {
        this.gridStep = n;
        this.updateGridStatusLabel();
        this.persistSettings();
        this.render();
      }
    });

    const postDimLbl = element(
      tabletSec,
      'label',
      'cad-checkbox',
      'Open measurement input tab after drawing a line or shape',
    );
    const postDimChk = element(postDimLbl, 'input');
    postDimChk.type = 'checkbox';
    postDimChk.checked = this.postDrawMeasureTab;
    postDimChk.setAttribute('aria-label', 'Post-draw measurement input tab');
    postDimChk.addEventListener('change', () => {
      this.postDrawMeasureTab = postDimChk.checked;
      if (!this.postDrawMeasureTab) this.postDimEl.hidden = true;
      this.updateToggles();
      this.persistSettings();
    });

    const ribDockLbl = element(tabletSec, 'label', 'cad-field', 'Tools ribbon dock position');
    const ribDockSel = choice(
      ribDockLbl,
      [
        ['left', 'Left edge (Default)'],
        ['right', 'Right edge'],
        ['top', 'Top horizontal bar'],
        ['bottom', 'Bottom horizontal bar'],
      ],
      this.ribbonDock,
      (v) => {
        this.ribbonDock = v as RibbonDock;
        this.applyDockLayout();
        this.persistSettings();
        this.render();
      },
    );
    ribDockSel.setAttribute('aria-label', 'Tools ribbon dock position');

    const panDockLbl = element(tabletSec, 'label', 'cad-field', 'Inspector panel dock mode');
    const panDockSel = choice(
      panDockLbl,
      [
        ['right', 'Right panel (Default)'],
        ['left', 'Left panel'],
        ['top', 'Top panel'],
        ['bottom', 'Bottom panel'],
        ['floating', 'Floating collapsible window'],
      ],
      this.panelDock,
      (v) => {
        this.panelDock = v as PanelDock;
        this.applyDockLayout();
        this.persistSettings();
        this.render();
      },
    );
    panDockSel.setAttribute('aria-label', 'Inspector panel dock mode');

    // Card 4: Keyboard Shortcuts, Command Aliases & Mouse Controls (long section collapsed by default)
    const inputSec = settingsCard('Shortcuts, Command Aliases & Mouse Controls', false, true);

    const mouseRightLbl = element(inputSec, 'label', 'cad-field', 'Mouse right-click behavior');
    const mouseRightSel = choice(
      mouseRightLbl,
      [
        ['pan_or_finish', 'Right-drag pan / click finish (CAD Default)'],
        ['repeat_last', 'Click repeats last command / finishes'],
        ['context_menu', 'Show selection actions / cycle grips'],
      ],
      this.inputBindings.mouse.rightClick,
      (v) => {
        this.inputBindings.mouse.rightClick = v as RightClickMode;
        this.persistSettings();
      },
    );
    mouseRightSel.setAttribute('aria-label', 'Mouse right-click behavior');

    const mouseMidLbl = element(inputSec, 'label', 'cad-field', 'Mouse middle-button behavior');
    const mouseMidSel = choice(
      mouseMidLbl,
      [
        ['pan', 'Pan canvas (CAD Default)'],
        ['zoom_extents', 'Zoom Extents (Fit Drawing)'],
        ['finish', 'Finish active command'],
      ],
      this.inputBindings.mouse.middleClick,
      (v) => {
        this.inputBindings.mouse.middleClick = v as MiddleClickMode;
        this.persistSettings();
      },
    );
    mouseMidSel.setAttribute('aria-label', 'Mouse middle-button behavior');

    const wheelLbl = element(inputSec, 'label', 'cad-field', 'Mouse wheel behavior');
    const wheelSel = choice(
      wheelLbl,
      [
        ['zoom', 'Zoom at cursor (CAD Default)'],
        ['pan_vertical', 'Scroll / pan canvas'],
      ],
      this.inputBindings.mouse.wheelMode,
      (v) => {
        this.inputBindings.mouse.wheelMode = v as WheelMode;
        this.persistSettings();
      },
    );
    wheelSel.setAttribute('aria-label', 'Mouse wheel behavior');

    const invWheelLbl = element(
      inputSec,
      'label',
      'cad-checkbox',
      'Invert mouse wheel zoom direction',
    );
    const invWheelChk = element(invWheelLbl, 'input');
    invWheelChk.type = 'checkbox';
    invWheelChk.checked = this.inputBindings.mouse.invertWheelZoom;
    invWheelChk.addEventListener('change', () => {
      this.inputBindings.mouse.invertWheelZoom = invWheelChk.checked;
      this.persistSettings();
    });

    const shortcutGrid = element(inputSec, 'div', 'cad-shortcut-grid');
    for (const [action, label] of Object.entries(SHORTCUT_LABELS) as [ShortcutAction, string][]) {
      const row = element(shortcutGrid, 'label', 'cad-field', label);
      const inp = element(row, 'input');
      inp.type = 'text';
      inp.value = this.inputBindings.shortcuts[action] ?? '';
      inp.placeholder = 'Click & press key (e.g. F3, Ctrl+L)';
      inp.setAttribute('aria-label', `Shortcut ${action}`);
      inp.addEventListener('keydown', (ev) => {
        if (['Tab', 'Escape'].includes(ev.key)) return;
        ev.preventDefault();
        ev.stopPropagation();
        if (ev.key === 'Backspace' || ev.key === 'Delete') {
          inp.value = '';
          delete this.inputBindings.shortcuts[action];
        } else {
          const combo = normalizeKeyCombo(ev);
          if (combo) {
            inp.value = combo;
            this.inputBindings.shortcuts[action] = combo;
          }
        }
        this.persistSettings();
      });
      inp.addEventListener('change', () => {
        const val = inp.value.trim();
        if (val) this.inputBindings.shortcuts[action] = val;
        else delete this.inputBindings.shortcuts[action];
        this.persistSettings();
      });
    }

    const aliasLbl = element(
      inputSec,
      'label',
      'cad-field',
      'Custom command abbreviations (one per line: ALIAS=COMMAND, e.g. LN=LINE, OF=OFFSET, SC=SCALE)',
    );
    const aliasArea = element(aliasLbl, 'textarea', 'cad-alias-area');
    aliasArea.rows = 3;
    aliasArea.setAttribute('aria-label', 'Custom command abbreviations');
    aliasArea.value = Object.entries(this.inputBindings.customAliases)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    aliasArea.addEventListener('change', () => {
      const nextAliases: Record<string, string> = {};
      for (const line of aliasArea.value.split(/\r?\n/)) {
        const parts = line.split(/[=:]/);
        if (parts.length >= 2) {
          const k = parts[0].trim().toUpperCase();
          const v = parts[1].trim().toUpperCase();
          if (k && v) nextAliases[k] = v;
        }
      }
      this.inputBindings.customAliases = nextAliases;
      this.persistSettings();
    });

    const resetBindRow = element(inputSec, 'div', 'cad-actions');
    button(resetBindRow, 'Reset Shortcuts & Mouse Defaults', () => {
      this.inputBindings = defaultInputBindings();
      this.persistSettings();
      finish();
      this.openGeneralSettings();
    });
  }

  private updateToolOptionsBar(): void {
    this.toolBarEl.replaceChildren();
    if (this.readOnly || !['O', 'SC', 'MA'].includes(this.tool)) {
      this.toolBarEl.hidden = true;
      return;
    }
    this.toolBarEl.hidden = false;
    if (this.tool === 'O') {
      element(this.toolBarEl, 'strong', '', 'Offset');
      const distLbl = element(this.toolBarEl, 'label', 'cad-inline-field', 'Dist (mm)');
      const distInp = element(distLbl, 'input');
      distInp.type = 'number';
      distInp.min = '0.01';
      distInp.step = 'any';
      distInp.value = String(this.offsetDistance);
      distInp.setAttribute('aria-label', 'Offset distance mm');
      distInp.addEventListener('change', () => {
        const n = Number(distInp.value);
        if (Number.isFinite(n) && n > 0) this.offsetDistance = n;
      });
      for (const [mode, lbl] of [
        ['pointer', 'Cursor side'],
        ['inside', 'Inside'],
        ['outside', 'Outside'],
        ['both', 'Both sides'],
      ] as [OffsetSideMode, string][]) {
        const b = button(this.toolBarEl, lbl, () => {
          this.offsetSide = mode;
          this.updateToolOptionsBar();
          this.render();
        });
        b.setAttribute('aria-pressed', String(this.offsetSide === mode));
      }
      if (this.selected.size && this.offsetSide !== 'pointer') {
        button(this.toolBarEl, 'Apply to Selection', () => {
          const targets = this.drawing.entities.filter(
            (e) =>
              this.selected.has(e.id) && ['line', 'polyline', 'circle', 'arc'].includes(e.type),
          );
          const created: Entity[] = [];
          for (const src of targets) {
            if (this.offsetSide === 'both')
              created.push(...offsetBothSides(src, this.offsetDistance));
            else if (this.offsetSide === 'inside' || this.offsetSide === 'outside') {
              const one = offsetEntity(src, this.offsetDistance, { x: 0, y: 0 }, this.offsetSide);
              if (one) created.push(one);
            }
          }
          if (created.length) this.addEntities(created, true);
          else this.say('Selected shape could not be offset at that distance.', true);
        });
      }
    } else if (this.tool === 'SC') {
      element(this.toolBarEl, 'strong', '', 'Scale');
      const facLbl = element(this.toolBarEl, 'label', 'cad-inline-field', 'Factor ×');
      const facInp = element(facLbl, 'input');
      facInp.type = 'number';
      facInp.min = '0.01';
      facInp.step = 'any';
      facInp.value = String(this.scaleFactor);
      facInp.setAttribute('aria-label', 'Scale factor');
      facInp.addEventListener('change', () => {
        const n = Number(facInp.value);
        if (Number.isFinite(n) && n > 0) this.scaleFactor = n;
      });
      button(this.toolBarEl, 'Apply Scale', () => {
        if (!this.selected.size) {
          this.say('Select object(s) first to scale.');
          return;
        }
        const n = Number(facInp.value);
        if (!(Number.isFinite(n) && n > 0)) return;
        this.scaleFactor = n;
        const origin = this.points[0] ?? this.selectionCenter();
        this.applyTransform(origin, origin, n);
        this.setTool('SELECT');
      });
    } else if (this.tool === 'MA') {
      element(this.toolBarEl, 'strong', '', 'Match Properties');
      element(
        this.toolBarEl,
        'span',
        'cad-help',
        this.matchSourceId ? 'Source locked · click targets to apply' : 'Click source object',
      );
      if (this.matchSourceId) {
        button(this.toolBarEl, 'Change Source', () => {
          this.matchSourceId = undefined;
          this.updateToolOptionsBar();
        });
      }
    }
  }

  private positionStagePopover(pop: HTMLElement, worldAnchor: Point): void {
    const stageW = this.stage.clientWidth || 800;
    const stageH = this.stage.clientHeight || 600;
    const screenPt = this.renderer.camera.screen(worldAnchor);
    const popRect = pop.getBoundingClientRect();
    const popW = popRect.width || 240;
    const popH = popRect.height || 64;
    const left = Math.max(8, Math.min(stageW - popW - 8, screenPt.x - popW / 2));
    let top = screenPt.y + 14;
    if (top + popH > stageH - 10) {
      top = Math.max(8, screenPt.y - popH - 14);
    }
    top = Math.max(8, Math.min(Math.max(8, stageH - popH - 8), top));
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
    pop.style.bottom = 'auto';
  }

  private openBridgePopover(crossing: LineCrossing): void {
    const cKey = crossing.key;
    const rebuild = (): void => {
      const current = findAllLineCrossings(this.drawing).find((x) => x.key === cKey) ?? crossing;
      this.bridgePopEl.replaceChildren();
      this.bridgePopEl.hidden = false;
      const topRow = element(this.bridgePopEl, 'div', 'cad-post-dim-row');
      element(topRow, 'strong', '', 'Bridge Jump');
      const togBtn = button(topRow, current.active ? 'Bridge: ON' : 'Bridge: OFF', () => {
        this.transact('Toggle cross-over bridge', (d) => {
          setLineCrossingJump(d, cKey, { active: !current.active });
        });
        rebuild();
      });
      togBtn.title = 'Enable or disable bridge jump at this intersection';
      togBtn.setAttribute('aria-pressed', String(current.active));
      const closeBridgeBtn = button(
        topRow,
        '',
        () => {
          this.bridgePopEl.hidden = true;
        },
        'Close bridge popover',
      );
      setToolIcon(closeBridgeBtn, 'CLOSE');

      const axisRow = element(this.bridgePopEl, 'div', 'cad-post-dim-row');
      element(axisRow, 'small', 'cad-icon-field', 'Jumper:');
      const hBtn = button(axisRow, 'Horizontal', () => {
        this.transact('Horizontal bridge jump', (d) => {
          setLineCrossingJump(d, cKey, { active: true, axis: 'horizontal' });
        });
        rebuild();
      });
      hBtn.title = 'Horizontal line jumps over vertical line';
      hBtn.setAttribute('aria-pressed', String(current.axis === 'horizontal'));
      const vBtn = button(axisRow, 'Vertical', () => {
        this.transact('Vertical bridge jump', (d) => {
          setLineCrossingJump(d, cKey, { active: true, axis: 'vertical' });
        });
        rebuild();
      });
      vBtn.title = 'Vertical line jumps over horizontal line';
      vBtn.setAttribute('aria-pressed', String(current.axis === 'vertical'));
      this.positionStagePopover(this.bridgePopEl, current.point);
    };
    rebuild();
  }

  /** Shows a compact context-anchored post-draw editor directly below the newly drawn line or shape. */
  private showPostDrawMeasureTab(entity: Entity): void {
    this.postDimEl.replaceChildren();
    if (!this.postDrawMeasureTab || this.readOnly) {
      this.postDimEl.hidden = true;
      return;
    }
    const entityId = entity.id;
    const isLineLike = entity.type === 'line' || entity.type === 'polyline';
    if (
      entity.type !== 'line' &&
      entity.type !== 'circle' &&
      !(entity.type === 'polyline' && entity.points.length >= 2)
    ) {
      this.postDimEl.hidden = true;
      return;
    }

    this.postDimEl.hidden = false;
    const dimRow = element(this.postDimEl, 'div', 'cad-post-dim-row');

    if (entity.type === 'line') {
      const lenLbl = element(dimRow, 'label', 'cad-inline-field cad-icon-field');
      setToolIcon(
        button(lenLbl, '', () => {}, 'Length mm'),
        'LEN',
      );
      const lenInp = element(lenLbl, 'input');
      lenInp.type = 'number';
      lenInp.step = 'any';
      lenInp.min = '0.01';
      lenInp.value = distance(entity.a, entity.b).toFixed(2);
      lenInp.setAttribute('aria-label', 'Post-draw line length');

      const angLbl = element(dimRow, 'label', 'cad-inline-field cad-icon-field');
      setToolIcon(
        button(angLbl, '', () => {}, 'Angle deg'),
        'ANGLE',
      );
      const angInp = element(angLbl, 'input');
      angInp.type = 'number';
      angInp.step = 'any';
      angInp.value = normAngle(angle(entity.a, entity.b)).toFixed(1);
      angInp.setAttribute('aria-label', 'Post-draw line angle');

      const apply = (): void => {
        const len = Number(lenInp.value);
        const deg = Number(angInp.value);
        if (!(Number.isFinite(len) && len > 0 && Number.isFinite(deg))) return;
        this.transact('Adjust line dimensions', (d) => {
          const target = d.entities.find((e): e is Line => e.id === entityId && e.type === 'line');
          if (target) target.b = polar(target.a, len, deg);
        });
        this.postDimEl.hidden = true;
      };
      const okBtn = button(dimRow, '', apply, 'Apply');
      setToolIcon(okBtn, 'CHECK');
      okBtn.setAttribute('aria-label', 'Apply');
      const stopKey = (ev: KeyboardEvent): void => {
        ev.stopPropagation();
        if (ev.key === 'Enter') apply();
        else if (ev.key === 'Escape') this.postDimEl.hidden = true;
      };
      lenInp.addEventListener('keydown', stopKey);
      angInp.addEventListener('keydown', stopKey);
    } else if (entity.type === 'circle') {
      const radLbl = element(dimRow, 'label', 'cad-inline-field cad-icon-field', 'R');
      const radInp = element(radLbl, 'input');
      radInp.type = 'number';
      radInp.step = 'any';
      radInp.min = '0.01';
      radInp.value = entity.radius.toFixed(2);
      radInp.setAttribute('aria-label', 'Post-draw circle radius');
      const apply = (): void => {
        const r = Number(radInp.value);
        if (!(Number.isFinite(r) && r > 0)) return;
        this.transact('Adjust circle radius', (d) => {
          const target = d.entities.find((e) => e.id === entityId && e.type === 'circle');
          if (target && target.type === 'circle') target.radius = r;
        });
        this.postDimEl.hidden = true;
      };
      const okBtn = button(dimRow, '', apply, 'Apply');
      setToolIcon(okBtn, 'CHECK');
      okBtn.setAttribute('aria-label', 'Apply');
      radInp.addEventListener('keydown', (ev) => {
        ev.stopPropagation();
        if (ev.key === 'Enter') apply();
        else if (ev.key === 'Escape') this.postDimEl.hidden = true;
      });
    } else if (entity.type === 'polyline' && entity.points.length >= 2) {
      const lastIdx = entity.points.length - 1;
      const pPrev = entity.points[lastIdx - 1];
      const pLast = entity.points[lastIdx];
      const lenLbl = element(dimRow, 'label', 'cad-inline-field cad-icon-field');
      setToolIcon(
        button(lenLbl, '', () => {}, 'Segment length mm'),
        'LEN',
      );
      const lenInp = element(lenLbl, 'input');
      lenInp.type = 'number';
      lenInp.step = 'any';
      lenInp.min = '0.01';
      lenInp.value = distance(pPrev, pLast).toFixed(2);
      lenInp.setAttribute('aria-label', 'Post-draw segment length');
      const apply = (): void => {
        const len = Number(lenInp.value);
        if (!(Number.isFinite(len) && len > 0)) return;
        this.transact('Adjust polyline segment', (d) => {
          const target = d.entities.find((e) => e.id === entityId && e.type === 'polyline');
          if (target && target.type === 'polyline' && target.points.length >= 2) {
            const i = target.points.length - 1;
            const a = target.points[i - 1];
            target.points[i] = polar(a, len, angle(a, target.points[i]));
          }
        });
        this.postDimEl.hidden = true;
      };
      const okBtn = button(dimRow, '', apply, 'Apply');
      setToolIcon(okBtn, 'CHECK');
      okBtn.setAttribute('aria-label', 'Apply');
      lenInp.addEventListener('keydown', (ev) => {
        ev.stopPropagation();
        if (ev.key === 'Enter') apply();
        else if (ev.key === 'Escape') this.postDimEl.hidden = true;
      });
    }

    const closeBtn = button(
      dimRow,
      '',
      () => {
        this.postDimEl.hidden = true;
      },
      'Close popup',
    );
    setToolIcon(closeBtn, 'CLOSE');
    closeBtn.setAttribute('aria-label', 'Close');

    // Compact icon strip for collapsed-by-default sub-menus (Layer, Style, Arrow)
    const iconRow = element(this.postDimEl, 'div', 'cad-post-dim-row cad-post-dim-icons');
    const subPanel = element(this.postDimEl, 'div', 'cad-post-dim-sub');

    const renderSubPanel = (): void => {
      subPanel.replaceChildren();
      subPanel.hidden = this.postDimSection === null;
      const curEnt = this.drawing.entities.find((e) => e.id === entityId);
      if (!curEnt || this.postDimSection === null) return;

      if (this.postDimSection === 'layer') {
        const lSel = choice(
          subPanel,
          this.drawing.layers.map((l) => [l.id, l.name]),
          curEnt.layer,
          (v) => {
            this.transact('Quick layer', (d) => {
              const target = d.entities.find((e) => e.id === entityId);
              if (target) target.layer = v;
            });
          },
        );
        lSel.setAttribute('aria-label', 'Quick layer');
      } else if (this.postDimSection === 'style') {
        const colSel = choice(
          subPanel,
          [['BYLAYER', 'Color: By layer'], ...ACI_PRESETS],
          curEnt.color !== undefined ? String(curEnt.color) : 'BYLAYER',
          (v) =>
            this.transact('Quick color', (d) => {
              const target = d.entities.find((e) => e.id === entityId);
              if (target) {
                if (v === 'BYLAYER') delete target.color;
                else target.color = Number(v);
              }
            }),
        );
        colSel.setAttribute('aria-label', 'Quick color');

        const ltSel = choice(
          subPanel,
          [['BYLAYER', 'Linetype: By layer'], ...lineTypeChoices()],
          curEnt.lineType ?? 'BYLAYER',
          (v) =>
            this.transact('Quick linetype', (d) => {
              const target = d.entities.find((e) => e.id === entityId);
              if (target) {
                if (v === 'BYLAYER') {
                  delete target.lineType;
                  delete target.linePattern;
                } else {
                  target.lineType = v as LineType;
                  delete target.linePattern;
                }
              }
            }),
        );
        ltSel.setAttribute('aria-label', 'Quick linetype');
      } else if (this.postDimSection === 'arrow' && isLineLike) {
        const liveEnt = (): Line | Polyline | undefined =>
          this.drawing.entities.find(
            (e): e is Line | Polyline =>
              e.id === entityId && (e.type === 'line' || e.type === 'polyline'),
          );
        const curA = liveEnt()?.arrows;
        const arrStyleSel = choice(
          subPanel,
          [
            ['none', 'No arrow'],
            ['closed', 'Closed filled'],
            ['open', 'Open chevron'],
            ['stealth', 'Stealth barb'],
            ['triangle', 'Hollow triangle'],
            ['dot', 'Dot marker'],
            ['slash', 'Architectural slash'],
          ],
          curA?.style ?? 'none',
          (v) => {
            this.transact('Quick arrow style', (d) => {
              const target = d.entities.find(
                (e): e is Line | Polyline =>
                  e.id === entityId && (e.type === 'line' || e.type === 'polyline'),
              );
              if (!target) return;
              if (v === 'none') delete target.arrows;
              else {
                target.arrows = {
                  style: v as ArrowStyle,
                  placement: target.arrows?.placement ?? 'end',
                  segments: target.arrows?.segments ?? 3,
                  size: target.arrows?.size ?? 3.5,
                  reversed: !!target.arrows?.reversed,
                };
              }
            });
            renderSubPanel();
          },
        );
        arrStyleSel.setAttribute('aria-label', 'Quick arrow style');

        if (curA) {
          const plSel = choice(
            subPanel,
            [
              ['end', 'At end'],
              ['start', 'At start'],
              ['both', 'Both ends'],
              ['middle', 'Middle (L/2)'],
              ['every_n', 'Every L/N'],
            ],
            curA.placement,
            (v) => {
              this.transact('Quick arrow placement', (d) => {
                const target = d.entities.find(
                  (e): e is Line | Polyline =>
                    e.id === entityId && (e.type === 'line' || e.type === 'polyline'),
                );
                if (target?.arrows) target.arrows.placement = v as ArrowPlacement;
              });
              renderSubPanel();
            },
          );
          plSel.setAttribute('aria-label', 'Quick arrow placement');
          if (curA.placement === 'every_n') {
            const nIn = element(subPanel, 'input');
            nIn.type = 'number';
            nIn.min = '1';
            nIn.max = '100';
            nIn.step = '1';
            nIn.value = String(curA.segments ?? 3);
            nIn.setAttribute('aria-label', 'Quick arrow subdivisions N');
            nIn.style.width = '44px';
            nIn.addEventListener('input', () => {
              const n = Math.round(Number(nIn.value));
              const t = liveEnt();
              if (t?.arrows && Number.isFinite(n) && n >= 1) {
                t.arrows.segments = Math.min(100, n);
                this.render();
              }
            });
            nIn.addEventListener('change', () => {
              const n = Math.round(Number(nIn.value));
              if (Number.isFinite(n) && n >= 1) {
                this.transact('Quick arrow subdivisions', (d) => {
                  const target = d.entities.find(
                    (e): e is Line | Polyline =>
                      e.id === entityId && (e.type === 'line' || e.type === 'polyline'),
                  );
                  if (target?.arrows) target.arrows.segments = Math.min(100, n);
                });
              }
            });
          }
          const revBtn = button(
            subPanel,
            '',
            () => {
              this.transact('Reverse quick arrows', (d) => {
                const target = d.entities.find(
                  (e): e is Line | Polyline =>
                    e.id === entityId && (e.type === 'line' || e.type === 'polyline'),
                );
                if (target?.arrows) target.arrows.reversed = !target.arrows.reversed;
              });
            },
            'Reverse arrow direction',
          );
          setToolIcon(revBtn, 'REVERSE', curA.reversed ? 'Rev' : '');
        }
      }
    };

    const toggleSubBtn = (sec: 'layer' | 'style' | 'arrow', icon: string, label: string): void => {
      const b = button(
        iconRow,
        '',
        () => {
          this.postDimSection = this.postDimSection === sec ? null : sec;
          for (const ch of Array.from(iconRow.querySelectorAll('button'))) {
            ch.setAttribute('aria-pressed', String(ch === b && this.postDimSection === sec));
          }
          renderSubPanel();
        },
        `${label} options`,
      );
      setToolIcon(b, icon, label);
      b.setAttribute('aria-pressed', String(this.postDimSection === sec));
    };

    this.postDimSection = null;
    toggleSubBtn('layer', 'LAYERS', 'Layer');
    toggleSubBtn('style', 'LTYPE', 'Style');
    if (isLineLike) toggleSubBtn('arrow', 'ARROW', 'Arrow');
    renderSubPanel();

    const eb = entityBounds(this.drawing, entity);
    const anchorWorld =
      Number.isFinite(eb.minX) && Number.isFinite(eb.minY)
        ? { x: (eb.minX + eb.maxX) / 2, y: eb.minY }
        : { x: 0, y: 0 };
    this.positionStagePopover(this.postDimEl, anchorWorld);
  }

  /** Renders the schematic multi-page strip above the status footer. */
  private renderPageBar(): void {
    this.pageBar.replaceChildren();
    const pages = this.drawing.pages?.length
      ? this.drawing.pages
      : [{ id: 'page-1', name: 'Page 1' }];
    const activeId = this.drawing.activePageId ?? pages[0].id;
    element(this.pageBar, 'span', 'cad-page-label', 'Pages:');
    for (const p of pages) {
      const b = button(
        this.pageBar,
        p.name,
        () => {
          if (p.id === activeId && this.drawing.pages?.length) return;
          this.switchPage(p.id);
        },
        `Switch to ${p.name}`,
      );
      b.className = 'cad-page-tab';
      b.setAttribute('aria-pressed', String(p.id === activeId));
    }
    if (!this.readOnly) {
      const addB = button(
        this.pageBar,
        '+ Page',
        () => this.addNewPage(),
        'Add new schematic page',
      );
      addB.className = 'cad-page-add';
    }
    button(this.pageBar, 'Manage…', () => this.openPagesModal(), 'Manage schematic pages');
  }

  switchPage(pageId: string): void {
    if (this.readOnly) return;
    this.transact('Switch page', (d) => {
      ensurePages(d, this.host.documentName);
      switchDrawingPage(d, pageId);
    });
    this.selected.clear();
    this.highlightId = undefined;
    this.fit();
  }

  addNewPage(duplicateCurrent = false, name?: string): void {
    if (this.readOnly) return;
    this.transact(duplicateCurrent ? 'Duplicate page' : 'Add page', (d) => {
      addDrawingPage(d, name, duplicateCurrent);
    });
    this.selected.clear();
    this.highlightId = undefined;
    this.fit();
  }

  openPagesModal(): void {
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-modal-wide');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Schematic Pages Manager');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    const header = element(dialog, 'div', 'cad-modal-header');
    element(header, 'h3', '', 'Multi-Page Schematic Manager');
    button(header, 'Close', finish);

    if (!this.readOnly && (!this.drawing.pages || !this.drawing.pages.length)) {
      this.transact('Initialize pages', (d) => {
        ensurePages(d, this.host.documentName);
      });
    }

    const listWrap = element(dialog, 'div', 'cad-pages-list');
    const renderList = (): void => {
      listWrap.replaceChildren();
      const pages = this.drawing.pages?.length
        ? this.drawing.pages
        : [
            {
              id: 'page-1',
              name: 'Page 1',
              entities: this.drawing.entities,
              scale: this.drawing.scale ?? '1:1',
            },
          ];
      for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        const isActive = p.id === (this.drawing.activePageId ?? pages[0].id);
        const row = element(listWrap, 'div', `cad-page-row${isActive ? ' is-active' : ''}`);
        const titleInp = element(row, 'input');
        titleInp.type = 'text';
        titleInp.value = p.name;
        titleInp.disabled = this.readOnly;
        titleInp.setAttribute('aria-label', `Page name ${p.name}`);
        titleInp.addEventListener('change', () => {
          this.transact('Rename page', (d) => {
            renameDrawingPage(d, p.id, titleInp.value);
          });
          renderList();
        });
        element(
          row,
          'span',
          'cad-help',
          `${isActive ? this.drawing.entities.length : p.entities.length} obj · ${p.scale ?? this.drawing.scale ?? '1:1'}`,
        );
        button(row, isActive ? 'Active' : 'Open', () => {
          if (!isActive) this.switchPage(p.id);
          renderList();
        });
        if (!this.readOnly) {
          button(row, '↑', () => {
            this.transact('Move page up', (d) => moveDrawingPage(d, p.id, -1));
            renderList();
          });
          button(row, '↓', () => {
            this.transact('Move page down', (d) => moveDrawingPage(d, p.id, 1));
            renderList();
          });
          button(row, 'Duplicate', () => {
            this.switchPage(p.id);
            this.addNewPage(true, `${p.name} (Copy)`);
            renderList();
          });
          const delB = button(row, 'Delete', () => {
            this.transact('Delete page', (d) => deleteDrawingPage(d, p.id));
            renderList();
          });
          delB.disabled = pages.length <= 1;
        }
      }
    };
    renderList();

    if (!this.readOnly) {
      const addRow = element(dialog, 'div', 'cad-actions');
      button(addRow, '+ New Blank Page', () => {
        this.addNewPage(false);
        renderList();
      });
      button(addRow, '+ Duplicate Current Page', () => {
        this.addNewPage(true);
        renderList();
      });
    }
  }

  /** Opens Find & Search modal highlighting every matching object AND its Layer/color/visibility. */
  openFindModal(): void {
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-modal-wide');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Find Objects and Layers');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    const header = element(dialog, 'div', 'cad-modal-header');
    element(header, 'h3', '', 'Find Objects, Text & Components (with Layer Highlight)');
    button(header, 'Close', finish);

    const controlsRow = element(dialog, 'div', 'cad-find-controls');
    const searchInp = element(controlsRow, 'input');
    searchInp.type = 'search';
    searchInp.placeholder = 'Search text, TAG (XV1), symbol name, or layer name…';
    searchInp.setAttribute('aria-label', 'Search drawing query');

    const layerSel = choice(
      controlsRow,
      [['ALL', 'All layers'], ...this.drawing.layers.map((l): [string, string] => [l.id, l.name])],
      'ALL',
      () => renderResults(),
    );
    layerSel.setAttribute('aria-label', 'Filter search by layer');

    const resultsBox = element(dialog, 'div', 'cad-find-results');
    const renderResults = (): void => {
      resultsBox.replaceChildren();
      const matches: SearchMatch[] = searchDrawing(this.drawing, searchInp.value, layerSel.value);
      element(
        resultsBox,
        'p',
        'cad-help',
        `${matches.length} match${matches.length === 1 ? '' : 'es'} found across schematic`,
      );
      for (const m of matches.slice(0, 120)) {
        const item = element(resultsBox, 'div', 'cad-find-row');
        const info = element(item, 'div', 'cad-find-info');
        element(info, 'strong', '', m.summary);
        const layerPill = element(info, 'span', 'cad-layer-badge');
        const dot = element(layerPill, 'span', 'cad-color-dot');
        dot.style.background = aciColor(m.layerColor, '#888');
        element(
          layerPill,
          'span',
          '',
          `Layer: ${m.layerName}${!m.layerVisible ? ' (HIDDEN)' : ''}${m.layerLocked ? ' (LOCKED)' : ''}`,
        );
        if ((this.drawing.pages?.length ?? 0) > 1) {
          element(info, 'span', 'cad-find-page-badge', m.pageName);
        }
        element(info, 'span', 'cad-help', `Matched in: ${m.matchedField}`);

        const actions = element(item, 'div', 'cad-actions');
        if (!m.layerVisible && !this.readOnly) {
          button(actions, 'Show Layer', () => {
            this.transact('Show layer from search', (d) => {
              const l = d.layers.find((lay) => lay.id === m.layerId);
              if (l) l.visible = true;
            });
            renderResults();
          });
        }
        button(actions, 'Go to & Select', () => {
          if (
            this.drawing.pages?.length &&
            m.pageId !== this.drawing.activePageId &&
            !this.readOnly
          ) {
            this.switchPage(m.pageId);
          }
          const ent = this.drawing.entities.find((e) => e.id === m.entityId);
          if (ent) {
            this.selected = new Set([ent.id]);
            this.highlightId = ent.id;
            const b = entityBounds(this.drawing, ent);
            this.renderer.camera.fit({
              minX: b.minX - 25,
              minY: b.minY - 25,
              maxX: b.maxX + 25,
              maxY: b.maxY + 25,
            });
            this.selectedTab = 'properties';
            this.renderSide();
            this.updateSelectionBar();
            this.render();
            this.say(
              `Highlighted ${m.summary} on Layer "${m.layerName}"${!m.layerVisible ? ' (layer is currently hidden)' : ''}`,
              !m.layerVisible,
            );
          }
          finish();
        });
      }
    };
    searchInp.addEventListener('input', renderResults);
    renderResults();
    searchInp.focus();
  }

  /** Opens Print & Standard Paper Scaling modal to rescale the drawing to fit any ISO/ANSI paper format. */
  openPrintModal(): void {
    this.modalClose?.();
    const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
      dialog = element(backdrop, 'div', 'cad-modal cad-modal-wide');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Print & Standard Sheet Scaling');

    const finish = (): void => {
      backdrop.remove();
      this.modalClose = undefined;
      if (!this.disposed) this.canvas.focus();
    };
    this.modalClose = finish;

    const header = element(dialog, 'div', 'cad-modal-header');
    element(header, 'h3', '', 'Print / Rescale Drawing to Standard Paper');
    button(header, 'Close', finish);

    const setup = this.drawing.sheet ?? {
      size: 'A3' as SheetSize,
      orientation: 'landscape' as SheetOrientation,
      scale: this.drawing.scale ?? '1:1',
      marginMm: 10,
    };
    let paperSize: SheetSize = setup.size;
    let orientation: SheetOrientation | 'auto' = 'auto';
    let fitMode: 'fit' | 'fit_snap' | 'true_scale' | 'custom_scale' = 'fit';
    let marginMm = setup.marginMm ?? 10;
    let allPages = true;

    const sizeSel = choice(
      element(dialog, 'label', 'cad-field', 'Standard Paper Format'),
      Object.entries(SHEET_DIMENSIONS_MM).map(([k, v]) => [k, v.label]),
      paperSize,
      (v) => {
        paperSize = v as SheetSize;
        refreshPreview();
      },
    );
    sizeSel.setAttribute('aria-label', 'Print paper size');

    const orientSel = choice(
      element(dialog, 'label', 'cad-field', 'Orientation'),
      [
        ['auto', 'Auto (Best Fit)'],
        ['landscape', 'Landscape (Horizontal)'],
        ['portrait', 'Portrait (Vertical)'],
      ],
      orientation,
      (v) => {
        orientation = v as SheetOrientation | 'auto';
        refreshPreview();
      },
    );
    orientSel.setAttribute('aria-label', 'Print orientation');

    const marginField = element(
      dialog,
      'label',
      'cad-field',
      'Symmetric Margins (mm, all 4 sides)',
    );
    const marginInput = element(marginField, 'input');
    marginInput.type = 'number';
    marginInput.min = '0';
    marginInput.max = '100';
    marginInput.step = '1';
    marginInput.value = String(marginMm);
    marginInput.setAttribute('aria-label', 'Print margins mm');
    marginInput.addEventListener('change', () => {
      const m = Number(marginInput.value);
      if (Number.isFinite(m) && m >= 0 && m <= 100) {
        marginMm = m;
        refreshPreview();
      } else {
        marginInput.value = String(marginMm);
      }
    });

    const curDrawScale = this.drawing.scale ?? setup.scale ?? '1:1';
    const modeSel = choice(
      element(dialog, 'label', 'cad-field', 'Print Rescaling Mode'),
      [
        ['fit', 'Fit contents to paper (Auto-fit, keep title block readable)'],
        ['fit_snap', 'Fit & snap to standard engineering scale (1:1, 1:2, 1:5…)'],
        ['true_scale', 'True scale (1:1 physical mm)'],
        ['custom_scale', `Custom / Drawing scale (${curDrawScale})`],
      ],
      fitMode,
      (v) => {
        fitMode = v as 'fit' | 'fit_snap' | 'true_scale' | 'custom_scale';
        refreshPreview();
      },
    );
    modeSel.setAttribute('aria-label', 'Print scaling mode');

    if ((this.drawing.pages?.length ?? 0) > 1) {
      const scopeLbl = element(
        dialog,
        'label',
        'cad-checkbox',
        'Export all pages into multi-page PDF',
      );
      const scopeChk = element(scopeLbl, 'input');
      scopeChk.type = 'checkbox';
      scopeChk.checked = allPages;
      scopeChk.addEventListener('change', () => {
        allPages = scopeChk.checked;
      });
    }

    const previewLine = element(dialog, 'p', 'cad-help', '');
    const refreshPreview = (): void => {
      const b = this.drawingContentBounds(this.drawing);
      const fit = bestPrintFit(b, paperSize, orientation, marginMm, fitMode === 'fit_snap');
      previewLine.textContent =
        fitMode === 'true_scale'
          ? `Paper: ${paperSize} (${fit.orientation}, ${fit.paperMm.width}×${fit.paperMm.height} mm · Margins ${marginMm} mm) · Scale: 1:1`
          : fitMode === 'custom_scale'
            ? `Paper: ${paperSize} (${fit.orientation}, ${fit.paperMm.width}×${fit.paperMm.height} mm · Margins ${marginMm} mm) · Scale: ${curDrawScale}`
            : `Adapted for Print: ${paperSize} (${fit.orientation}, ${fit.paperMm.width}×${fit.paperMm.height} mm · Margins ${marginMm} mm) · Scale ≈ ${fit.scaleLabel} (title block proportions preserved)`;
    };
    refreshPreview();

    const actions = element(dialog, 'div', 'cad-actions');
    if (!this.readOnly) {
      button(actions, 'Fit Sheet Frame to Drawing (keep mm coordinates)', () => {
        const b = this.drawingContentBounds(this.drawing);
        const snapStd = fitMode === 'fit_snap';
        let nextLabel = curDrawScale;
        let nextOrient: SheetOrientation = 'landscape';
        this.transact('Fit sheet format for print', (d) => {
          const sh = ensureSheetSetup(d, this.host.documentName);
          sh.enabled = true;
          sh.titleBlockMode = 'real';
          if (fitMode === 'true_scale' || fitMode === 'custom_scale') {
            const targetScale = fitMode === 'true_scale' ? '1:1' : curDrawScale;
            const fit = fitSheetToDrawing(d, b, {
              size: paperSize,
              orientation,
              marginMm,
              snapToStandard: false,
            });
            d.scale = targetScale;
            sh.scale = targetScale;
            sh.titleBlock.scale = targetScale;
            nextOrient = fit.orientation;
            nextLabel = targetScale;
          } else {
            const fit = fitSheetToDrawing(d, b, {
              size: paperSize,
              orientation,
              marginMm,
              snapToStandard: snapStd,
            });
            nextOrient = fit.orientation;
            nextLabel = fit.scaleLabel;
          }
        });
        this.fit();
        this.say(
          `Sheet adapted to ${paperSize} ${nextOrient} (scale ${nextLabel}, symmetric margins ${marginMm} mm).`,
        );
        refreshPreview();
      });
    }
    button(actions, 'Export Standard Print PDF', () => {
      finish();
      this.run(async () => {
        const bytes = new PdfExporter().exportBytes(this.drawing, {
          title: this.host.documentName,
          paperSize,
          orientation,
          marginMm,
          fitToPage: fitMode === 'fit' || fitMode === 'fit_snap',
          snapToStandardScale: fitMode === 'fit_snap',
          trueScale: fitMode === 'true_scale',
          customScale: fitMode === 'custom_scale' ? curDrawScale : undefined,
          allPages,
        });
        if (this.host.exportPdf) await this.host.exportPdf(bytes, this.drawing);
        else this.say(`Print-ready Vector PDF generated (${bytes.byteLength} bytes).`, true);
      });
    });
  }

  private toggleNumeric(): void {
    if (this.numeric) {
      this.numeric.remove();
      this.numeric = undefined;
      return;
    }
    const pad = element(this.stage, 'div', 'cad-numpad');
    this.numeric = pad;
    element(pad, 'strong', '', 'Precision input (mm / deg)');
    const input = element(pad, 'input');
    input.type = 'text';
    input.inputMode = 'none';
    input.setAttribute('aria-label', 'Numeric value or coordinates');
    input.placeholder = '@100<90 or 10,20';
    const keys = element(pad, 'div', 'cad-number-keys');
    for (const key of ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '-', '@', ',', '<'])
      button(keys, key, () => {
        input.value += key;
      });
    button(keys, '⌫', () => (input.value = input.value.slice(0, -1)));
    button(pad, 'Apply', () => {
      this.executeCommand(input.value);
      input.value = '';
    });
    button(pad, 'Close', () => this.toggleNumeric());
  }

  form(title: string, fields: Field[]): Promise<Record<string, string> | undefined> {
    this.modalClose?.();
    return new Promise((resolve) => {
      const backdrop = element(this.root, 'div', 'cad-modal-backdrop'),
        form = element(backdrop, 'form', 'cad-modal');
      form.setAttribute('role', 'dialog');
      form.setAttribute('aria-modal', 'true');
      form.setAttribute('aria-label', title);
      element(form, 'h3', '', title);
      const inputs = new Map<string, HTMLInputElement>();
      for (const f of fields) {
        const label = element(form, 'label', 'cad-field', f.label),
          input = element(label, 'input');
        input.type = f.type ?? 'text';
        input.step = 'any';
        input.value = f.value;
        inputs.set(f.key, input);
      }
      const finish = (value?: Record<string, string>): void => {
        backdrop.remove();
        this.modalClose = undefined;
        resolve(value);
        if (!this.disposed) this.canvas.focus();
      };
      const actions = element(form, 'div', 'cad-actions');
      button(actions, 'Cancel', () => finish());
      const submit = element(actions, 'button', '', 'Apply');
      submit.type = 'submit';
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        finish(Object.fromEntries([...inputs].map(([k, i]) => [k, i.value])));
      });
      form.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Escape') finish();
        if (e.key === 'Tab') {
          const focusable = [...form.querySelectorAll<HTMLElement>('input,button')],
            at = focusable.indexOf(form.ownerDocument.activeElement as HTMLElement);
          if (e.shiftKey && at === 0) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          } else if (!e.shiftKey && at === focusable.length - 1) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      });
      this.modalClose = () => finish();
      inputs.values().next().value?.focus();
    });
  }
}
