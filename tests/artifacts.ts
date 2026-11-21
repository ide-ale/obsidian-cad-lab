import { fixture } from './fixture';
import { DxfExporter } from '../src/io/dxf';
import { writeMarkdown } from '../src/io/markdown';
import { toSvg } from '../src/render/renderer';
const d = fixture();
console.log(
  JSON.stringify({
    dxf: new DxfExporter().export(d),
    markdown: writeMarkdown(
      d,
      '# P&ID Example\n\nPump P-101 and control valve FV-101 connected via ports.\n',
    ),
    svg: toSvg(d),
    drawing: d,
  }),
);
