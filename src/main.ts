/*
 * CAD-Lab — Portable millimeter vector CAD for Obsidian.
 * Copyright (c) 2026 Alessandro Abrami (ide-ale) <https://github.com/ide-ale>
 * Licensed under the MIT License. See LICENSE file for details.
 */
import {
  App,
  FuzzySuggestModal,
  MarkdownPostProcessorContext,
  MarkdownRenderChild,
  MarkdownView,
  Modal,
  Notice,
  Platform,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  TFolder,
  TextFileView,
  WorkspaceLeaf,
  normalizePath,
  parseYaml,
  stringifyYaml,
} from 'obsidian';
import {
  MiddleClickMode,
  RightClickMode,
  SHORTCUT_LABELS,
  ShortcutAction,
  WheelMode,
  defaultInputBindings,
  normalizeKeyCombo,
  sanitizeInputBindings,
} from './core/bindings';
import {
  Block,
  ConnectorRoutingMode,
  Drawing,
  LabelAnchor,
  LabelOrientation,
  emptyDrawing,
  validateDrawing,
} from './core/model';
import { supplementLibrary } from './core/catalog';
import { builtinLibrary } from './core/library';
import { DxfExporter, DxfImporter, mergeLibrary } from './io/dxf';
import { decodeDwgOrDxfText, inspectDwgBinary } from './io/dwg';
import { readMarkdown, writeMarkdown } from './io/markdown';
import { PdfExporter } from './io/pdf';
import { Theme, toSvg } from './render/renderer';
import { CadEditor, EditorHost, EditorSettings, button, element } from './ui/editor';
export const CAD_VIEW = 'cad-lab-view',
  DXF_VIEW = 'cad-lab-dxf-viewer';
