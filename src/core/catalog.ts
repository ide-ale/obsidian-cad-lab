import { Block, Drawing, Entity, Port, clone } from './model';

/**
 * Editable vector schematic symbol catalog organized by international engineering standards:
 * - P&ID: ANSI/ISA-5.1, ISO 10628, ISO 14617
 * - Electrical (Multi-line & Single-line): IEC 60617, ANSI Y32 (IEEE 315), NFPA 79
 * - General: ISO 128
 */
export function extendedLibrary(): Block[] {
  const out: Block[] = [];
  let serial = 0;
  const base = () => ({ id: `catalog-${++serial}`, layer: '0' });
  const l = (x: number, y: number, a: number, b: number): Entity => ({
    ...base(),
    type: 'line',
    a: { x, y },
    b: { x: a, y: b },
  });
  const p = (ps: number[][], closed = false): Entity => ({
    ...base(),
    type: 'polyline',
    points: ps.map(([x, y]) => ({ x, y })),
    closed,
  });
  const c = (x: number, y: number, radius: number): Entity => ({
    ...base(),
    type: 'circle',
    center: { x, y },
    radius,
  });
  const arc = (x: number, y: number, radius: number, start: number, end: number): Entity => ({
    ...base(),
    type: 'arc',
    center: { x, y },
    radius,
    start,
    end,
  });
  const t = (text: string, x = -3, y = 0, height = 3): Entity => ({
    ...base(),
    type: 'text',
    position: { x, y },
    text,
    height,
    rotation: 0,
  });
  const port = (id: string, x: number, y: number, dx: number, dy: number): Port => ({
    id,
    point: { x, y },
    direction: { x: dx, y: dy },
  });
  const lr = [port('IN', -10, 0, -1, 0), port('OUT', 10, 0, 1, 0)],
    tb = [port('IN', 0, 10, 0, 1), port('OUT', 0, -10, 0, -1)];
  const add = (
    id: string,
    name: string,
    library: string,
    group: string,
    entities: Entity[],
    ports: Port[] = lr,
    tag = '',
    standard?: string,
  ): void => {
    const resolvedStandard =
      standard ??
      (library === 'P&ID'
        ? group.includes('instrument') || group.includes('ISA')
          ? 'ANSI/ISA-5.1'
          : group.includes('Equipment') || group.includes('ISO 10628')
            ? 'ISO 10628'
            : 'ISO 14617'
        : library.startsWith('Electrical')
          ? 'IEC 60617'
          : 'ISO 128');
    out.push({
      id,
      name,
      library,
      group,
      standard: resolvedStandard,
      category: `${library} / ${resolvedStandard} / ${group}`,
      entities,
      ports,
      attributes: { TAG: tag, VALUE: '', DESCRIPTION: '', NOTES: '' },
    });
  };
  const valve = () => [
    p(
      [
        [-6, -4],
        [6, 4],
        [6, -4],
        [-6, 4],
      ],
      true,
    ),
    l(-10, 0, -6, 0),
    l(6, 0, 10, 0),
  ];

  // ============================================================================
  // 1. P&ID — ISO 14617 & ANSI/ISA-5.1 Valves and Actuators
  // ============================================================================
  for (const [id, name, shape, std] of [
    ['gate', 'Gate valve', valve(), 'ISO 14617'],
    ['ball', 'Ball valve', [...valve(), c(0, 0, 2.5)], 'ISO 14617'],
    [
      'butterfly',
      'Butterfly valve',
      [c(0, 0, 5), l(-4, -4, 4, 4), l(-10, 0, -5, 0), l(5, 0, 10, 0)],
      'ISO 14617',
    ],
    ['globe', 'Globe valve', [...valve(), c(0, 0, 1)], 'ISO 14617'],
    [
      'needle',
      'Needle valve',
      [
        ...valve(),
        l(0, 0, 0, 9),
        p(
          [
            [-2, 5],
            [0, 0],
            [2, 5],
          ],
          true,
        ),
      ],
      'ISO 14617',
    ],
    [
      'diaphragm',
      'Diaphragm valve',
      [
        ...valve(),
        p([
          [-5, 5],
          [0, 7],
          [5, 5],
        ]),
      ],
      'ISO 14617',
    ],
    [
      'plug',
      'Plug valve (ISO 14617)',
      [
        ...valve(),
        p(
          [
            [-2, -2],
            [0, 2],
            [2, -2],
            [0, -2],
          ],
          true,
        ),
      ],
      'ISO 14617',
    ],
    [
      'pinch',
      'Pinch valve (ISO 14617)',
      [...valve(), l(-3, 5, 3, 5), l(-3, -5, 3, -5)],
      'ISO 14617',
    ],
    [
      'solenoid',
      'Solenoid valve',
      [
        ...valve(),
        l(0, 0, 0, 8),
        p(
          [
            [-3, 8],
            [3, 8],
            [3, 12],
            [-3, 12],
          ],
          true,
        ),
        t('S', -1, 9, 2),
      ],
      'ANSI/ISA-5.1',
    ],
    [
      'pneumatic',
      'Pneumatically actuated valve',
      [
        ...valve(),
        l(0, 0, 0, 8),
        p(
          [
            [-5, 8],
            [-3, 11],
            [0, 12],
            [3, 11],
            [5, 8],
          ],
          true,
        ),
      ],
      'ANSI/ISA-5.1',
    ],
    [
      'motorized',
      'Motor-operated valve',
      [...valve(), l(0, 0, 0, 7), c(0, 10, 3), t('M', -1, 9, 2)],
      'ANSI/ISA-5.1',
    ],
    [
      'piston-valve',
      'Hydraulic / piston actuated valve (ISA-5.1)',
      [
        ...valve(),
        l(0, 0, 0, 7),
        p(
          [
            [-4, 7],
            [4, 7],
            [4, 13],
            [-4, 13],
          ],
          true,
        ),
        l(-4, 10, 4, 10),
      ],
      'ANSI/ISA-5.1',
    ],
    [
      'angle',
      'Angle valve',
      [
        p(
          [
            [-6, 4],
            [-6, -4],
            [0, 0],
            [4, -6],
            [-4, -6],
            [0, 0],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(0, -6, 0, -10),
      ],
      'ISO 14617',
    ],
    [
      'fourway',
      'Four-way valve (ISO 14617)',
      [
        ...valve(),
        p(
          [
            [-4, -6],
            [0, 0],
            [4, -6],
          ],
          true,
        ),
        p(
          [
            [-4, 6],
            [0, 0],
            [4, 6],
          ],
          true,
        ),
        l(0, -6, 0, -10),
        l(0, 6, 0, 10),
      ],
      'ISO 14617',
    ],
  ] as [string, string, Entity[], string][])
    add(
      `pid-${id}`,
      name,
      'P&ID',
      'Valves and actuators',
      shape,
      id === 'angle'
        ? [lr[0], port('OUT', 0, -10, 0, -1)]
        : id === 'fourway'
          ? [...lr, port('TOP', 0, 10, 0, 1), port('BOTTOM', 0, -10, 0, -1)]
          : lr,
      'XV',
      std,
    );

  // ============================================================================
  // 2. P&ID — ANSI/ISA-5.1 Field, Panel, and DCS Instruments
  // ============================================================================
  for (const [code, name] of [
    ['PI', 'Pressure indicator'],
    ['TI', 'Temperature indicator'],
    ['FI', 'Flow indicator'],
    ['LI', 'Level indicator'],
    ['PIC', 'Pressure controller'],
    ['TIC', 'Temperature controller'],
    ['FIC', 'Flow controller'],
    ['LIC', 'Level controller'],
    ['PSH', 'High-pressure switch'],
    ['PSL', 'Low-pressure switch'],
    ['TSH', 'High-temperature switch'],
    ['LSH', 'High-level switch'],
    ['LSL', 'Low-level switch'],
    ['PDT', 'Differential-pressure transmitter'],
    ['FE', 'Primary flow element'],
    ['TE', 'Primary temperature element'],
    ['AIT', 'Analytical transmitter'],
    ['SIT', 'Speed transmitter'],
  ]) {
    for (const panel of [false, true])
      add(
        `isa-${code}-${panel ? 'panel' : 'field'}`,
        `${name} · ${panel ? 'panel' : 'field'}`,
        'P&ID',
        panel ? 'Panel instruments' : 'Field instruments',
        [c(0, 0, 6), ...(panel ? [l(-6, 0, 6, 0)] : []), l(0, -6, 0, -10)],
        [port('PROCESS', 0, -10, 0, -1), port('SIGNAL', 0, 6, 0, 1)],
        code,
        'ANSI/ISA-5.1',
      );
  }
  // Additional ANSI/ISA-5.1, BS 1646 & DIN 28004 blank instrument bubbles (no baked inner text)
  for (const [id, name, es, std] of [
    [
      'isa-aux-panel',
      'Auxiliary / back-of-panel instrument (double line)',
      [c(0, 0, 6), l(-5.6, 1.5, 5.6, 1.5), l(-5.6, -1.5, 5.6, -1.5), l(0, -6, 0, -10)],
      'ANSI/ISA-5.1',
    ],
    [
      'isa-interlock',
      'Safety interlock logic (diamond)',
      [
        p(
          [
            [0, 6],
            [6, 0],
            [0, -6],
            [-6, 0],
          ],
          true,
        ),
        l(0, -6, 0, -10),
      ],
      'ANSI/ISA-5.1',
    ],
    [
      'isa-plc-hex',
      'Programmable logic / computer function (hexagon)',
      [
        p(
          [
            [0, 6],
            [5.5, 3],
            [5.5, -3],
            [0, -6],
            [-5.5, -3],
            [-5.5, 3],
          ],
          true,
        ),
        l(-5.5, 0, 5.5, 0),
        l(0, -6, 0, -10),
      ],
      'ANSI/ISA-5.1',
    ],
    [
      'bs1646-field',
      'Field-mounted instrument bubble (BS 1646)',
      [c(0, 0, 6), l(0, -6, 0, -10)],
      'BS 1646',
    ],
    [
      'bs1646-control-room',
      'Control room instrument bubble (BS 1646)',
      [c(0, 0, 6), l(-6, 0, 6, 0), l(0, -6, 0, -10)],
      'BS 1646',
    ],
    [
      'bs1646-local-panel',
      'Local panel instrument bubble (BS 1646)',
      [c(0, 0, 6), l(-5.6, -1.5, 5.6, -1.5), l(-5.6, 1.5, 5.6, 1.5), l(0, -6, 0, -10)],
      'BS 1646',
    ],
    [
      'din28004-field',
      'Field measuring point bubble (DIN 28004)',
      [c(0, 0, 6), l(0, -6, 0, -10)],
      'DIN 28004',
    ],
    [
      'din28004-central',
      'Central control panel bubble (DIN 28004)',
      [c(0, 0, 6), l(-6, 0, 6, 0), l(0, -6, 0, -10)],
      'DIN 28004',
    ],
    [
      'din28004-process-ctrl',
      'Process control / DCS function (DIN 28004)',
      [
        p(
          [
            [-6, -6],
            [6, -6],
            [6, 6],
            [-6, 6],
          ],
          true,
        ),
        c(0, 0, 6),
        l(0, -6, 0, -10),
      ],
      'DIN 28004',
    ],
  ] as [string, string, Entity[], string][]) {
    add(
      id,
      name,
      'P&ID',
      'Instruments & measurement bubbles',
      es,
      [port('PROCESS', 0, -10, 0, -1), port('SIGNAL', 0, 6, 0, 1)],
      'XI',
      std,
    );
  }
  // Additional ANSI/ISA-5.1 shared display / DCS / PLC computer functions (blank square-circle)
  for (const [code, name] of [
    ['FY', 'Flow computing relay (DCS/PLC)'],
    ['PY', 'Pressure I/P converter (ISA-5.1)'],
    ['TY', 'Temperature signal converter (ISA-5.1)'],
    ['HS', 'Hand switch (ISA-5.1)'],
    ['LAH', 'High-level alarm (DCS)'],
    ['PAH', 'High-pressure alarm (DCS)'],
  ]) {
    add(
      `isa-dcs-${code.toLowerCase()}`,
      name,
      'P&ID',
      'DCS and PLC functions',
      [
        p(
          [
            [-6, -6],
            [6, -6],
            [6, 6],
            [-6, 6],
          ],
          true,
        ),
        c(0, 0, 6),
        l(-6, 0, 6, 0),
        l(0, -6, 0, -10),
      ],
      [port('PROCESS', 0, -10, 0, -1), port('SIGNAL', 0, 6, 0, 1)],
      code,
      'ANSI/ISA-5.1',
    );
  }

  const box = (w = 6, h = 6) =>
    p(
      [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h],
      ],
      true,
    );

  // ============================================================================
  // 3. P&ID — ISO 14617 Piping/Accessories & ISO 10628 Process Equipment
  // ============================================================================
  for (const [id, name, es, std, tag] of [
    [
      'filter',
      'Y-strainer',
      [
        p([
          [-10, 0],
          [-5, 0],
          [0, -5],
          [5, 0],
          [10, 0],
        ]),
        p([
          [-2, -3],
          [1, -6],
          [4, -3],
        ]),
        l(-1, -2, 2, -5),
      ],
      'ISO 14617',
      'STR',
    ],
    [
      'strainer',
      'In-line filter',
      [box(), l(-5, -5, 5, 5), l(-10, 0, -6, 0), l(6, 0, 10, 0)],
      'ISO 14617',
      'FLT',
    ],
    [
      'orifice',
      'Orifice plate',
      [l(-10, 0, 10, 0), l(0, -6, 0, 6), l(-3, 6, 3, 6)],
      'ISO 14617',
      'FE',
    ],
    [
      'venturi',
      'Venturi tube (ISO 14617)',
      [
        p([
          [-10, 4],
          [-3, 1.5],
          [3, 1.5],
          [10, 4],
        ]),
        p([
          [-10, -4],
          [-3, -1.5],
          [3, -1.5],
          [10, -4],
        ]),
      ],
      'ISO 14617',
      'FE',
    ],
    [
      'rupture-disc',
      'Rupture / bursting disc (ISO 14617)',
      [box(4, 5), arc(-2, 0, 5, -50, 50), l(-10, 0, -4, 0), l(4, 0, 10, 0)],
      'ISO 14617',
      'PSE',
    ],
    [
      'flame-arrestor',
      'Flame arrestor (ISO 14617)',
      [
        box(5, 5),
        l(-2, -5, -2, 5),
        l(0, -5, 0, 5),
        l(2, -5, 2, 5),
        l(-10, 0, -5, 0),
        l(5, 0, 10, 0),
      ],
      'ISO 14617',
      'FA',
    ],
    [
      'sight-glass',
      'Sight glass (ISO 14617)',
      [c(0, 0, 4), c(0, 0, 2), l(-10, 0, -4, 0), l(4, 0, 10, 0)],
      'ISO 14617',
      'SG',
    ],
    [
      'expansion-joint',
      'Expansion joint / bellows (ISO 14617)',
      [
        p([
          [-10, 0],
          [-5, 0],
          [-3, 4],
          [-1, -4],
          [1, 4],
          [3, -4],
          [5, 0],
          [10, 0],
        ]),
      ],
      'ISO 14617',
      'EJ',
    ],
    [
      'reducer',
      'Concentric reducer',
      [
        p([
          [-10, -4],
          [10, -2],
        ]),
        p([
          [-10, 4],
          [10, 2],
        ]),
      ],
      'ISO 14617',
      'RED',
    ],
    [
      'flange',
      'Flanged joint',
      [l(-10, 0, 10, 0), l(-1, -5, -1, 5), l(1, -5, 1, 5)],
      'ISO 14617',
      '',
    ],
    ['blind', 'Blind flange', [l(-10, 0, 0, 0), l(0, -5, 0, 5), l(2, -5, 2, 5)], 'ISO 14617', ''],
    [
      'flow-arrow',
      'Flow direction',
      [
        l(-10, 0, 10, 0),
        p([
          [5, 3],
          [10, 0],
          [5, -3],
        ]),
      ],
      'ISO 14617',
      '',
    ],
    [
      'compressor',
      'Compressor',
      [
        c(0, 0, 6),
        p(
          [
            [-3, -4],
            [4, 0],
            [-3, 4],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
        t('C', -1, -3, 2),
      ],
      'ISO 10628',
      'K',
    ],
    [
      'blower',
      'Rotary blower / fan (ISO 10628)',
      [c(0, 0, 6), l(-4, -4, 5, -2), l(-4, 4, 5, 2), l(-10, 0, -6, 0), l(6, 0, 10, 0)],
      'ISO 10628',
      'B',
    ],
    [
      'gear-pump',
      'Positive-displacement pump',
      [c(-2, 0, 4), c(2, 0, 4), l(-10, 0, -6, 0), l(6, 0, 10, 0)],
      'ISO 10628',
      'P',
    ],
    [
      'vessel',
      'Pressure vessel',
      [
        p(
          [
            [-6, -7],
            [-6, 7],
            [-3, 10],
            [3, 10],
            [6, 7],
            [6, -7],
            [3, -10],
            [-3, -10],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      'ISO 10628',
      'V',
    ],
    [
      'distillation-column',
      'Distillation / tray column (ISO 10628)',
      [
        p(
          [
            [-5, -10],
            [-5, 10],
            [-3, 12],
            [3, 12],
            [5, 10],
            [5, -10],
            [3, -12],
            [-3, -12],
          ],
          true,
        ),
        l(-5, 5, 5, 5),
        l(-5, 0, 5, 0),
        l(-5, -5, 5, -5),
        l(-10, 0, -5, 0),
        l(5, 0, 10, 0),
      ],
      'ISO 10628',
      'C',
    ],
    [
      'plate-exchanger',
      'Plate heat exchanger (ISO 10628)',
      [
        box(6, 8),
        l(-3, -8, -3, 8),
        l(0, -8, 0, 8),
        l(3, -8, 3, 8),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      'ISO 10628',
      'E',
    ],
    [
      'cyclone',
      'Cyclone separator (ISO 10628)',
      [
        p(
          [
            [-6, 8],
            [6, 8],
            [6, 2],
            [0, -9],
            [-6, 2],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      'ISO 10628',
      'S',
    ],
    [
      'open-tank',
      'Open tank',
      [
        p([
          [-7, 9],
          [-7, -8],
          [7, -8],
          [7, 9],
        ]),
        l(-10, 0, -7, 0),
        l(7, 0, 10, 0),
      ],
      'ISO 10628',
      'TK',
    ],
    [
      'agitator',
      'Agitated tank',
      [box(7, 8), l(0, 12, 0, -4), l(-4, -4, 4, -4), c(0, 14, 2), l(-10, 0, -7, 0), l(7, 0, 10, 0)],
      'ISO 10628',
      'R',
    ],
    [
      'heater',
      'Electric heater',
      [
        box(7, 5),
        p([
          [-10, 0],
          [-5, 0],
          [-3, 3],
          [-1, -3],
          [1, 3],
          [3, -3],
          [5, 0],
          [10, 0],
        ]),
      ],
      'ISO 10628',
      'E',
    ],
    [
      'cooler',
      'Cooler',
      [
        c(0, 0, 6),
        l(-10, 0, 10, 0),
        l(0, -5, 0, 5),
        p([
          [-3, 2],
          [0, 5],
          [3, 2],
        ]),
      ],
      'ISO 10628',
      'E',
    ],
    [
      'steam-trap',
      'Steam trap',
      [box(5, 4), t('ST', -3, -1, 2.5), l(-10, 0, -5, 0), l(5, 0, 10, 0)],
      'ISO 14617',
      'ST',
    ],
    [
      'silencer',
      'Silencer',
      [
        box(6, 4),
        l(-3, -4, -3, 4),
        l(0, -4, 0, 4),
        l(3, -4, 3, 4),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      'ISO 14617',
      'SIL',
    ],
    [
      'din-plate-hx',
      'Plate heat exchanger (DIN 28004)',
      [
        box(7, 6),
        l(-4, -6, -4, 6),
        l(-1, -6, -1, 6),
        l(2, -6, 2, 6),
        l(5, -6, 5, 6),
        l(-10, 3, -7, 3),
        l(-10, -3, -7, -3),
        l(7, 3, 10, 3),
        l(7, -3, 10, -3),
      ],
      'DIN 28004',
      'E',
    ],
    [
      'din-jacketed-vessel',
      'Jacketed vessel (DIN 28004)',
      [
        box(6, 8),
        p([
          [-8, 5],
          [-8, -9],
          [8, -9],
          [8, 5],
        ]),
        l(-10, 0, -8, 0),
        l(8, 0, 10, 0),
      ],
      'DIN 28004',
      'R',
    ],
    [
      'din-cyclone',
      'Cyclone separator (DIN 28004)',
      [
        p(
          [
            [-6, 7],
            [6, 7],
            [6, 1],
            [1.5, -8],
            [-1.5, -8],
            [-6, 1],
          ],
          true,
        ),
        l(-10, 5, -6, 5),
        l(0, 7, 0, 10),
      ],
      'DIN 28004',
      'CY',
    ],
    [
      'din-rotary-valve',
      'Rotary feeder / airlock (DIN 28004)',
      [
        c(0, 0, 5),
        l(-3.5, -3.5, 3.5, 3.5),
        l(-3.5, 3.5, 3.5, -3.5),
        l(-5, 0, 5, 0),
        l(0, 5, 0, 10),
        l(0, -5, 0, -10),
      ],
      'DIN 28004',
      'RF',
    ],
    [
      'din-flame-arrester',
      'Flame arrester (DIN 28004)',
      [
        box(5, 4),
        l(-3, -4, -3, 4),
        l(0, -4, 0, 4),
        l(3, -4, 3, 4),
        l(-5, -2, 5, 2),
        l(-10, 0, -5, 0),
        l(5, 0, 10, 0),
      ],
      'DIN 28004',
      'FA',
    ],
    [
      'bs-bursting-disc',
      'Bursting / rupture disc (BS 1646)',
      [l(-10, 0, -4, 0), l(4, 0, 10, 0), l(-4, -5, -4, 5), l(4, -5, 4, 5), arc(0, 0, 4, -60, 60)],
      'BS 1646',
      'PSE',
    ],
    [
      'bs-orifice-plate',
      'Orifice restriction plate (BS 1646)',
      [
        l(-10, 0, 10, 0),
        l(-1, -5, -1, -1.5),
        l(-1, 1.5, -1, 5),
        l(1, -5, 1, -1.5),
        l(1, 1.5, 1, 5),
      ],
      'BS 1646',
      'FO',
    ],
  ] as [string, string, Entity[], string, string][])
    add(
      `process-${id}`,
      name,
      'P&ID',
      std === 'ISO 14617' ? 'Piping and accessories' : 'Equipment',
      es,
      lr,
      tag,
      std,
    );

  // Extended Industrial & Practice P&ID Equipment (Standard + Non-Standard / Industrial)
  for (const [id, name, group, es, portsList, tag, std] of [
    // Pumps (Industrial & ISO 10628)
    [
      'pump-centrifugal-motor',
      'Centrifugal pump + motor skid (Industrial)',
      'Pumps & Drives',
      [
        c(-3, 0, 5),
        p(
          [
            [-6.5, -3.5],
            [1, 0],
            [-6.5, 3.5],
          ],
          true,
        ),
        l(-3, 5, 2, 5),
        l(-10, 0, -8, 0),
        l(2, 0, 5, 0),
        c(7, 0, 3),
        t('M', 5.8, -1, 2.2),
        l(-4, -6, 10, -6),
      ],
      [port('IN', -10, 0, -1, 0), port('OUT', 2, 5, 1, 0)],
      'P',
      'Industrial',
    ],
    [
      'pump-screw',
      'Screw / progressive cavity pump',
      'Pumps & Drives',
      [
        box(7, 4),
        p([
          [-5, -2],
          [-2, 2],
          [1, -2],
          [4, 2],
        ]),
        l(-10, 0, -7, 0),
        l(7, 0, 10, 0),
      ],
      lr,
      'P',
      'ISO 10628',
    ],
    [
      'pump-diaphragm',
      'Diaphragm metering pump',
      'Pumps & Drives',
      [
        c(0, 0, 6),
        arc(-1, 0, 5, -70, 70),
        l(-6, -3, -2, -3),
        l(-6, 3, -2, 3),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      lr,
      'P',
      'ISO 10628',
    ],
    [
      'pump-reciprocating',
      'Reciprocating piston / plunger pump',
      'Pumps & Drives',
      [c(0, 0, 6), box(3.5, 2.5), l(-7, 0, -3.5, 0), l(-10, 0, -6, 0), l(6, 0, 10, 0)],
      lr,
      'P',
      'Industrial',
    ],
    [
      'pump-submersible',
      'Vertical sump / submersible pump',
      'Pumps & Drives',
      [box(2, 8), c(0, -5, 4), l(0, 8, 0, 11), c(0, 12.5, 1.8), l(-7, 6, 7, 6), l(4, -5, 10, -5)],
      [port('IN', 0, -9, 0, -1), port('OUT', 10, -5, 1, 0)],
      'P',
      'Industrial',
    ],
    // Compressors, Turbines & Fans (Standard & Non-Standard)
    [
      'comp-centrifugal',
      'Centrifugal compressor (trapezoid casing)',
      'Compressors & Turbines',
      [
        p(
          [
            [-6, -7],
            [6, -4],
            [6, 4],
            [-6, 7],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      lr,
      'K',
      'ISO 10628',
    ],
    [
      'comp-reciprocating',
      'Reciprocating compressor (Industrial box)',
      'Compressors & Turbines',
      [box(6, 5), l(-2, -5, -2, 5), l(-2, 0, 6, 0), l(-10, 0, -6, 0), l(6, 0, 10, 0)],
      lr,
      'K',
      'Industrial',
    ],
    [
      'comp-screw',
      'Rotary screw compressor',
      'Compressors & Turbines',
      [
        p(
          [
            [-6, -6],
            [6, -3.5],
            [6, 3.5],
            [-6, 6],
          ],
          true,
        ),
        l(-4, -3, 4, 3),
        l(-4, 3, 4, -3),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      lr,
      'K',
      'ISO 10628',
    ],
    [
      'turbine-steam',
      'Steam turbine (ISO 10628)',
      'Compressors & Turbines',
      [
        p(
          [
            [-6, -4],
            [6, -7.5],
            [6, 7.5],
            [-6, 4],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
        t('ST', -2, -1, 2.5),
      ],
      lr,
      'TB',
      'ISO 10628',
    ],
    [
      'turbine-gas',
      'Gas turbine / expander',
      'Compressors & Turbines',
      [
        p(
          [
            [-6, -4],
            [6, -7.5],
            [6, 7.5],
            [-6, 4],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
        t('GT', -2, -1, 2.5),
      ],
      lr,
      'GT',
      'Industrial',
    ],
    [
      'fan-centrifugal',
      'Centrifugal fan / ventilator',
      'Fans & Blowers',
      [
        c(0, 0, 6),
        l(0, 6, 8, 6),
        l(6, 0, 8, 6),
        l(-3, -3, 3, 3),
        l(-3, 3, 3, -3),
        l(-10, 0, -6, 0),
      ],
      [port('IN', -10, 0, -1, 0), port('OUT', 8, 6, 1, 0)],
      'FN',
      'ISO 10628',
    ],
    [
      'fan-axial',
      'Axial flow fan / propeller blower',
      'Fans & Blowers',
      [
        box(5, 6),
        l(0, -5, 0, 5),
        arc(-2, 0, 4, -60, 60),
        arc(2, 0, 4, 120, 240),
        l(-10, 0, -5, 0),
        l(5, 0, 10, 0),
      ],
      lr,
      'FN',
      'Industrial',
    ],
    // Vessels, Drums & Storage Tanks (Vasi & Serbatoi)
    [
      'drum-vertical',
      'Vertical process drum / vessel (vaso)',
      'Vessels & Tanks',
      [
        p(
          [
            [-5, -7],
            [-5, 7],
          ],
          false,
        ),
        p(
          [
            [5, -7],
            [5, 7],
          ],
          false,
        ),
        arc(0, 7, 5, 0, 180),
        arc(0, -7, 5, 180, 360),
        l(-10, 3, -5, 3),
        l(5, -3, 10, -3),
        l(0, 12, 0, 15),
        l(0, -12, 0, -15),
      ],
      [
        port('IN', -10, 3, -1, 0),
        port('OUT', 10, -3, 1, 0),
        port('TOP', 0, 15, 0, 1),
        port('BOT', 0, -15, 0, -1),
      ],
      'D',
      'ISO 10628',
    ],
    [
      'drum-horizontal',
      'Horizontal drum / separator vessel',
      'Vessels & Tanks',
      [
        l(-7, 5, 7, 5),
        l(-7, -5, 7, -5),
        arc(-7, 0, 5, 90, 270),
        arc(7, 0, 5, -90, 90),
        l(-15, 0, -12, 0),
        l(12, 0, 15, 0),
        l(-5, -5, -5, -8),
        l(5, -5, 5, -8),
      ],
      [port('IN', -15, 0, -1, 0), port('OUT', 15, 0, 1, 0)],
      'D',
      'ISO 10628',
    ],
    [
      'ko-drum',
      'Knock-out drum with demister pad',
      'Vessels & Tanks',
      [
        p(
          [
            [-5, -7],
            [-5, 7],
          ],
          false,
        ),
        p(
          [
            [5, -7],
            [5, 7],
          ],
          false,
        ),
        arc(0, 7, 5, 0, 180),
        arc(0, -7, 5, 180, 360),
        p(
          [
            [-4.5, 2.8],
            [4.5, 2.8],
            [4.5, 5.2],
            [-4.5, 5.2],
          ],
          true,
        ),
        l(-10, -2, -5, -2),
        l(0, 12, 0, 15),
        l(0, -12, 0, -15),
      ],
      [port('IN', -10, -2, -1, 0), port('VAP', 0, 15, 0, 1), port('LIQ', 0, -15, 0, -1)],
      'KO',
      'PIP / Industrial',
    ],
    [
      'tank-cone-roof',
      'Cone-roof atmospheric storage tank',
      'Vessels & Tanks',
      [
        p(
          [
            [-8, -8],
            [-8, 5],
            [0, 10],
            [8, 5],
            [8, -8],
          ],
          true,
        ),
        l(-12, -5, -8, -5),
        l(8, -5, 12, -5),
      ],
      [port('IN', -12, -5, -1, 0), port('OUT', 12, -5, 1, 0)],
      'TK',
      'ISO 10628',
    ],
    [
      'tank-floating-roof',
      'Floating-roof storage tank',
      'Vessels & Tanks',
      [
        p([
          [-8, 8],
          [-8, -8],
          [8, -8],
          [8, 8],
        ]),
        p(
          [
            [-7.5, 3],
            [7.5, 3],
            [7.5, 4.5],
            [-7.5, 4.5],
          ],
          true,
        ),
        l(-12, -5, -8, -5),
        l(8, -5, 12, -5),
      ],
      [port('IN', -12, -5, -1, 0), port('OUT', 12, -5, 1, 0)],
      'TK',
      'ISO 10628',
    ],
    [
      'tank-sphere',
      'Spherical pressure storage vessel (LPG)',
      'Vessels & Tanks',
      [c(0, 1, 7), l(-6, -3, -6, -9), l(6, -3, 6, -9), l(-10, 1, -7, 1), l(7, 1, 10, 1)],
      [port('IN', -10, 1, -1, 0), port('OUT', 10, 1, 1, 0)],
      'TK',
      'ISO 10628',
    ],
    [
      'silo-hopper',
      'Solids storage silo / hopper',
      'Vessels & Tanks',
      [
        p(
          [
            [-6, 9],
            [6, 9],
            [6, 0],
            [1.5, -9],
            [-1.5, -9],
            [-6, 0],
          ],
          true,
        ),
        l(0, 9, 0, 12),
        l(0, -9, 0, -12),
      ],
      [port('TOP', 0, 12, 0, 1), port('BOT', 0, -12, 0, -1)],
      'BN',
      'ISO 10628',
    ],
    // Heat Exchangers
    [
      'hx-shell-tube',
      'Shell & tube heat exchanger (fixed tube)',
      'Heat Exchangers',
      [
        c(0, 0, 6),
        p([
          [-8, 0],
          [-3, 0],
          [0, -3.5],
          [3, 3.5],
          [8, 0],
        ]),
        l(0, -10, 0, -6),
        l(0, 6, 0, 10),
      ],
      [
        port('IN', -8, 0, -1, 0),
        port('OUT', 8, 0, 1, 0),
        port('S1', 0, 10, 0, 1),
        port('S2', 0, -10, 0, -1),
      ],
      'E',
      'ISO 10628',
    ],
    [
      'hx-utube',
      'U-tube heat exchanger (Horizontal)',
      'Heat Exchangers',
      [
        l(-8, 4, 8, 4),
        l(-8, -4, 8, -4),
        l(-8, -4, -8, 4),
        arc(8, 0, 4, -90, 90),
        p(
          [
            [-10, 2],
            [7, 2],
          ],
          false,
        ),
        arc(7, 0, 2, -90, 90),
        p(
          [
            [7, -2],
            [-10, -2],
          ],
          false,
        ),
        l(-2, 4, -2, 8),
        l(4, -4, 4, -8),
      ],
      [
        port('TIN', -10, 2, -1, 0),
        port('TOUT', -10, -2, -1, 0),
        port('SIN', -2, 8, 0, 1),
        port('SOUT', 4, -8, 0, -1),
      ],
      'E',
      'ISO 10628',
    ],
    [
      'hx-kettle',
      'Kettle reboiler',
      'Heat Exchangers',
      [
        l(-8, -4, 7, -4),
        l(-8, 3, -2, 3),
        l(-2, 3, 0, 6),
        l(0, 6, 7, 6),
        l(-8, -4, -8, 3),
        arc(7, 1, 5, -90, 90),
        l(-11, 1, -3, 1),
        l(-11, -1, -3, -1),
        l(3, 6, 3, 10),
        l(5, -4, 5, -8),
      ],
      [port('TIN', -11, 1, -1, 0), port('VAP', 3, 10, 0, 1), port('BOT', 5, -8, 0, -1)],
      'E',
      'PIP / Industrial',
    ],
    [
      'hx-air-cooler',
      'Fin-fan air-cooled heat exchanger',
      'Heat Exchangers',
      [
        box(9, 4),
        p([
          [-9, 1.5],
          [-4, -1.5],
          [1, 1.5],
          [6, -1.5],
          [9, 0.5],
        ]),
        l(-5, -8, 5, -8),
        l(0, -8, 0, -5),
        c(0, -8, 1.5),
        l(-12, 0, -9, 0),
        l(9, 0, 12, 0),
      ],
      [port('IN', -12, 0, -1, 0), port('OUT', 12, 0, 1, 0)],
      'E',
      'Industrial',
    ],
    [
      'hx-condenser',
      'Surface condenser / vapor exchanger',
      'Heat Exchangers',
      [
        c(0, 0, 6),
        l(-6, -3, 6, -3),
        l(-6, 3, 6, 3),
        p([
          [-10, 0],
          [-4, 0],
          [4, 0],
          [10, 0],
        ]),
        l(0, 6, 0, 10),
        l(0, -6, 0, -10),
      ],
      [...lr, port('VAP', 0, 10, 0, 1), port('COND', 0, -10, 0, -1)],
      'E',
      'ISO 10628',
    ],
    [
      'cooling-tower',
      'Cooling tower (hyperbolic / industrial)',
      'Heat Exchangers',
      [
        p(
          [
            [-7, -9],
            [-4, 0],
            [-6, 9],
            [6, 9],
            [4, 0],
            [7, -9],
          ],
          true,
        ),
        l(-10, 4, -5, 4),
        l(7, -6, 10, -6),
      ],
      [port('IN', -10, 4, -1, 0), port('OUT', 10, -6, 1, 0)],
      'CT',
      'Industrial',
    ],
    // Reducers & Inline Specialties (Riduzioni & Accessori)
    [
      'reducer-eccentric',
      'Eccentric reducer (Riduzione eccentrica)',
      'Piping & Reducers',
      [
        p(
          [
            [-6, -4],
            [6, -4],
            [6, 1],
            [-6, 4],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, -1.5, 10, -1.5),
      ],
      [port('IN', -10, 0, -1, 0), port('OUT', 10, -1.5, 1, 0)],
      'ER',
      'ISO 14617',
    ],
    [
      'reducer-concentric-std',
      'Concentric reducer boxed (PIP)',
      'Piping & Reducers',
      [
        p(
          [
            [-6, -4.5],
            [6, -2],
            [6, 2],
            [-6, 4.5],
          ],
          true,
        ),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
      ],
      lr,
      'CR',
      'PIP / Industrial',
    ],
    [
      'steam-ejector',
      'Steam / vacuum ejector (Venturi nozzle)',
      'Piping & Reducers',
      [
        p(
          [
            [-6, -4],
            [6, -2.5],
            [6, 2.5],
            [-6, 4],
          ],
          true,
        ),
        p([
          [-6, -1.5],
          [-1, 0],
          [-6, 1.5],
        ]),
        l(-10, 0, -6, 0),
        l(6, 0, 10, 0),
        l(0, 3.2, 0, 9),
      ],
      [...lr, port('SUC', 0, 9, 0, 1)],
      'EJ',
      'ISO 10628',
    ],
    [
      'spectacle-blind',
      'Spectacle blind (Figura a 8)',
      'Piping & Reducers',
      [
        c(0, 3.5, 3),
        c(0, -3.5, 3),
        l(0, -0.5, 0, 0.5),
        c(0, -3.5, 1.2),
        l(-10, 0, -3, 0),
        l(3, 0, 10, 0),
      ],
      lr,
      'SB',
      'Industrial',
    ],
    [
      'tee-header',
      'Piping Tee / branch connection',
      'Piping & Reducers',
      [l(-10, 0, 10, 0), l(0, 0, 0, 10), c(0, 0, 1.5)],
      [...lr, port('BR', 0, 10, 0, 1)],
      'TEE',
      'Industrial',
    ],
  ] as [string, string, string, Entity[], Port[], string, string][]) {
    add(`pid-${id}`, name, 'P&ID', group, es, portsList, tag, std);
  }

  // ============================================================================
  // 4. ELECTRICAL MULTI-LINE — IEC 60617
  // ============================================================================
  for (const [id, name, es, tag] of [
    ['fuse', 'Fuse', [box(2, 5), l(0, 10, 0, -10)], 'F'],
    ['resistor', 'Resistor (IEC)', [box(2, 5), l(0, 10, 0, 5), l(0, -5, 0, -10)], 'R'],
    [
      'variable-resistor',
      'Variable resistor',
      [
        box(2, 5),
        l(0, 10, 0, 5),
        l(0, -5, 0, -10),
        l(-5, -6, 5, 6),
        p([
          [1, 6],
          [5, 6],
          [5, 2],
        ]),
      ],
      'R',
    ],
    [
      'capacitor',
      'Capacitor',
      [l(-5, 2, 5, 2), l(-5, -2, 5, -2), l(0, 10, 0, 2), l(0, -2, 0, -10)],
      'C',
    ],
    [
      'inductor',
      'Inductor',
      [
        l(0, 10, 0, 6),
        p([
          [0, 6],
          [3, 5],
          [0, 4],
          [3, 3],
          [0, 2],
          [3, 1],
          [0, 0],
          [3, -1],
          [0, -2],
          [3, -3],
          [0, -4],
          [0, -10],
        ]),
      ],
      'L',
    ],
    [
      'diode',
      'Diode',
      [
        p(
          [
            [-4, 4],
            [4, 4],
            [0, -3],
          ],
          true,
        ),
        l(-4, -3, 4, -3),
        l(0, 10, 0, 4),
        l(0, -3, 0, -10),
      ],
      'V',
    ],
    [
      'lamp',
      'Indicator lamp',
      [
        c(0, 0, 5),
        l(-3.5, -3.5, 3.5, 3.5),
        l(-3.5, 3.5, 3.5, -3.5),
        l(0, 10, 0, 5),
        l(0, -5, 0, -10),
      ],
      'H',
    ],
    [
      'buzzer',
      'Audible indicator',
      [
        p(
          [
            [-4, -4],
            [0, -4],
            [5, -7],
            [5, 7],
            [0, 4],
            [-4, 4],
          ],
          true,
        ),
        l(0, 10, 0, 4),
        l(0, -4, 0, -10),
      ],
      'H',
    ],
    ['ammeter', 'Ammeter', [c(0, 0, 6), t('A', -2, -1, 4), l(0, 10, 0, 6), l(0, -6, 0, -10)], 'PA'],
    [
      'voltmeter',
      'Voltmeter',
      [c(0, 0, 6), t('V', -2, -1, 4), l(0, 10, 0, 6), l(0, -6, 0, -10)],
      'PV',
    ],
    [
      'wattmeter',
      'Wattmeter',
      [c(0, 0, 6), t('W', -2, -1, 4), l(0, 10, 0, 6), l(0, -6, 0, -10)],
      'PW',
    ],
    ['kwh', 'Energy meter', [box(), t('kWh', -4, -1, 2.5), l(0, 10, 0, 6), l(0, -6, 0, -10)], 'PE'],
    [
      'push-no',
      'Normally open pushbutton',
      [
        l(-4, 2, 4, 2),
        l(-4, -2, 4, -2),
        l(0, 10, 0, 2),
        l(0, -2, 0, -10),
        l(4, 0, 8, 0),
        l(8, -3, 8, 3),
      ],
      'S',
    ],
    [
      'push-nc',
      'Normally closed pushbutton',
      [
        l(-4, 2, 4, 2),
        l(-4, -2, 4, -2),
        l(0, 10, 0, 2),
        l(0, -2, 0, -10),
        l(-4, -4, 4, 4),
        l(4, 0, 8, 0),
        l(8, -3, 8, 3),
      ],
      'S',
    ],
    [
      'emergency',
      'Emergency stop',
      [
        l(-4, 2, 4, 2),
        l(-4, -2, 4, -2),
        l(0, 10, 0, 2),
        l(0, -2, 0, -10),
        l(-4, -4, 4, 4),
        l(4, 0, 8, 0),
        p(
          [
            [8, -4],
            [10, -5],
            [10, 5],
            [8, 4],
          ],
          true,
        ),
      ],
      'S',
    ],
    [
      'limit',
      'Limit switch',
      [l(0, 10, 0, 3), l(0, -10, 0, -3), l(0, -3, 4, 3), l(4, 3, 7, 6), c(8, 7, 1.5)],
      'S',
    ],
    [
      'proximity',
      'Proximity sensor',
      [box(5, 5), t('→', -3, -1), l(0, 10, 0, 5), l(0, -5, 0, -10)],
      'B',
    ],
    [
      'relay',
      'Auxiliary relay',
      [box(5, 4), t('K', -1, -1), l(0, 10, 0, 4), l(0, -4, 0, -10)],
      'K',
    ],
    [
      'timer',
      'Time-delay relay',
      [box(5, 4), t('t', -1, -1), l(0, 10, 0, 4), l(0, -4, 0, -10)],
      'KT',
    ],
    [
      'spd',
      'Surge protective device',
      [
        box(4, 6),
        p([
          [2, 5],
          [-1, 1],
          [2, 1],
          [-2, -5],
        ]),
        l(0, 10, 0, 6),
        l(0, -6, 0, -10),
      ],
      'F',
    ],
    [
      'battery',
      'Battery',
      [
        l(-5, 3, 5, 3),
        l(-3, 0, 3, 0),
        l(-5, -3, 5, -3),
        l(-3, -6, 3, -6),
        l(0, 10, 0, 3),
        l(0, -6, 0, -10),
      ],
      'G',
    ],
    [
      'ac-source',
      'AC source',
      [
        c(0, 0, 6),
        p([
          [-4, 0],
          [-2, 2],
          [0, 0],
          [2, -2],
          [4, 0],
        ]),
        l(0, 10, 0, 6),
        l(0, -6, 0, -10),
      ],
      'G',
    ],
    [
      'dc-source',
      'DC power supply',
      [box(), t('+', -2, 2), t('−', -2, -4), l(0, 10, 0, 6), l(0, -6, 0, -10)],
      'G',
    ],
    [
      'vfd',
      'Drive / inverter',
      [box(6, 7), l(-6, -7, 6, 7), t('~', -4, 2), t('~', 1, -5), l(0, 10, 0, 7), l(0, -7, 0, -10)],
      'U',
    ],
    [
      'generator',
      'Generator',
      [c(0, 0, 6), t('G', -2, -1, 4), l(0, 10, 0, 6), l(0, -6, 0, -10)],
      'G',
    ],
    [
      'chassis',
      'Chassis ground',
      [l(0, 10, 0, 0), l(-6, 0, 6, 0), l(-6, 0, -3, -4), l(-2, 0, 1, -4), l(2, 0, 5, -4)],
      'PE',
    ],
    ['junction', 'Conductor junction', [c(0, 0, 0.8), l(-10, 0, 10, 0), l(0, -10, 0, 10)], ''],
    [
      'crossing',
      'Unconnected crossing',
      [
        l(-10, 0, 10, 0),
        l(0, -10, 0, -2),
        p([
          [0, -2],
          [2, 0],
          [0, 2],
        ]),
        l(0, 2, 0, 10),
      ],
      '',
    ],
  ] as [string, string, Entity[], string][])
    add(
      `electric-${id}`,
      name,
      'Electrical multi-line',
      ['fuse', 'spd'].includes(id)
        ? 'Protection'
        : ['resistor', 'variable-resistor', 'capacitor', 'inductor', 'diode'].includes(id)
          ? 'Passive components and semiconductors'
          : ['push-no', 'push-nc', 'emergency', 'limit', 'proximity', 'relay', 'timer'].includes(id)
            ? 'Control and automation'
            : ['ammeter', 'voltmeter', 'wattmeter', 'kwh', 'lamp', 'buzzer'].includes(id)
              ? 'Measurement and indication'
              : 'Power and connections',
      es,
      tb,
      tag,
      'IEC 60617',
    );

  // ============================================================================
  // 5. ELECTRICAL MULTI-LINE — ANSI Y32 (IEEE 315)
  // ============================================================================
  for (const [id, name, group, es, tag] of [
    [
      'ansi-resistor',
      'Resistor · zigzag (ANSI Y32)',
      'Passive components (ANSI Y32)',
      [
        p([
          [0, 10],
          [0, 6],
          [3, 4.5],
          [-3, 2.5],
          [3, 0.5],
          [-3, -1.5],
          [3, -3.5],
          [-3, -5.5],
          [0, -6.5],
          [0, -10],
        ]),
      ],
      'R',
    ],
    [
      'ansi-capacitor',
      'Capacitor · curved plate (ANSI Y32)',
      'Passive components (ANSI Y32)',
      [l(-5, 2, 5, 2), arc(0, -6, 6, 50, 130), l(0, 10, 0, 2), l(0, -2, 0, -10)],
      'C',
    ],
    [
      'ansi-contact-no',
      'Normally open contact · NEMA (ANSI Y32)',
      'Relays and contacts (ANSI Y32)',
      [l(0, 10, 0, 2.5), l(-4, 2.5, 4, 2.5), l(-4, -2.5, 4, -2.5), l(0, -2.5, 0, -10)],
      'CR',
    ],
    [
      'ansi-contact-nc',
      'Normally closed contact · NEMA (ANSI Y32)',
      'Relays and contacts (ANSI Y32)',
      [
        l(0, 10, 0, 2.5),
        l(-4, 2.5, 4, 2.5),
        l(-4, -2.5, 4, -2.5),
        l(-5, -4, 5, 4),
        l(0, -2.5, 0, -10),
      ],
      'CR',
    ],
    [
      'ansi-coil',
      'Relay / contactor coil · circle (ANSI Y32)',
      'Relays and contacts (ANSI Y32)',
      [c(0, 0, 5), t('CR', -3, -1, 2.8), l(0, 10, 0, 5), l(0, -5, 0, -10)],
      'CR',
    ],
    [
      'ansi-breaker',
      'Thermal-magnetic circuit breaker (ANSI Y32)',
      'Protection (ANSI Y32)',
      [l(0, 10, 0, 5), c(0, 5, 0.8), arc(-2, 0, 5.4, -65, 65), c(0, -5, 0.8), l(0, -5, 0, -10)],
      'CB',
    ],
    [
      'ansi-overload',
      'Thermal overload heater (ANSI Y32)',
      'Protection (ANSI Y32)',
      [
        p([
          [0, 10],
          [0, 5],
          [-3, 5],
          [-3, 1],
          [3, 1],
          [3, -3],
          [0, -3],
          [0, -10],
        ]),
      ],
      'OL',
    ],
    [
      'ansi-transformer',
      'Control transformer · dual coil (ANSI Y32)',
      'Power and transformers (ANSI Y32)',
      [
        l(-4, 10, -4, 6),
        arc(-4, 3, 3, -90, 90),
        arc(-4, -3, 3, -90, 90),
        l(-4, -6, -4, -10),
        l(0, -7, 0, 7),
        l(4, 10, 4, 6),
        arc(4, 3, 3, 90, 270),
        arc(4, -3, 3, 90, 270),
        l(4, -6, 4, -10),
      ],
      'XFMR',
    ],
  ] as [string, string, string, Entity[], string][])
    add(`ansi-${id}`, name, 'Electrical multi-line', group, es, tb, tag, 'ANSI Y32');

  // ============================================================================
  // 6. ELECTRICAL MULTI-LINE — NFPA 79 Industrial Machinery
  // ============================================================================
  for (const [id, name, group, es, tag] of [
    [
      'nfpa-estop',
      'Mushroom E-Stop pushbutton (NFPA 79)',
      'Operator controls (NFPA 79)',
      [
        l(0, 10, 0, 2),
        l(-4, 2, 4, 2),
        l(-4, -2, 4, -2),
        l(0, -2, 0, -10),
        l(0, 2, 7, 2),
        arc(7, 2, 4, -90, 90),
      ],
      'PB',
    ],
    [
      'nfpa-selector',
      'Selector switch 3-position (NFPA 79)',
      'Operator controls (NFPA 79)',
      [
        l(0, 10, 0, 3),
        l(-4, 3, 4, 3),
        l(-4, -3, 4, -3),
        l(0, -3, 0, -10),
        l(0, 0, 7, 0),
        l(7, -3, 9, 0),
        l(7, 3, 9, 0),
      ],
      'SS',
    ],
    [
      'nfpa-pressure-sw',
      'Pressure switch NO (NFPA 79)',
      'Process sensors and switches (NFPA 79)',
      [l(0, 10, 0, 4), l(0, -10, 0, -4), l(0, -4, 3, 4), l(2, 0, 6, 0), arc(6, 0, 3, -90, 90)],
      'PS',
    ],
    [
      'nfpa-float-sw',
      'Liquid level float switch (NFPA 79)',
      'Process sensors and switches (NFPA 79)',
      [l(0, 10, 0, 4), l(0, -10, 0, -4), l(0, -4, 3, 4), l(2, 0, 6, 0), c(8, 0, 2.2)],
      'LS',
    ],
    [
      'nfpa-photo-sensor',
      'Photoelectric sensor (NFPA 79)',
      'Process sensors and switches (NFPA 79)',
      [
        box(5, 5),
        p(
          [
            [-3, 0],
            [0, 3],
            [3, 0],
            [0, -3],
          ],
          true,
        ),
        t('PE', -2.5, -1, 2.2),
        l(0, 10, 0, 5),
        l(0, -5, 0, -10),
      ],
      'PE',
    ],
    [
      'nfpa-plc-in',
      'PLC Digital Input module (NFPA 79)',
      'PLC and drives (NFPA 79)',
      [
        box(7, 6),
        l(-7, 2, 7, 2),
        t('PLC DI', -5, 3, 2),
        t('I0.0', -3.5, -2, 2.2),
        l(0, 10, 0, 6),
        l(0, -6, 0, -10),
      ],
      'PLC',
    ],
    [
      'nfpa-plc-out',
      'PLC Digital Output module (NFPA 79)',
      'PLC and drives (NFPA 79)',
      [
        box(7, 6),
        l(-7, 2, 7, 2),
        t('PLC DO', -5, 3, 2),
        t('Q0.0', -3.5, -2, 2.2),
        l(0, 10, 0, 6),
        l(0, -6, 0, -10),
      ],
      'PLC',
    ],
    [
      'nfpa-solenoid',
      'Solenoid actuator coil (NFPA 79)',
      'PLC and drives (NFPA 79)',
      [
        p(
          [
            [-4, 3],
            [4, 3],
            [-4, -3],
            [4, -3],
          ],
          true,
        ),
        l(0, 10, 0, 3),
        l(0, -3, 0, -10),
      ],
      'SOL',
    ],
  ] as [string, string, string, Entity[], string][])
    add(`nfpa-${id}`, name, 'Electrical multi-line', group, es, tb, tag, 'NFPA 79');

  // ============================================================================
  // 7. ELECTRICAL SINGLE-LINE — IEC 60617 & ANSI Y32
  // ============================================================================
  // Dedicated single-line symbols, with explicit number of poles/conductors.
  for (const poles of [1, 2, 3, 4]) {
    add(
      `single-breaker-${poles}`,
      `Circuit breaker ${poles}P · single-line`,
      'Electrical single-line',
      'Switching and protection',
      [l(0, 10, 0, 4), l(0, -10, 0, -4), l(0, -4, 4, 4), box(2, 3), t(`${poles}P`, 5, 0, 2.5)],
      tb,
      'Q',
      'IEC 60617',
    );
    add(
      `single-cable-${poles}`,
      `Cable · ${poles} conductors`,
      'Electrical single-line',
      'Distribution',
      [
        l(0, 10, 0, -10),
        ...Array.from({ length: poles }, (_, i) => l(-2, 4 - i * 3, 2, 6 - i * 3)),
        t(String(poles), 5, -1),
      ],
      tb,
      'W',
      'IEC 60617',
    );
  }
  for (const [id, name, es, tag, std] of [
    ['busbar', 'Busbar', [l(-10, 0, 10, 0), l(-10, 1, 10, 1)], 'B', 'IEC 60617'],
    [
      'transformer',
      'Transformer · single-line',
      [c(0, 3, 4), c(0, -3, 4), l(0, 10, 0, 7), l(0, -7, 0, -10)],
      'T',
      'IEC 60617',
    ],
    [
      'ct',
      'Current transformer CT',
      [
        l(0, 10, 0, -10),
        c(0, 0, 4),
        l(4, 0, 8, 0),
        p([
          [5, 2],
          [8, 0],
          [5, -2],
        ]),
      ],
      'TA',
      'IEC 60617',
    ],
    [
      'vt',
      'Voltage transformer VT',
      [c(0, 3, 4), c(0, -3, 4), l(0, 10, 0, 7), l(0, -7, 0, -10), t('V', 6, -1)],
      'TV',
      'IEC 60617',
    ],
    [
      'motor',
      'Three-phase motor · single-line',
      [c(0, 0, 6), t('M', -2, 0, 4), t('3~', -2, -4, 2), l(0, 10, 0, 6)],
      'M',
      'IEC 60617',
    ],
    [
      'load',
      'Generic load',
      [
        p(
          [
            [-5, 4],
            [5, 4],
            [0, -5],
          ],
          true,
        ),
        l(0, 10, 0, 4),
        l(0, -5, 0, -10),
      ],
      'U',
      'IEC 60617',
    ],
    [
      'ups',
      'UPS',
      [box(6, 7), t('UPS', -4, -1, 2.5), l(0, 10, 0, 7), l(0, -7, 0, -10)],
      'U',
      'IEC 60617',
    ],
    [
      'pv',
      'Photovoltaic generator',
      [
        box(),
        l(-6, 0, 6, 0),
        l(0, -6, 0, 6),
        p([
          [-10, 10],
          [-6, 6],
          [-9, 6],
        ]),
        l(0, 10, 0, 6),
        l(0, -6, 0, -10),
      ],
      'G',
      'IEC 60617',
    ],
    [
      'earth-switch',
      'Earthing switch',
      [l(0, 10, 0, 4), l(0, -4, 4, 4), l(0, -4, 0, -7), l(-4, -7, 4, -7), l(-2, -9, 2, -9)],
      'QE',
      'IEC 60617',
    ],
    [
      'rcd',
      'RCD · single-line',
      [box(4, 5), l(0, 10, 0, -10), t('ΔI', 6, 0, 2.5)],
      'Q',
      'IEC 60617',
    ],
    [
      'ansi-cb-1l',
      'Drawout circuit breaker · single-line (ANSI Y32)',
      [
        l(0, 10, 0, 5),
        p([
          [-2, 6],
          [0, 4],
          [2, 6],
        ]),
        arc(-2, 0, 5.2, -65, 65),
        p([
          [-2, -6],
          [0, -4],
          [2, -6],
        ]),
        l(0, -5, 0, -10),
      ],
      '52',
      'ANSI Y32',
    ],
    [
      'nfpa-disconnect-1l',
      'Main machine disconnect switch (NFPA 79)',
      [l(0, 10, 0, 4), l(0, -10, 0, -4), l(0, -4, 5, 4), l(-4, 0, 6, 0), t('DISC', 5, -2, 2)],
      'DS',
      'NFPA 79',
    ],
    [
      'iec62271-cb-withdrawable',
      'MV Withdrawable circuit breaker truck (IEC 62271-1)',
      [
        l(0, 10, 0, 7),
        p([
          [-2.5, 8.5],
          [0, 6.2],
          [2.5, 8.5],
        ]),
        p([
          [-2.5, 6.5],
          [0, 4.2],
          [2.5, 6.5],
        ]),
        l(-3, -3, 3, 3),
        l(-3, 3, 3, -3),
        l(0, 4.2, 0, -4.2),
        p([
          [-2.5, -6.5],
          [0, -4.2],
          [2.5, -6.5],
        ]),
        p([
          [-2.5, -8.5],
          [0, -6.2],
          [2.5, -8.5],
        ]),
        l(0, -7, 0, -10),
      ],
      'CB',
      'IEC 62271-1',
    ],
    [
      'iec62271-disconnector',
      'HV Disconnector / Isolator (IEC 62271-1)',
      [l(0, 10, 0, 4), l(-3, 4, 3, 4), l(0, -4, 4.5, 3.5), l(0, -4, 0, -10)],
      'QS',
      'IEC 62271-1',
    ],
    [
      'iec62271-load-switch',
      'Switch-disconnector / Load-break switch (IEC 62271-1)',
      [l(0, 10, 0, 4), c(0, 4, 1.5), l(0, -4, 5, 3.5), l(0, -4, 0, -10)],
      'QB',
      'IEC 62271-1',
    ],
    [
      'iec62271-fuse-switch',
      'Fuse-switch-disconnector (IEC 62271-1)',
      [
        l(0, 10, 0, 4),
        c(0, 4, 1.4),
        l(0, -4, 4.5, 3.5),
        p(
          [
            [-1.5, -6],
            [1.5, -6],
            [1.5, -1],
            [-1.5, -1],
          ],
          true,
        ),
        l(0, -4, 0, -10),
      ],
      'QSF',
      'IEC 62271-1',
    ],
    [
      'iec62271-make-earth',
      'Make-proof earthing switch (IEC 62271-1)',
      [
        l(0, 10, 0, 4),
        l(0, -3, 4, 4),
        c(0, 4, 1.3),
        l(0, -3, 0, -7),
        l(-4.5, -7, 4.5, -7),
        l(-2.5, -8.8, 2.5, -8.8),
        l(-1, -10, 1, -10),
      ],
      'QE',
      'IEC 62271-1',
    ],
    [
      'iec62271-surge-arrester',
      'Metal-oxide surge arrester (IEC 62271-1)',
      [
        l(0, 10, 0, 4),
        p(
          [
            [-2.5, 4],
            [2.5, 4],
            [2.5, -4],
            [-2.5, -4],
          ],
          true,
        ),
        l(0, 3, 0, -3),
        p([
          [-1.5, -1],
          [0, -3],
          [1.5, -1],
        ]),
        l(0, -4, 0, -7),
        l(-4, -7, 4, -7),
        l(-2, -9, 2, -9),
      ],
      'F',
      'IEC 62271-1',
    ],
    [
      'iec62271-200-cubicle',
      'Metal-enclosed switchgear bay LSC2B (IEC/EN 62271-200)',
      [
        p(
          [
            [-8, -9],
            [8, -9],
            [8, 9],
            [-8, 9],
          ],
          true,
        ),
        l(-8, 4.5, 8, 4.5),
        l(-8, -3.5, 8, -3.5),
        l(0, 10, 0, 4.5),
        l(-3, -2, 3, 2.5),
        l(-3, 2.5, 3, -2),
        l(0, 4.5, 0, -3.5),
        l(0, -3.5, 0, -10),
        c(0, -6, 2),
      ],
      'PANEL',
      'IEC/EN 62271-200',
    ],
    [
      'iec62271-200-cable-vds',
      'Cable compartment with CT & VDS indicator (IEC/EN 62271-200)',
      [
        l(0, 10, 0, -10),
        c(0, 3, 3.2),
        l(3.2, 3, 7, 3),
        l(0, -2, 5, -2),
        l(5, -5, 5, 1),
        l(7, -3.5, 7, -0.5),
        p(
          [
            [-2, -7],
            [2, -7],
            [0, -9.5],
          ],
          true,
        ),
      ],
      'VDS',
      'IEC/EN 62271-200',
    ],
  ] as [string, string, Entity[], string, string][])
    add(
      `single-${id}`,
      name,
      'Electrical single-line',
      id === 'rcd' ||
        id === 'earth-switch' ||
        id === 'ansi-cb-1l' ||
        id === 'nfpa-disconnect-1l' ||
        id.startsWith('iec62271')
        ? 'Switching and protection'
        : 'Distribution and conversion',
      es,
      tb,
      tag,
      std,
    );

  // ============================================================================
  // 8. GENERAL — ISO 128 Technical Annotations & Shapes
  // ============================================================================
  for (const [id, name, es] of [
    [
      'arrow',
      'Arrow',
      [
        l(-10, 0, 10, 0),
        p([
          [5, 4],
          [10, 0],
          [5, -4],
        ]),
      ],
    ],
    ['origin', 'Origin marker', [c(0, 0, 4), l(-8, 0, 8, 0), l(0, -8, 0, 8)]],
    ['terminal', 'Circular reference', [c(0, 0, 5)]],
    ['frame', 'Generic frame', [box(10, 7)]],
    [
      'diamond',
      'Decision / diamond',
      [
        p(
          [
            [0, 8],
            [8, 0],
            [0, -8],
            [-8, 0],
          ],
          true,
        ),
      ],
    ],
    [
      'triangle',
      'Triangle',
      [
        p(
          [
            [0, 8],
            [8, -6],
            [-8, -6],
          ],
          true,
        ),
      ],
    ],
  ] as [string, string, Entity[]][])
    add(`general-${id}`, name, 'General', 'Annotation and shapes', es, [], '', 'ISO 128');

  return out;
}

export function enrichCategories(blocks: Block[]): Block[] {
  return blocks.map((b) => {
    if (b.library && b.standard) return b;
    const library = b.library
      ? b.library
      : b.id.startsWith('pid-')
        ? 'P&ID'
        : b.id.startsWith('iec-')
          ? 'Electrical multi-line'
          : 'User';
    const group = b.group
      ? b.group
      : b.id.startsWith('pid-')
        ? /field|panel|PT|TT|FT|LT/.test(b.id)
          ? 'Instruments and transmitters'
          : /pump|tank|exchanger/.test(b.id)
            ? 'Equipment'
            : 'Valves and actuators'
        : /breaker|rcd|thermal|disconnector/.test(b.id)
          ? 'Switching and protection'
          : /coil|contact/.test(b.id)
            ? 'Control and automation'
            : 'Machines and connections';
    const standard =
      b.standard ??
      (library === 'P&ID'
        ? group === 'Instruments and transmitters' || b.id === 'pid-control'
          ? 'ANSI/ISA-5.1'
          : group === 'Equipment'
            ? 'ISO 10628'
            : 'ISO 14617'
        : library.startsWith('Electrical')
          ? 'IEC 60617'
          : 'ISO 128');
    return {
      ...b,
      library,
      group,
      standard,
      category: `${library} / ${standard} / ${group}`,
    };
  });
}

/** Add missing definitions only: placed instances and user-edited blocks remain intact. */
export function supplementLibrary(d: Drawing, catalog: Block[]): Drawing {
  const result = clone(d),
    ids = new Set(d.blocks.map((b) => b.id));
  result.blocks.push(...clone(catalog.filter((b) => !ids.has(b.id))));
  return result;
}
