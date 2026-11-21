import { Drawing, Entity, Point, emptyDrawing } from '../src/core/model';
import { builtinLibrary } from '../src/core/library';
import { updateWires } from '../src/core/geometry';
const line = (id: string, a: Point, b: Point): Entity => ({
  id,
  layer: '0',
  type: 'line',
  a,
  b,
});
export const fixture = (): Drawing => {
  const d = emptyDrawing(builtinLibrary());
  d.entities = [
    {
      id: 'pump',
      type: 'insert',
      layer: '0',
      block: 'pid-pump',
      position: { x: -30, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      attributes: { TAG: 'P-101', VALORE: '4 kW', DESCRIZIONE: 'Water' },
    },
    {
      id: 'valve',
      type: 'insert',
      layer: '0',
      block: 'pid-control',
      position: { x: 30, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      attributes: { TAG: 'FV-101', VALORE: 'DN25', DESCRIZIONE: '' },
    },
    {
      id: 'wire',
      type: 'wire',
      layer: 'PIPES',
      points: [
        { x: -20, y: 0 },
        { x: 20, y: 0 },
      ],
      from: { insertId: 'pump', portId: 'OUT' },
      to: { insertId: 'valve', portId: 'IN' },
    },
    line('line', { x: -20, y: -20 }, { x: 50, y: -20 }),
    {
      id: 'poly',
      type: 'polyline',
      layer: 'SIGNALS',
      points: [
        { x: 0, y: 20 },
        { x: 10, y: 20 },
        { x: 10, y: 30 },
      ],
      closed: false,
    },
    {
      id: 'circle',
      type: 'circle',
      layer: '0',
      center: { x: 70, y: 0 },
      radius: 5,
    },
    {
      id: 'arc',
      type: 'arc',
      layer: '0',
      center: { x: 70, y: 20 },
      radius: 8,
      start: 300,
      end: 60,
    },
    {
      id: 'text',
      type: 'text',
      layer: '0',
      position: { x: 0, y: -30 },
      height: 4,
      rotation: 30,
      text: 'Diagram Δ – Ø25',
    },
  ];
  updateWires(d);
  return d;
};
