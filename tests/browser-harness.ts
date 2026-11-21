import { CadEditor } from '../src/ui/editor';
import { fixture } from './fixture';
import { DxfExporter } from '../src/io/dxf';
import { writeMarkdown } from '../src/io/markdown';
import { Drawing, emptyDrawing } from '../src/core/model';
import { builtinLibrary } from '../src/core/library';
import { toSvg } from '../src/render/renderer';
const root = document.getElementById('app')!;
const notices: string[] = [];
const counters = { converted: 0, editedInPlace: 0, saved: 0, created: 0 };
let editor: CadEditor;
function mount(d: Drawing, readOnly = false, dxfMode = readOnly): void {
  editor?.dispose();
  editor = new CadEditor(
    root,
    d,
    {
      documentName: dxfMode ? 'Test.dxf' : 'Test.cad.md',
      dxfMode,
      changed: () => {},
      notice: (m) => notices.push(m),
      newDrawing: async () => {
        counters.created++;
        mount(emptyDrawing(builtinLibrary()), false, false);
      },
      save: async () => {
        counters.saved++;
      },
      editDxfInPlace:
        dxfMode && readOnly
          ? async (drawing) => {
              counters.editedInPlace++;
              mount(drawing, false, false);
            }
          : undefined,
      setReadOnlyMode: (nextRo, drawing) => {
        mount(drawing, nextRo, dxfMode);
      },
      convert: dxfMode
        ? async (drawing) => {
            counters.converted++;
            mount(drawing, false, false);
          }
        : undefined,
      exportDxf: async () => {},
      exportSvg: async () => {},
      importLibrary: async () => fixture(),
      saveLibrary: async () => {},
    },
    readOnly,
    { theme: 'dark', tablet: false },
  );
  Object.assign(window, { cad: editor });
}
mount(fixture());
Object.assign(window, {
  cadNotices: notices,
  cadCounters: counters,
  cadFixture: fixture,
  cadEmpty: () => emptyDrawing(builtinLibrary()),
  cadReadOnly: () => mount(fixture(), true),
  cadEditable: () => mount(fixture(), false, false),
  cadArtifacts: () => ({
    dxf: new DxfExporter().export(fixture()),
    markdown: writeMarkdown(fixture(), '# P&ID example\n'),
    svg: toSvg(fixture()),
  }),
});