const yaml = { parse: parseYaml, stringify: (v: unknown) => stringifyYaml(v) };
interface Settings extends Omit<EditorSettings, 'tablet'> {
  theme: Theme;
  tablet: boolean | null;
  mobileTablet?: boolean | null;
  libraryFolder: string;
}
function isTouchTabletDevice(): boolean {
  if (Platform.isMobile || Platform.isTablet) return true;
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1) {
    return /iPad|Macintosh|Android|Tablet/i.test(navigator.userAgent);
  }
  return false;
}
class FilePicker extends FuzzySuggestModal<TFile> {
  private selected?: TFile;
  constructor(
    app: App,
    private files: TFile[],
    private resolve: (file: TFile | undefined) => void,
  ) {
    super(app);
    this.setPlaceholder('Choose a CAD / DXF library file in the vault');
  }
  getItems(): TFile[] {
    return this.files;
  }
  getItemText(file: TFile): string {
    return file.path;
  }
  onChooseItem(file: TFile): void {
    this.selected = file;
  }
  onClose(): void {
    super.onClose();
    window.setTimeout(() => this.resolve(this.selected), 0);
  }
}
class FolderPicker extends FuzzySuggestModal<TFolder> {
  private selected?: TFolder;
  constructor(
    app: App,
    private resolve: (folder: TFolder | undefined) => void,
  ) {
    super(app);
    this.setPlaceholder('Browse & pick a Vault folder for CAD-Lab libraries…');
  }
  getItems(): TFolder[] {
    return this.app.vault
      .getAllLoadedFiles()
      .filter((f): f is TFolder => f instanceof TFolder)
      .sort((a, b) => a.path.localeCompare(b.path));
  }
  getItemText(folder: TFolder): string {
    return folder.path === '/' ? '/ (Vault Root)' : folder.path;
  }
  onChooseItem(folder: TFolder): void {
    this.selected = folder;
  }
  onClose(): void {
    super.onClose();
    window.setTimeout(() => this.resolve(this.selected), 0);
  }
}
class CadSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: CadPlugin,
  ) {
    super(app, plugin);
  }
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName('Canvas theme')
      .setDesc('Default color scheme for the CAD canvas.')
      .addDropdown((drop) =>
        drop
          .addOptions({
            adaptive: 'Obsidian Adaptive',
            dark: 'Technical Dark',
            light: 'Technical Paper',
            blueprint: 'Blueprint',
          })
          .setValue(this.plugin.settings.theme)
          .onChange(async (value) => {
            this.plugin.settings.theme = value as Theme;
            await this.plugin.saveData(this.plugin.settings);
          }),
      );
    new Setting(containerEl)
      .setName('Default grid spacing (mm)')
      .setDesc('Reference grid step in millimeters.')
      .addText((text) =>
        text.setValue(String(this.plugin.settings.gridStep ?? 1)).onChange(async (val) => {
          const n = Number(val);
          if (Number.isFinite(n) && n >= 0.001 && n <= 1e6) {
            this.plugin.settings.gridStep = n;
            await this.plugin.saveData(this.plugin.settings);
          }
        }),
      );
    new Setting(containerEl)
      .setName('Apple Pencil loupe delay (ms)')
      .setDesc('Hold duration before the pen magnifier opens (0 disables).')
      .addDropdown((drop) =>
        drop
          .addOptions({
            '0': 'Off',
            '600': '600 ms',
            '1200': '1200 ms (Recommended)',
            '1800': '1800 ms',
            '2500': '2500 ms',
          })
          .setValue(String(this.plugin.settings.penLoupeDelayMs ?? 1200))
          .onChange(async (val) => {
            this.plugin.settings.penLoupeDelayMs = Number(val);
            await this.plugin.saveData(this.plugin.settings);
          }),
      );
    const libSetting = new Setting(containerEl).setName('Library folder');
    const updateLibDesc = (): void => {
      const target = normalizePath(this.plugin.settings.libraryFolder || 'CAD Libraries');
      const exists = this.app.vault.getAbstractFileByPath(target) instanceof TFolder;
      libSetting.setDesc(
        exists
          ? `Vault folder: "${target}" (active in vault). Save & share .cad-library.json files here.`
          : `Vault folder: "${target}" (not created yet — click "Create folder" or pick an existing folder).`,
      );
    };
    updateLibDesc();
    let libInputEl: HTMLInputElement | undefined;
    libSetting
      .addText((text) => {
        libInputEl = text.inputEl;
        text
          .setPlaceholder('CAD Libraries')
          .setValue(this.plugin.settings.libraryFolder)
          .onChange(async (val) => {
            const clean = val.trim().replace(/^\/+|\/+$/g, '');
            if (clean && !clean.includes('..')) {
              this.plugin.settings.libraryFolder = clean;
              await this.plugin.saveData(this.plugin.settings);
              updateLibDesc();
            }
          });
      })
      .addButton((btn) =>
        btn.setButtonText('Browse…').onClick(() => {
          new FolderPicker(this.app, (folder) => {
            if (!folder) return;
            const chosen = folder.path === '/' ? 'CAD Libraries' : folder.path;
            this.plugin.settings.libraryFolder = chosen;
            if (libInputEl) libInputEl.value = chosen;
            void this.plugin.saveData(this.plugin.settings).then(() => {
              void this.plugin.refreshSharedLibraries();
              updateLibDesc();
              new Notice(`CAD-Lab library folder set to "${chosen}"`);
            });
          }).open();
        }),
      )
      .addButton((btn) =>
        btn
          .setButtonText('Create folder')
          .setCta()
          .onClick(async () => {
            const target = normalizePath(this.plugin.settings.libraryFolder || 'CAD Libraries');
            if (!target || target.includes('..')) {
              new Notice('Invalid vault folder path.');
              return;
            }
            await this.plugin.ensureFolder(target);
            await this.plugin.refreshSharedLibraries();
            updateLibDesc();
            new Notice(`Folder created in vault: ${target}`);
          }),
      );
    new Setting(containerEl)
      .setName('Post-draw measurement input tab')
      .setDesc(
        'Show an exact length/angle/radius adjustment tab immediately after drawing a line or shape (also toggleable from the bottom bar).',
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.postDrawMeasureTab ?? false).onChange(async (val) => {
          this.plugin.settings.postDrawMeasureTab = val;
          await this.plugin.saveData(this.plugin.settings);
        }),
      );

    new Setting(containerEl).setName('Symbol label defaults').setHeading();
    new Setting(containerEl)
      .setName('Default label position around symbol')
      .setDesc('Default anchor where block tags like XV-1 or P-1 appear relative to new symbols.')
      .addDropdown((drop) =>
        drop
          .addOptions({
            default: 'Default (Right / Top)',
            center: 'Center',
            top: 'Top side',
            bottom: 'Bottom side',
            left: 'Left side',
            right: 'Right side',
            'top-left': 'Top-Left corner',
            'top-right': 'Top-Right corner',
            'bottom-left': 'Bottom-Left corner',
            'bottom-right': 'Bottom-Right corner',
          })
          .setValue(this.plugin.settings.defaultLabelAnchor ?? 'default')
          .onChange(async (val) => {
            this.plugin.settings.defaultLabelAnchor = val as LabelAnchor;
            await this.plugin.saveData(this.plugin.settings);
          }),
      );
    new Setting(containerEl).setName('Default label text height (mm)').addText((text) =>
      text.setValue(String(this.plugin.settings.defaultTextHeight ?? 3)).onChange(async (val) => {
        const n = Number(val);
        if (Number.isFinite(n) && n > 0.2) {
          this.plugin.settings.defaultTextHeight = n;
          await this.plugin.saveData(this.plugin.settings);
        }
      }),
    );
    new Setting(containerEl).setName('Default label orientation').addDropdown((drop) =>
      drop
        .addOptions({
          horizontal: 'Horizontal (0°)',
          vertical: 'Vertical (90°)',
          follow: 'Follow block rotation',
        })
        .setValue(this.plugin.settings.defaultLabelOrientation ?? 'horizontal')
        .onChange(async (val) => {
          this.plugin.settings.defaultLabelOrientation = val as LabelOrientation;
          await this.plugin.saveData(this.plugin.settings);
        }),
    );

    new Setting(containerEl).setName('Dynamic port connectors').setHeading();
    new Setting(containerEl)
      .setName('Enable dynamic port connectors by default')
      .setDesc(
        'When active, lines & polylines snapped to symbol ports follow moved/rotated symbols.',
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.dynamicPortConnectors ?? false)
          .onChange(async (val) => {
            this.plugin.settings.dynamicPortConnectors = val;
            await this.plugin.saveData(this.plugin.settings);
          }),
      );
    new Setting(containerEl)
      .setName('Connector behavior on symbol move')
      .setDesc(
        'Choose whether straight attached lines convert into orthogonal polylines or stay straight.',
      )
      .addDropdown((drop) =>
        drop
          .addOptions({
            straight_to_polyline: 'Convert to orthogonal Polyline when diagonal',
            keep_original: 'Keep original Line stretched to port',
          })
          .setValue(this.plugin.settings.connectorRoutingMode ?? 'straight_to_polyline')
          .onChange(async (val) => {
            this.plugin.settings.connectorRoutingMode = val as ConnectorRoutingMode;
            await this.plugin.saveData(this.plugin.settings);
          }),
      );

    new Setting(containerEl).setName('Workspace panel docking').setHeading();
    new Setting(containerEl).setName('Tools ribbon position').addDropdown((drop) =>
      drop
        .addOptions({ left: 'Left', right: 'Right', top: 'Top', bottom: 'Bottom' })
        .setValue(this.plugin.settings.ribbonDock ?? 'left')
        .onChange(async (val) => {
          this.plugin.settings.ribbonDock = val as 'left' | 'right' | 'top' | 'bottom';
          await this.plugin.saveData(this.plugin.settings);
        }),
    );
    new Setting(containerEl).setName('Inspector panel position').addDropdown((drop) =>
      drop
        .addOptions({
          right: 'Right',
          left: 'Left',
          top: 'Top',
          bottom: 'Bottom',
          floating: 'Floating (Collapsible)',
        })
        .setValue(this.plugin.settings.panelDock ?? 'right')
        .onChange(async (val) => {
          this.plugin.settings.panelDock = val as 'right' | 'left' | 'top' | 'bottom' | 'floating';
          await this.plugin.saveData(this.plugin.settings);
        }),
    );

    const bindings = sanitizeInputBindings(this.plugin.settings.inputBindings);
    this.plugin.settings.inputBindings = bindings;

    new Setting(containerEl).setName('Mouse and wheel controls').setHeading();
    new Setting(containerEl).setName('Right-click behavior').addDropdown((drop) =>
      drop
        .addOptions({
          pan_or_finish: 'Right-drag pan / click finish (CAD Default)',
          repeat_last: 'Click repeats last command / finishes',
          context_menu: 'Show selection actions / cycle grips',
        })
        .setValue(bindings.mouse.rightClick)
        .onChange(async (val) => {
          bindings.mouse.rightClick = val as RightClickMode;
          await this.plugin.saveData(this.plugin.settings);
        }),
    );
    new Setting(containerEl).setName('Middle-button behavior').addDropdown((drop) =>
      drop
        .addOptions({
          pan: 'Pan canvas (CAD Default)',
          zoom_extents: 'Zoom Extents (Fit Drawing)',
          finish: 'Finish active command',
        })
        .setValue(bindings.mouse.middleClick)
        .onChange(async (val) => {
          bindings.mouse.middleClick = val as MiddleClickMode;
          await this.plugin.saveData(this.plugin.settings);
        }),
    );
    new Setting(containerEl).setName('Mouse wheel mode').addDropdown((drop) =>
      drop
        .addOptions({
          zoom: 'Zoom at cursor (CAD Default)',
          pan_vertical: 'Scroll / pan canvas',
        })
        .setValue(bindings.mouse.wheelMode)
        .onChange(async (val) => {
          bindings.mouse.wheelMode = val as WheelMode;
          await this.plugin.saveData(this.plugin.settings);
        }),
    );
    new Setting(containerEl).setName('Invert mouse wheel zoom').addToggle((toggle) =>
      toggle.setValue(bindings.mouse.invertWheelZoom).onChange(async (val) => {
        bindings.mouse.invertWheelZoom = val;
        await this.plugin.saveData(this.plugin.settings);
      }),
    );

    new Setting(containerEl).setName('Keyboard shortcuts').setHeading();
    for (const [action, label] of Object.entries(SHORTCUT_LABELS) as [ShortcutAction, string][]) {
      new Setting(containerEl).setName(label).addText((text) => {
        text.setValue(bindings.shortcuts[action] ?? '').setPlaceholder('Press key (e.g. F3)');
        text.inputEl.addEventListener('keydown', (ev) => {
          if (['Tab', 'Escape'].includes(ev.key)) return;
          ev.preventDefault();
          if (ev.key === 'Backspace' || ev.key === 'Delete') {
            text.setValue('');
            delete bindings.shortcuts[action];
          } else {
            const combo = normalizeKeyCombo(ev);
            if (combo) {
              text.setValue(combo);
              bindings.shortcuts[action] = combo;
            }
          }
          void this.plugin.saveData(this.plugin.settings);
        });
      });
    }

    new Setting(containerEl).setName('Custom command abbreviations').setHeading();
    new Setting(containerEl)
      .setName('Alias mappings')
      .setDesc('One per line: ALIAS=COMMAND (e.g. LN=LINE, OF=OFFSET, SC=SCALE, MA=MATCHPROP).')
      .addTextArea((area) => {
        area.inputEl.rows = 4;
        area
          .setValue(
            Object.entries(bindings.customAliases)
              .map(([k, v]) => `${k}=${v}`)
              .join('\n'),
          )
          .onChange(async (val) => {
            const nextAliases: Record<string, string> = {};
            for (const line of val.split(/\r?\n/)) {
              const parts = line.split(/[=:]/);
              if (parts.length >= 2) {
                const k = parts[0].trim().toUpperCase();
                const v = parts[1].trim().toUpperCase();
                if (k && v) nextAliases[k] = v;
              }
            }
            bindings.customAliases = nextAliases;
            await this.plugin.saveData(this.plugin.settings);
          });
      });

    new Setting(containerEl).setName('Reset shortcuts & mouse defaults').addButton((btn) =>
      btn.setButtonText('Reset defaults').onClick(async () => {
        this.plugin.settings.inputBindings = defaultInputBindings();
        await this.plugin.saveData(this.plugin.settings);
        this.display();
      }),
    );
  }
}
class CadEmbed extends MarkdownRenderChild {
  private sequence = 0;
  constructor(
    el: HTMLElement,
    private plugin: CadPlugin,
    private file: TFile,
  ) {
    super(el);
  }
  onload(): void {
    this.registerEvent(
      this.plugin.app.vault.on('modify', (file) => {
        if (file === this.file) void this.render();
      }),
    );
    this.registerEvent(
      this.plugin.app.vault.on('rename', (file) => {
        if (file === this.file) void this.render();
      }),
    );
    this.registerEvent(
      this.plugin.app.vault.on('delete', (file) => {
        if (file === this.file) {
          this.sequence++;
          this.containerEl.textContent = 'CAD drawing deleted';
        }
      }),
    );
    void this.render();
  }
  onunload(): void {
    this.sequence++;
  }
  private async render(): Promise<void> {
    const sequence = ++this.sequence;
    try {
      const source = await this.plugin.app.vault.cachedRead(this.file);
      if (sequence !== this.sequence) return;
      const d = readMarkdown(source).drawing;
      this.containerEl.replaceChildren();
      this.containerEl.classList.add('cad-embed');
      const image = element(this.containerEl, 'img');
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(d))}`;
      image.alt = this.file.basename;
      image.addEventListener('dblclick', () => void this.plugin.openCad(this.file));
      const caption = button(
        this.containerEl,
        `Open ${this.file.basename}`,
        () => void this.plugin.openCad(this.file),
      );
      caption.className = 'cad-embed-open';
    } catch (error) {
      if (sequence === this.sequence) this.containerEl.textContent = `CAD: ${message(error)}`;
    }
  }
}
function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
export class CadView extends TextFileView {
  editor?: CadEditor;
  private source = '';
  private invalid = false;
  private dxfEditable = false;
  private dxfWarnings: string[] = [];
  constructor(
    leaf: WorkspaceLeaf,
    private plugin: CadPlugin,
    readonly readOnly = false,
  ) {
    super(leaf);
  }
  get isEditableMode(): boolean {
    return !this.readOnly || this.dxfEditable;
  }
  getViewType(): string {
    return this.readOnly ? DXF_VIEW : CAD_VIEW;
  }
  getDisplayText(): string {
    return this.file?.basename ?? (this.readOnly ? 'DXF' : 'CAD');
  }
  getIcon(): string {
    return 'drafting-compass';
  }
  canAcceptExtension(ext: string): boolean {
    return this.readOnly ? ext === 'dxf' || ext === 'dwg' : ext === 'md';
  }
  async onOpen(): Promise<void> {
    this.contentEl.classList.add('cad-view-content');
    if (!this.readOnly)
      this.addAction('file-text', 'Switch to Markdown', () => {
        void this.plugin.switchToMarkdown(this).catch((e) => new Notice(message(e)));
      });
    this.addAction('maximize', 'CAD full screen', () => this.editor?.toggleFullscreen());
  }
  getViewData(): string {
    if (this.invalid || !this.editor) return this.source;
    if (!this.readOnly) return writeMarkdown(this.editor.drawing, this.source, yaml);
    if (this.dxfEditable) return new DxfExporter().export(this.editor.drawing);
    return this.source;
  }
  private buildEditorHost(
    frontmatter?: Record<string, unknown>,
    allowDirectDxf = false,
  ): EditorHost {
    return {
      documentName: this.file?.name,
      frontmatter,
      newDrawing: () => this.plugin.createDrawing(),
      save: () => this.save(),
      changed: () => {
        if (this.isEditableMode) this.requestSave();
      },
      notice: (text) => new Notice(text),
      exportDxf: (d) => this.plugin.exportDxf(d, this.file),
      exportSvg: (svg) => this.plugin.exportSvg(svg, this.file),
      exportPdf: (bytes) => this.plugin.exportPdf(bytes, this.file),
      importLibrary: () => this.plugin.pickExternalLibrary(),
      saveLibrary: (d) => this.plugin.saveLibrary(d),
      editDxfInPlace:
        allowDirectDxf && this.readOnly && !this.dxfEditable
          ? (d) => this.enableDirectDxfEdit(d)
          : undefined,
      convert: (d) => this.plugin.convert(d, this.file, this.leaf),
      insertPresetYaml: (d) => {
        if (this.readOnly) {
          new Notice('Markdown YAML properties require a .cad.md note. Use Convert to .cad.md.');
          return;
        }
        this.source = writeMarkdown(d, this.source, yaml, { includePresetProperties: true });
        this.editor?.setFrontmatter(readMarkdown(this.source, yaml).frontmatter);
        this.requestSave();
      },
      saveFrontmatter: (nextFm, d) => {
        if (this.readOnly) {
          new Notice('Markdown YAML properties require a .cad.md note. Use Convert to .cad.md.');
          return;
        }
        this.source = writeMarkdown(d, this.source, yaml, { frontmatterOverride: nextFm });
        this.editor?.setFrontmatter(readMarkdown(this.source, yaml).frontmatter);
        this.requestSave();
      },
      settingsChanged: (s) => {
        const { tablet, ...rest } = s;
        const updated: Partial<Settings> = { ...rest };
        if (typeof tablet === 'boolean') {
          if (isTouchTabletDevice()) updated.mobileTablet = tablet;
          else updated.tablet = tablet;
        }
        this.plugin.settings = { ...this.plugin.settings, ...updated };
        void this.plugin.saveData(this.plugin.settings);
      },
    };
  }
  private editorSettings(): EditorSettings {
    return {
      ...this.plugin.settings,
      theme: this.plugin.settings.theme,
      penOnly: this.plugin.settings.penOnly ?? true,
      tablet: isTouchTabletDevice()
        ? (this.plugin.settings.mobileTablet ?? true)
        : (this.plugin.settings.tablet ?? false),
    };
  }
  private mountEditor(
    drawing: Drawing,
    warnings: string[],
    frontmatter?: Record<string, unknown>,
    allowDirectDxf = false,
  ): void {
    this.editor?.dispose();
    this.contentEl.replaceChildren();
    this.editor = new CadEditor(
      this.contentEl,
      drawing,
      this.buildEditorHost(frontmatter, allowDirectDxf),
      !this.isEditableMode,
      this.editorSettings(),
    );
    if (warnings.length) {
      const note = element(this.contentEl, 'div', 'cad-import-warnings', warnings.join('\n'));
      note.setAttribute('role', 'status');
    }
  }
  async enableDirectDxfEdit(drawing: Drawing): Promise<void> {
    if (!this.file || this.file.extension.toLowerCase() !== 'dxf') return;
    const activate = (): void => {
      this.dxfEditable = true;
      const prepared = supplementLibrary(drawing, this.plugin.allCatalogBlocks());
      this.mountEditor(prepared, this.dxfWarnings, undefined, false);
      new Notice(
        `Direct DXF editing enabled on ${this.file?.name}. Changes save in DXF R2010 format (single sheet, no Markdown BOM).`,
        6500,
      );
    };
    if (!this.dxfWarnings.length) {
      activate();
      return;
    }
    const confirmed = await new Promise<string>((resolve) => {
      let settled = false;
      const done = (choice: string): void => {
        if (settled) return;
        settled = true;
        resolve(choice);
      };
      const modal = new (class extends Modal {
        onOpen(): void {
          const { contentEl } = this;
          contentEl.empty();
          element(contentEl, 'h3', '', 'Direct DXF editing warning');
          element(
            contentEl,
            'p',
            'cad-help',
            'This DXF contained unsupported entities on import. Saving directly over the original .dxf writes CAD-Lab DXF R2010 geometry and will drop unsupported entities.',
          );
          element(contentEl, 'pre', 'cad-import-warnings', this.warnings.join('\n'));
          const actions = element(contentEl, 'div', 'cad-actions');
          button(actions, 'Edit DXF directly (overwrite)', () => {
            done('direct');
            this.close();
          });
          const conv = button(actions, 'Convert to .cad.md…', () => {
            done('convert');
            this.close();
          });
          conv.classList.add('mod-cta');
          button(actions, 'Cancel', () => {
            done('cancel');
            this.close();
          });
        }
        onClose(): void {
          done('cancel');
        }
        constructor(
          app: App,
          private warnings: string[],
        ) {
          super(app);
        }
      })(this.app, this.dxfWarnings);
      modal.open();
    });
    if (confirmed === 'direct') activate();
    else if (confirmed === 'convert') await this.plugin.convert(drawing, this.file, this.leaf);
  }
  setViewData(data: string, clear: boolean): void {
    if (!clear && this.editor && data === this.getViewData()) {
      this.source = data;
      return;
    }
    if (clear) {
      this.dxfEditable = false;
      this.dxfWarnings = [];
    }
    this.source = data;
    this.data = data;
    this.invalid = false;
    this.contentEl.querySelectorAll('.cad-import-warnings').forEach((el) => el.remove());
    try {
      let drawing: Drawing,
        warnings: string[] = [],
        frontmatter: Record<string, unknown> | undefined;
      if (this.readOnly) {
        if (this.file && this.file.extension.toLowerCase() === 'dwg') {
          void this.openBinaryDwg(data);
          return;
        }
        const result = new DxfImporter().import(data);
        drawing = this.dxfEditable
          ? supplementLibrary(result.drawing, this.plugin.allCatalogBlocks())
          : result.drawing;
        warnings = result.warnings;
        this.dxfWarnings = warnings;
      } else {
        const parsed = readMarkdown(data, yaml);
        frontmatter = parsed.frontmatter;
        drawing = supplementLibrary(parsed.drawing, this.plugin.allCatalogBlocks());
        writeMarkdown(drawing, data, yaml);
      }
      if (this.editor && !clear) {
        this.editor.setFrontmatter(frontmatter);
        this.editor.load(drawing);
      } else {
        this.mountEditor(
          drawing,
          warnings,
          frontmatter,
          this.readOnly && this.file?.extension.toLowerCase() === 'dxf',
        );
      }
      if (warnings.length) {
        new Notice(
          `DXF imported with ${warnings.length} warnings. Review the details below the drawing.`,
          8000,
        );
      }
    } catch (error) {
      this.invalid = true;
      this.editor?.dispose();
      this.editor = undefined;
      this.contentEl.replaceChildren();
      element(this.contentEl, 'h3', '', 'Unable to open drawing');
      element(this.contentEl, 'p', '', message(error));
      element(this.contentEl, 'p', '', 'The original file has been preserved.');
      if (!this.readOnly)
        button(this.contentEl, 'Open as Markdown', () => void this.plugin.switchToMarkdown(this));
    }
  }
  private async openBinaryDwg(fallbackText: string): Promise<void> {
    if (!this.file) return;
    try {
      const buf = await this.app.vault.readBinary(this.file);
      const bytes = new Uint8Array(buf);
      const decoded = decodeDwgOrDxfText(bytes);
      if (decoded.text !== undefined) {
        const result = new DxfImporter().import(decoded.text);
        this.dxfWarnings = result.warnings;
        this.mountEditor(result.drawing, result.warnings, undefined, false);
        return;
      }
      const info = decoded.dwg ?? inspectDwgBinary(bytes);
      this.invalid = true;
      this.editor?.dispose();
      this.editor = undefined;
      this.contentEl.replaceChildren();
      const panel = element(this.contentEl, 'div', 'cad-dwg-inspector');
      element(panel, 'h3', '', `Binary AutoCAD DWG (${info.versionCode})`);
      element(
        panel,
        'p',
        'cad-help',
        `Detected ${info.release}${info.sectionCount ? ` · ${info.sectionCount} binary sections` : ''} · ${(bytes.length / 1024).toFixed(1)} KB.`,
      );
      if (info.previewDataUrl) {
        const img = element(panel, 'img', 'cad-dwg-preview');
        img.src = info.previewDataUrl;
        img.alt = `Embedded preview from ${this.file.name}`;
      }
      element(
        panel,
        'p',
        'cad-help',
        'Native binary DWG entity streams use proprietary Autodesk compression/encryption across R2004–R2024. Export to ASCII DXF (R2010–R2018) from AutoCAD, QCAD, BricsCAD, or ODA File Converter to view and edit full vector geometry inside Obsidian (Desktop & iPad).',
      );
    } catch {
      try {
        new DxfImporter().import(fallbackText);
      } catch (e) {
        this.invalid = true;
        this.contentEl.replaceChildren();
        element(this.contentEl, 'h3', '', 'Unable to open DWG');
        element(this.contentEl, 'p', '', message(e));
      }
    }
  }
  async save(clear?: boolean): Promise<void> {
    if (!this.isEditableMode || this.invalid) return;
    await super.save(clear);
  }
  clear(): void {
    this.editor?.dispose();
    this.editor = undefined;
    this.source = '';
    this.invalid = false;
    this.dxfEditable = false;
    this.dxfWarnings = [];
  }
  async onClose(): Promise<void> {
    if (this.editor) await this.save();
    this.editor?.dispose();
    this.editor = undefined;
  }
}
export default class CadPlugin extends Plugin {
  settings: Settings = {
    theme: 'adaptive',
    tablet: null,
    libraryFolder: 'CAD Libraries',
    postDrawMeasureTab: false,
  };
  private markdownOverride = new WeakMap<WorkspaceLeaf, string>();
  private switching = new WeakSet<WorkspaceLeaf>();
  private routingTimer: number | undefined;
  private unloading = false;
  private sharedCustomBlocks: Block[] = [];

  allCatalogBlocks(): Block[] {
    if (!this.sharedCustomBlocks.length) return builtinLibrary();
    const byId = new Map<string, Block>();
    for (const b of builtinLibrary()) byId.set(b.id, b);
    for (const b of this.sharedCustomBlocks) if (!byId.has(b.id)) byId.set(b.id, b);
    return [...byId.values()];
  }

  async refreshSharedLibraries(): Promise<void> {
    const folder = normalizePath(this.settings.libraryFolder || 'CAD Libraries');
    const prefix = `${folder}/`;
    const libs = this.app.vault
      .getFiles()
      .filter((f) => f.path.startsWith(prefix) && f.name.endsWith('.cad-library.json'));
    const collected = new Map<string, Block>();
    for (const file of libs) {
      try {
        const d = validateDrawing(JSON.parse(await this.app.vault.read(file)));
        for (const b of d.blocks) if (!collected.has(b.id)) collected.set(b.id, b);
      } catch {
        /* Skip malformed external library files without breaking startup */
      }
    }
    this.sharedCustomBlocks = [...collected.values()];
  }
  async onload(): Promise<void> {
    const stored: unknown = await this.loadData();
    if (stored && typeof stored === 'object') {
      const s = stored as Partial<Settings>;
      if (s.theme && ['adaptive', 'dark', 'light', 'blueprint'].includes(s.theme))
        this.settings.theme = s.theme;
      if (typeof s.tablet === 'boolean') this.settings.tablet = s.tablet;
      if (typeof s.mobileTablet === 'boolean') this.settings.mobileTablet = s.mobileTablet;
      for (const key of [
        'penOnly',
        'gridSnap',
        'ortho',
        'polar',
        'tracking',
        'dynamicInput',
        'postDrawMeasureTab',
      ] as const)
        if (typeof s[key] === 'boolean') this.settings[key] = s[key];
      if (s.inputBindings && typeof s.inputBindings === 'object')
        this.settings.inputBindings = sanitizeInputBindings(s.inputBindings);
      if (typeof s.polarAngle === 'number' && [15, 30, 45, 90].includes(s.polarAngle))
        this.settings.polarAngle = s.polarAngle;
      if (
        typeof s.gridStep === 'number' &&
        Number.isFinite(s.gridStep) &&
        s.gridStep >= 0.001 &&
        s.gridStep <= 1e6
      )
        this.settings.gridStep = s.gridStep;
      if (typeof s.libraryFolder === 'string' && !s.libraryFolder.includes('..'))
        this.settings.libraryFolder = s.libraryFolder;
      if (
        typeof s.penLoupeDelayMs === 'number' &&
        Number.isFinite(s.penLoupeDelayMs) &&
        s.penLoupeDelayMs >= 0 &&
        s.penLoupeDelayMs <= 5000
      )
        this.settings.penLoupeDelayMs = s.penLoupeDelayMs;
      if (s.ribbonDock && ['left', 'right', 'top', 'bottom'].includes(s.ribbonDock))
        this.settings.ribbonDock = s.ribbonDock;
      if (s.panelDock && ['right', 'left', 'top', 'bottom', 'floating'].includes(s.panelDock))
        this.settings.panelDock = s.panelDock;
      if (typeof s.panelFloatingCollapsed === 'boolean')
        this.settings.panelFloatingCollapsed = s.panelFloatingCollapsed;
      if (
        s.panelFloatingPos &&
        typeof s.panelFloatingPos.x === 'number' &&
        typeof s.panelFloatingPos.y === 'number'
      )
        this.settings.panelFloatingPos = {
          x: s.panelFloatingPos.x,
          y: s.panelFloatingPos.y,
        };
      if (s.defaultLabelAnchor) this.settings.defaultLabelAnchor = s.defaultLabelAnchor;
      if (typeof s.defaultTextHeight === 'number' && s.defaultTextHeight > 0.2)
        this.settings.defaultTextHeight = s.defaultTextHeight;
      if (
        s.defaultLabelOrientation &&
        ['horizontal', 'vertical', 'follow'].includes(s.defaultLabelOrientation)
      )
        this.settings.defaultLabelOrientation = s.defaultLabelOrientation;
      if (typeof s.dynamicPortConnectors === 'boolean')
        this.settings.dynamicPortConnectors = s.dynamicPortConnectors;
      if (
        s.connectorRoutingMode &&
        ['straight_to_polyline', 'keep_original'].includes(s.connectorRoutingMode)
      )
        this.settings.connectorRoutingMode = s.connectorRoutingMode;
    }
    this.addSettingTab(new CadSettingTab(this.app, this));
    this.registerView(CAD_VIEW, (leaf) => new CadView(leaf, this));
    this.registerView(DXF_VIEW, (leaf) => new CadView(leaf, this, true));
    try {
      this.registerExtensions(['dxf', 'dwg'], DXF_VIEW);
    } catch {
      /* Ignore if another plugin already registered .dxf/.dwg */
    }
    this.addRibbonIcon('drafting-compass', 'Create new CAD / P&ID drawing', () => {
      void this.createDrawing().catch((e) => new Notice(message(e)));
    });
    this.addCommand({
      id: 'create-drawing',
      name: 'Create new CAD / P&ID drawing',
      callback: () => this.createDrawing(),
    });
    this.addCommand({
      id: 'toggle-fullscreen',
      name: 'Toggle CAD full screen',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view?.editor) return false;
        if (!checking) view.editor.toggleFullscreen();
        return true;
      },
    });
    this.addCommand({
      id: 'open-library-manager',
      name: 'Open centralized library manager',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view?.editor || !view.isEditableMode) return false;
        if (!checking) view.editor.openLibraryManager();
        return true;
      },
    });
    this.addCommand({
      id: 'export-pdf',
      name: 'Export current CAD drawing to vector PDF in scale',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view?.editor) return false;
        if (!checking) {
          const bytes = new PdfExporter().exportBytes(view.editor.drawing, {
            title: view.file?.name,
          });
          void this.exportPdf(bytes, view.file);
        }
        return true;
      },
    });
    this.addCommand({
      id: 'find-in-drawing',
      name: 'Find objects, text & components in CAD drawing (with layer highlight)',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view?.editor) return false;
        if (!checking) view.editor.openFindModal();
        return true;
      },
    });
    this.addCommand({
      id: 'print-standard-sheet',
      name: 'Print or rescale drawing to standard paper format',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view?.editor) return false;
        if (!checking) view.editor.openPrintModal();
        return true;
      },
    });
    this.addCommand({
      id: 'edit-dxf',
      name: 'Edit current DXF as CAD',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view || view.isEditableMode || !view.editor) return false;
        if (!checking) void this.convert(view.editor.drawing, view.file, view.leaf);
        return true;
      },
    });
    this.addCommand({
      id: 'open-canvas',
      name: 'Open drawing in CAD view',
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file || !this.isCad(file)) return false;
        if (!checking) void this.openCad(file);
        return true;
      },
    });
    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file, _source, leaf) => {
        if (!(file instanceof TFile) || !this.isCad(file)) return;
        const targetLeaf = leaf ?? this.app.workspace.getMostRecentLeaf();
        if (targetLeaf?.view instanceof CadView) return;
        menu.addItem((item) =>
          item
            .setTitle('Open in CAD-Lab editor')
            .setIcon('drafting-compass')
            .setSection('action')
            .onClick(() => {
              void this.openCad(file, targetLeaf ?? undefined, true);
            }),
        );
      }),
    );
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, _ed, info) => {
        const file = info.file;
        if (!file || !this.isCad(file)) return;
        const leaf =
          info instanceof MarkdownView ? info.leaf : this.app.workspace.getMostRecentLeaf();
        menu.addItem((item) =>
          item
            .setTitle('Open in CAD-Lab editor')
            .setIcon('drafting-compass')
            .onClick(() => {
              void this.openCad(file, leaf ?? undefined, true);
            }),
        );
      }),
    );
    this.addCommand({
      id: 'import-dxf-library',
      name: 'Import vault DXF as block library',
      callback: async () => {
        const file = await new Promise<TFile | undefined>((resolve) =>
          new FilePicker(
            this.app,
            this.app.vault
              .getFiles()
              .filter((f) => ['dxf', 'dwg'].includes(f.extension.toLowerCase())),
            resolve,
          ).open(),
        );
        if (!file) return;
        try {
          const buf = await this.app.vault.readBinary(file);
          const decoded = decodeDwgOrDxfText(new Uint8Array(buf));
          if (!decoded.text) {
            throw new Error(
              `Binary AutoCAD DWG (${decoded.dwg?.versionCode ?? 'DWG'}) cannot be imported directly; export as ASCII DXF first.`,
            );
          }
          const result = new DxfImporter().import(decoded.text);
          if (result.warnings.length) new Notice(result.warnings.join('\n'), 12000);
          const view = this.app.workspace.getActiveViewOfType(CadView);
          if (view?.editor && view.isEditableMode)
            view.editor.stack.execute('Import DXF library', (d) => {
              mergeLibrary(d, result.drawing);
            });
          await this.saveLibrary(result.drawing);
        } catch (e) {
          new Notice(message(e));
        }
      },
    });
    this.addCommand({
      id: 'load-library',
      name: 'Load saved library into current drawing',
      callback: () => this.loadSavedLibrary(),
    });
    this.addCommand({
      id: 'switch-to-markdown',
      name: 'Switch to Markdown',
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(CadView);
        if (!view || view.readOnly) return false;
        if (!checking) void this.switchToMarkdown(view);
        return true;
      },
    });
    this.registerEvent(this.app.workspace.on('file-open', () => this.scheduleRoute()));
    this.registerEvent(this.app.workspace.on('layout-change', () => this.scheduleRoute()));
    this.registerEvent(
      this.app.workspace.on('css-change', () => {
        this.app.workspace.iterateAllLeaves((leaf) => {
          if (leaf.view instanceof CadView) leaf.view.editor?.render();
        });
      }),
    );
    this.registerEvent(
      this.app.metadataCache.on('changed', (file) => {
        if (this.isCad(file)) this.scheduleRoute();
      }),
    );
    this.app.workspace.onLayoutReady(() => {
      void this.ensureFolder(this.settings.libraryFolder || 'CAD Libraries')
        .catch(() => {})
        .finally(() => {
          void this.refreshSharedLibraries();
        });
      this.scheduleRoute();
    });
    const onLibChange = (f: unknown): void => {
      if (f instanceof TFile && f.name.endsWith('.cad-library.json')) {
        void this.refreshSharedLibraries();
      }
    };
    this.registerEvent(this.app.vault.on('create', onLibChange));
    this.registerEvent(this.app.vault.on('modify', onLibChange));
    this.registerEvent(this.app.vault.on('delete', onLibChange));
    this.registerEvent(this.app.vault.on('rename', onLibChange));
    this.registerMarkdownPostProcessor((el, ctx) => this.processEmbeds(el, ctx));
    try {
      this.registerMarkdownCodeBlockProcessor('cad-data', (source, el, ctx) => {
        const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
        if (file instanceof TFile && this.isCad(file)) {
          ctx.addChild(new CadEmbed(el, this, file));
        } else {
          try {
            const d = validateDrawing(JSON.parse(source));
            const img = element(el, 'img', 'cad-inline-svg');
            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toSvg(d))}`;
            img.alt = 'CAD drawing';
          } catch (e) {
            el.textContent = `CAD: ${message(e)}`;
          }
        }
      });
    } catch {
      /* Ignore if another active session registered cad-data processor */
    }
    this.register(() => {
      this.unloading = true;
      if (this.routingTimer !== undefined) window.clearTimeout(this.routingTimer);
    });
  }
  private isCad(file: TFile): boolean {
    const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;
    return (
      file.name.toLowerCase().endsWith('.cad.md') ||
      fm?.['obsidian-cad'] === true ||
      fm?.['cad-lab'] === true
    );
  }
  private scheduleRoute(): void {
    if (this.unloading) return;
    if (this.routingTimer !== undefined) window.clearTimeout(this.routingTimer);
    this.routingTimer = window.setTimeout(() => {
      this.routingTimer = undefined;
      this.app.workspace.iterateAllLeaves((leaf) => {
        const view = leaf.view;
        if (!(view instanceof MarkdownView) || !view.file || !this.isCad(view.file)) return;
        if (this.markdownOverride.get(leaf) === view.file.path || this.switching.has(leaf)) return;
        void this.openCad(view.file, leaf, false).catch((e) => new Notice(message(e)));
      });
    }, 80);
  }
  async openCad(
    file: TFile,
    leaf = this.app.workspace.getLeaf(false),
    active = true,
  ): Promise<void> {
    if (this.switching.has(leaf) || this.unloading) return;
    this.switching.add(leaf);
    this.markdownOverride.delete(leaf);
    try {
      await leaf.setViewState({
        type: ['dxf', 'dwg'].includes(file.extension.toLowerCase()) ? DXF_VIEW : CAD_VIEW,
        state: { file: file.path },
        active,
      });
    } finally {
      this.switching.delete(leaf);
    }
  }
  async switchToMarkdown(view: CadView): Promise<void> {
    if (!view.file) return;
    await view.save();
    const file = view.file,
      leaf = view.leaf;
    this.markdownOverride.set(leaf, file.path);
    await leaf.setViewState({
      type: 'markdown',
      state: { file: file.path, mode: 'source' },
      active: true,
    });
  }
  private async uniquePath(path: string): Promise<string> {
    const dot = path.endsWith('.cad.md') ? path.length - 7 : path.lastIndexOf('.'),
      stem = dot >= 0 ? path.slice(0, dot) : path,
      ext = dot >= 0 ? path.slice(dot) : '';
    let candidate = normalizePath(path),
      index = 1;
    while (this.app.vault.getAbstractFileByPath(candidate))
      candidate = normalizePath(`${stem} ${index++}${ext}`);
    return candidate;
  }
  private folder(file: TFile | null): string {
    return file?.parent?.path && file.parent.path !== '/' ? `${file.parent.path}/` : '';
  }
  async createDrawing(): Promise<void> {
    await this.refreshSharedLibraries();
    const date = new Date(),
      p = (n: number) => String(n).padStart(2, '0'),
      stamp = `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())} ${p(date.getHours())}${p(date.getMinutes())}`;
    const parent = this.folder(this.app.workspace.getActiveFile()),
      path = await this.uniquePath(`${parent}Drawing ${stamp}.cad.md`),
      file = await this.app.vault.create(
        path,
        writeMarkdown(emptyDrawing(this.allCatalogBlocks()), '', yaml),
      );
    await this.openCad(file);
  }
  private async saveExportFile(
    defaultPath: string,
    mimeType: string,
    payload: string | Uint8Array,
    label: string,
    ext: string,
  ): Promise<void> {
    const suggestedName = defaultPath.split('/').pop() || `Drawing.${ext}`;
    const win = window as unknown as {
      showSaveFilePicker?: (opts: unknown) => Promise<{
        createWritable(): Promise<{
          write(data: Blob | Uint8Array | string): Promise<void>;
          close(): Promise<void>;
        }>;
      }>;
    };

    const rawBytes: Uint8Array =
      typeof payload === 'string' ? new TextEncoder().encode(payload) : payload;
    const arrayBuf = rawBytes.buffer.slice(
      rawBytes.byteOffset,
      rawBytes.byteOffset + rawBytes.byteLength,
    ) as ArrayBuffer;

    if (typeof win.showSaveFilePicker === 'function') {
      try {
        const handle = await win.showSaveFilePicker({
          suggestedName,
          types: [
            {
              description: label,
              accept: { [mimeType]: [`.${ext}`] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(new Blob([arrayBuf], { type: mimeType }));
        await writable.close();
        new Notice(`${label} exported: ${suggestedName}`);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        // Fall through to cross-platform export modal if file picker isn't permitted
      }
    }

    const modal = new (class extends Modal {
      onOpen(): void {
        const { contentEl } = this;
        contentEl.empty();
        element(contentEl, 'h3', '', `Export ${label}`);
        element(
          contentEl,
          'p',
          'cad-help',
          'Save directly to device/Files (choose destination) or enter a target path inside this vault.',
        );
        const pathLbl = element(contentEl, 'label', 'cad-field', 'Vault target path');
        const pathInput = element(pathLbl, 'input');
        pathInput.type = 'text';
        pathInput.value = defaultPath;

        const actions = element(contentEl, 'div', 'cad-actions');
        const saveVaultCopy = async (rawTarget: string): Promise<string> => {
          const clean = normalizePath(rawTarget.trim() || defaultPath);
          const slash = clean.lastIndexOf('/');
          if (slash > 0) await ensureDir(clean.slice(0, slash));
          const finalPath = await unique(clean);
          if (typeof payload === 'string') {
            await this.app.vault.create(finalPath, payload);
          } else {
            await this.app.vault.createBinary(finalPath, arrayBuf);
          }
          return finalPath;
        };
        const deviceBtn = button(actions, 'Save to Device / Files…', async () => {
          const blob = new Blob([arrayBuf], { type: mimeType });
          const nav = navigator as Navigator & {
            canShare?: (d: { files: File[] }) => boolean;
            share?: (d: { files: File[]; title?: string }) => Promise<void>;
          };
          const shareCandidates = [mimeType, 'text/plain', 'application/octet-stream'];
          for (const tryMime of shareCandidates) {
            const fileObj = new File([blob], suggestedName, { type: tryMime });
            if (nav.share && (!nav.canShare || nav.canShare({ files: [fileObj] }))) {
              try {
                await nav.share({ files: [fileObj], title: suggestedName });
                this.close();
                return;
              } catch (e) {
                if (e instanceof DOMException && e.name === 'AbortError') return;
              }
            }
          }
          if (Platform.isMobile) {
            const savedPath = await saveVaultCopy(pathInput.value || defaultPath);
            new Notice(`${label} saved to vault (${savedPath}) — share via Files app.`, 6000);
            this.close();
            return;
          }
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = suggestedName;
          a.click();
          window.setTimeout(() => URL.revokeObjectURL(url), 4000);
          new Notice(`${label} downloaded: ${suggestedName}`);
          this.close();
        });
        deviceBtn.setAttribute('aria-label', 'Save to Device or Files');

        if (typeof payload === 'string') {
          button(actions, `Copy ${label} Text`, async () => {
            await navigator.clipboard.writeText(payload);
            new Notice(`${label} copied to clipboard.`);
          });
        }

        button(actions, 'Save to Vault Path', async () => {
          const finalPath = await saveVaultCopy(pathInput.value || defaultPath);
          new Notice(`${label} saved to vault: ${finalPath}`);
          this.close();
        });
      }
    })(this.app);
    const ensureDir = (dir: string) => this.ensureFolder(dir);
    const unique = (p: string) => this.uniquePath(p);
    modal.open();
  }

  async exportDxf(d: Drawing, file: TFile | null): Promise<void> {
    const defaultPath = `${this.folder(file)}${file?.basename.replace(/\.cad$/i, '') ?? 'Drawing'}.dxf`;
    await this.saveExportFile(
      defaultPath,
      'application/dxf',
      new DxfExporter().export(d),
      'DXF',
      'dxf',
    );
  }
  async exportSvg(svg: string, file: TFile | null): Promise<void> {
    const defaultPath = `${this.folder(file)}${file?.basename.replace(/\.cad$/i, '') ?? 'Drawing'}.svg`;
    await this.saveExportFile(defaultPath, 'image/svg+xml', svg, 'SVG', 'svg');
  }
  async exportPdf(bytes: Uint8Array, file: TFile | null): Promise<void> {
    const defaultPath = `${this.folder(file)}${file?.basename.replace(/\.cad$/i, '') ?? 'Drawing'}.pdf`;
    await this.saveExportFile(defaultPath, 'application/pdf', bytes, 'Vector PDF', 'pdf');
  }
  async convert(d: Drawing, file: TFile | null, leaf?: WorkspaceLeaf): Promise<void> {
    const counterpart = normalizePath(`${this.folder(file)}${file?.basename ?? 'Drawing'}.cad.md`);
    const existing = this.app.vault.getAbstractFileByPath(counterpart);
    let existingValid = false;
    if (existing instanceof TFile) {
      try {
        readMarkdown(await this.app.vault.read(existing), yaml);
        existingValid = true;
      } catch {
        existingValid = false;
      }
    }

    type ConvertChoice =
      'trash-dxf' | 'open-existing-trash' | 'open-existing' | 'keep-dxf' | 'cancel';
    const choice: ConvertChoice = file
      ? await new Promise<ConvertChoice>((resolve) => {
          let settled = false;
          const done = (c: ConvertChoice): void => {
            if (settled) return;
            settled = true;
            resolve(c);
          };
          const modal = new (class extends Modal {
            onOpen(): void {
              const { contentEl } = this;
              contentEl.empty();
              element(contentEl, 'h3', '', 'Convert DXF to CAD Markdown (.cad.md)');
              element(
                contentEl,
                'p',
                'cad-help',
                existing instanceof TFile
                  ? `A companion note (${counterpart}) already exists. Choose how to proceed without leaving duplicate files.`
                  : `Create ${counterpart} to unlock YAML properties, automatic BOM tables, and multi-page sheets.`,
              );
              const actions = element(contentEl, 'div', 'cad-actions');
              if (existing instanceof TFile && existingValid) {
                const openTrash = button(actions, 'Open existing & move DXF to Trash', () => {
                  done('open-existing-trash');
                  this.close();
                });
                openTrash.classList.add('mod-cta');
                button(actions, 'Open existing (keep DXF)', () => {
                  done('open-existing');
                  this.close();
                });
                button(actions, 'Overwrite .cad.md & move DXF to Trash', () => {
                  done('trash-dxf');
                  this.close();
                });
              } else {
                const primary = button(actions, 'Convert & move DXF to Trash', () => {
                  done('trash-dxf');
                  this.close();
                });
                primary.classList.add('mod-cta');
                button(actions, 'Convert & keep original DXF', () => {
                  done('keep-dxf');
                  this.close();
                });
              }
              button(actions, 'Cancel', () => {
                done('cancel');
                this.close();
              });
            }
            onClose(): void {
              done('cancel');
            }
          })(this.app);
          modal.open();
        })
      : existingValid
        ? 'open-existing'
        : 'keep-dxf';

    if (choice === 'cancel') return;

    const targetLeaf = leaf ?? this.app.workspace.getLeaf(false);
    if (
      (choice === 'open-existing' || choice === 'open-existing-trash') &&
      existing instanceof TFile
    ) {
      if (choice === 'open-existing-trash' && file) await this.app.fileManager.trashFile(file);
      await this.openCad(existing, targetLeaf);
      return;
    }

    const mdContent = writeMarkdown(supplementLibrary(d, this.allCatalogBlocks()), '', yaml);
    let targetFile: TFile;
    if (choice === 'trash-dxf' && existing instanceof TFile) {
      await this.app.vault.modify(existing, mdContent);
      targetFile = existing;
    } else {
      const path = existing instanceof TFile ? await this.uniquePath(counterpart) : counterpart;
      targetFile = await this.app.vault.create(path, mdContent);
    }
    if (choice === 'trash-dxf' && file) await this.app.fileManager.trashFile(file);
    await this.openCad(targetFile, targetLeaf);
  }
  async pickExternalLibrary(): Promise<Drawing | undefined> {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.dxf,.dwg,.json';
    input.style.display = 'none';
    document.body.append(input);
    return new Promise((resolve) => {
      let done = false;
      const finish = (d?: Drawing): void => {
        if (done) return;
        done = true;
        input.remove();
        resolve(d);
      };
      input.addEventListener(
        'change',
        () => {
          const file = input.files?.[0];
          if (!file) {
            finish();
            return;
          }
          void file
            .arrayBuffer()
            .then((buf) => {
              const bytes = new Uint8Array(buf);
              if (file.name.toLowerCase().endsWith('.json')) {
                const source = new TextDecoder('utf-8').decode(bytes);
                finish(validateDrawing(JSON.parse(source)));
                return;
              }
              const decoded = decodeDwgOrDxfText(bytes);
              if (!decoded.text) {
                throw new Error(
                  `Binary AutoCAD DWG (${decoded.dwg?.release ?? 'DWG'}) requires conversion to ASCII DXF (R2010+) before vector import.`,
                );
              }
              const result = new DxfImporter().import(decoded.text);
              if (result.warnings.length) new Notice(result.warnings.join('\n'), 12000);
              finish(result.drawing);
            })
            .catch((e) => {
              new Notice(message(e));
              finish();
            });
        },
        { once: true },
      );
      input.addEventListener('cancel', () => finish(), { once: true });
      this.register(() => finish());
      input.click();
    });
  }
  async ensureFolder(path: string): Promise<void> {
    const parts = normalizePath(path).split('/');
    let current = '';
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      if (!this.app.vault.getAbstractFileByPath(current))
        await this.app.vault.createFolder(current);
    }
  }
  async saveLibrary(d: Drawing): Promise<void> {
    await this.ensureFolder(this.settings.libraryFolder);
    const path = await this.uniquePath(`${this.settings.libraryFolder}/Library.cad-library.json`);
    await this.app.vault.create(path, JSON.stringify({ ...d, entities: [] }, null, 2));
    await this.refreshSharedLibraries();
    new Notice(`${d.blocks.length} blocks saved to ${path}`);
  }
  async loadSavedLibrary(): Promise<void> {
    const view = this.app.workspace.getActiveViewOfType(CadView);
    if (!view?.editor || view.readOnly) {
      new Notice('Open an editable CAD drawing first.');
      return;
    }
    const file = await new Promise<TFile | undefined>((resolve) =>
      new FilePicker(
        this.app,
        this.app.vault.getFiles().filter((f) => f.name.endsWith('.cad-library.json')),
        resolve,
      ).open(),
    );
    if (!file) return;
    try {
      const d = validateDrawing(JSON.parse(await this.app.vault.read(file)));
      view.editor.stack.execute('Load library', (target) => {
        mergeLibrary(target, d);
      });
    } catch (e) {
      new Notice(message(e));
    }
  }
  private processEmbeds(el: HTMLElement, ctx: MarkdownPostProcessorContext): void {
    for (const embed of el.querySelectorAll<HTMLElement>('.internal-embed')) {
      if (embed.dataset.cadEmbed === 'true') continue;
      const source = embed.getAttribute('src') ?? embed.getAttribute('data-src');
      if (!source) continue;
      const file = this.app.metadataCache.getFirstLinkpathDest(
        source.split('#')[0],
        ctx.sourcePath,
      );
      if (!file || !this.isCad(file)) continue;
      embed.dataset.cadEmbed = 'true';
      ctx.addChild(new CadEmbed(embed, this, file));
    }
  }
}
