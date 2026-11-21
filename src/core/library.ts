import { extendedLibrary, enrichCategories } from './catalog';
import { Block, Entity, Point, Port } from './model';
/** Editable schematic symbols inspired by ISA/IEC conventions; not a licensed standards catalogue. */
export function builtinLibrary(): Block[] {
  const result: Block[] = [];
  let serial = 0;
  const base = () => ({ id: `symbol-${++serial}`, layer: '0' });
  const line = (x: number, y: number, X: number, Y: number): Entity => ({
    ...base(),
    type: 'line',
    a: { x, y },
    b: { x: X, y: Y },
  });
  const poly = (points: number[][], closed = false): Entity => ({
    ...base(),
    type: 'polyline',
    points: points.map(([x, y]) => ({ x, y })),
    closed,
  });
  const circle = (x: number, y: number, radius: number): Entity => ({
    ...base(),
    type: 'circle',
    center: { x, y },
    radius,
  });
  const text = (value: string, x = 0, y = 0, height = 3): Entity => ({
    ...base(),
    type: 'text',
    position: { x, y },
    text: value,
    height,
    rotation: 0,
  });
  const port = (id: string, x: number, y: number, dx: number, dy: number): Port => ({
    id,
    point: { x, y },
    direction: { x: dx, y: dy },
  });
  const lr = [port('IN', -10, 0, -1, 0), port('OUT', 10, 0, 1, 0)];
  const tb = [port('IN', 0, 10, 0, 1), port('OUT', 0, -10, 0, -1)];
  const add = (
    id: string,
    name: string,
    category: string,
    entities: Entity[],
    ports: Port[] = lr,
    tag = '',
  ): void => {
    result.push({
      id,
      name,
      category,
      entities,
      ports,
      attributes: { TAG: tag, VALUE: '', DESCRIPTION: '' },
    });
  };
  const pid = 'P&ID',
    iec = 'Electrical multi-line';
  const valve = () => [
    poly(
      [
        [-6, -4],
        [6, 4],
        [6, -4],
        [-6, 4],
      ],
      true,
    ),
    line(-10, 0, -6, 0),
    line(6, 0, 10, 0),
  ];
  add('pid-isolation', 'Isolation valve', pid, valve(), lr, 'HV');
  add(
    'pid-control',
    'Control valve',
    pid,
    [
      ...valve(),
      line(0, 0, 0, 8),
      poly(
        [
          [-4, 8],
          [-4, 10],
          [4, 10],
          [4, 8],
        ],
        true,
      ),
    ],
    lr,
    'FV',
  );
  add(
    'pid-check',
    'Check valve',
    pid,
    [
      poly(
        [
          [-5, -4],
          [4, 0],
          [-5, 4],
        ],
        true,
      ),
      line(5, -4, 5, 4),
      line(-10, 0, -5, 0),
      line(5, 0, 10, 0),
    ],
    lr,
    'NRV',
  );
  add(
    'pid-safety',
    'Safety valve',
    pid,
    [
      ...valve(),
      line(0, 0, 0, 5),
      poly([
        [-3, 5],
        [3, 6],
        [-3, 7],
        [3, 8],
        [-3, 9],
        [3, 10],
      ]),
      line(-4, 11, 4, 11),
    ],
    lr,
    'PSV',
  );
  add(
    'pid-threeway',
    'Three-way valve',
    pid,
    [
      ...valve(),
      poly(
        [
          [-4, -6],
          [0, 0],
          [4, -6],
        ],
        true,
      ),
      line(0, -6, 0, -10),
    ],
    [...lr, port('BRANCH', 0, -10, 0, -1)],
    'XV',
  );
  add(
    'pid-pump',
    'Centrifugal pump',
    pid,
    [
      circle(0, 0, 6),
      poly(
        [
          [-3, -4],
          [5, 0],
          [-3, 4],
        ],
        true,
      ),
      line(-10, 0, -6, 0),
      line(6, 0, 10, 0),
      line(-5, -7, 5, -7),
    ],
    lr,
    'P',
  );
  add(
    'pid-exchanger',
    'Heat exchanger',
    pid,
    [
      circle(0, 0, 7),
      poly([
        [-10, 0],
        [-5, 0],
        [-3, 4],
        [0, -4],
        [3, 4],
        [5, 0],
        [10, 0],
      ]),
    ],
    lr,
    'E',
  );
  add(
    'pid-tank',
    'Tank',
    pid,
    [
      poly(
        [
          [-7, -8],
          [-7, 6],
          [-4, 9],
          [4, 9],
          [7, 6],
          [7, -8],
        ],
        true,
      ),
      line(-10, 0, -7, 0),
      line(7, 0, 10, 0),
    ],
    lr,
    'V',
  );
  add(
    'pid-field',
    'Field instrument',
    pid,
    [circle(0, 0, 6), line(0, -6, 0, -10)],
    [port('SIGNAL', 0, -10, 0, -1)],
    'I',
  );
  add(
    'pid-panel',
    'Panel instrument',
    pid,
    [circle(0, 0, 6), line(-6, 0, 6, 0), line(0, -6, 0, -10)],
    [port('SIGNAL', 0, -10, 0, -1)],
    'I',
  );
  for (const code of ['PT', 'TT', 'FT', 'LT'])
    add(
      `pid-${code}`,
      `Transmitter ${code} (Blank bubble)`,
      pid,
      [circle(0, 0, 6), line(0, -6, 0, -10)],
      [port('PROCESS', 0, -10, 0, -1), port('SIGNAL', 0, 6, 0, 1)],
      code,
    );
  const breaker = (x = 0) => [
    line(x, 10, x, 4),
    line(x, -4, x, -10),
    line(x, -4, x + 4, 4),
    poly(
      [
        [x - 2, 4],
        [x + 2, 4],
        [x + 2, 6],
        [x - 2, 6],
      ],
      true,
    ),
  ];
  add('iec-breaker-1', 'Circuit breaker 1P', iec, breaker(), tb, 'Q');
  add(
    'iec-breaker-3',
    'Circuit breaker 3P',
    iec,
    [...breaker(-6), ...breaker(), ...breaker(6), { ...line(-8, 0, 10, 0), lineType: 'DASHED' }],
    [-6, 0, 6].flatMap((x, i) => [
      port(`L${i + 1}`, x, 10, 0, 1),
      port(`T${i + 1}`, x, -10, 0, -1),
    ]),
    'Q',
  );
  add(
    'iec-rcd',
    'Residual-current device',
    iec,
    [...breaker(), circle(0, 7, 2), text('ΔI', -7, -1, 2.5)],
    tb,
    'Q',
  );
  add(
    'iec-disconnector',
    'Disconnector',
    iec,
    [
      line(0, 10, 0, 4),
      line(0, -10, 0, -4),
      line(0, -4, 4, 4),
      circle(0, 4, 0.6),
      circle(0, -4, 0.6),
    ],
    tb,
    'QS',
  );
  add(
    'iec-coil',
    'Contactor coil',
    iec,
    [
      poly(
        [
          [-5, -4],
          [5, -4],
          [5, 4],
          [-5, 4],
        ],
        true,
      ),
      line(0, 4, 0, 10),
      line(0, -4, 0, -10),
    ],
    tb,
    'K',
  );
  add(
    'iec-contact-no',
    'Normally open contact',
    iec,
    [line(0, 10, 0, 2), line(-4, 2, 4, 2), line(-4, -2, 4, -2), line(0, -2, 0, -10)],
    tb,
    'K',
  );
  add(
    'iec-contact-nc',
    'Normally closed contact',
    iec,
    [
      line(0, 10, 0, 2),
      line(-4, 2, 4, 2),
      line(-4, -2, 4, -2),
      line(0, -2, 0, -10),
      line(-4, -4, 4, 4),
    ],
    tb,
    'K',
  );
  add(
    'iec-thermal',
    'Thermal overload relay',
    iec,
    [
      line(0, 10, 0, 4),
      poly([
        [0, 4],
        [3, 4],
        [3, -4],
        [0, -4],
        [0, -10],
      ]),
      poly(
        [
          [-4, 5],
          [5, 5],
          [5, -5],
          [-4, -5],
        ],
        true,
      ),
    ],
    tb,
    'F',
  );
  add(
    'iec-motor',
    'Three-phase motor',
    iec,
    [circle(0, 0, 7), text('M', -2, 0, 4), text('3~', -2, -4, 2.5), line(0, 7, 0, 10)],
    [port('U', -3, 6.32, 0, 1), port('V', 0, 10, 0, 1), port('W', 3, 6.32, 0, 1)],
    'M',
  );
  add(
    'iec-transformer',
    'Transformer',
    iec,
    [circle(0, 3, 4), circle(0, -3, 4), line(0, 7, 0, 10), line(0, -7, 0, -10)],
    tb,
    'T',
  );
  add(
    'iec-terminal',
    'Terminal',
    iec,
    [circle(0, 0, 2), line(-10, 0, -2, 0), line(2, 0, 10, 0)],
    lr,
    'X',
  );
  add(
    'iec-earth',
    'Protective earth',
    iec,
    [line(0, 10, 0, 0), line(-5, 0, 5, 0), line(-3, -2, 3, -2), line(-1, -4, 1, -4)],
    [port('PE', 0, 10, 0, 1)],
    'PE',
  );
  return [...enrichCategories(result), ...extendedLibrary()];
}
