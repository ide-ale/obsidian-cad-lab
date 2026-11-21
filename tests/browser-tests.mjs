import { chromium } from '@playwright/test';
const browser = await chromium.launch({
  headless: true,
  args: [
    '--disable-gpu',
    '--disable-accelerated-2d-canvas',
    '--in-process-gpu',
    '--single-process',
  ],
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.setDefaultTimeout(10000);
let count = 0;
const assert = (value, message) => {
  if (!value) throw new Error(message);
};
const check = async (name, fn) => {
  console.log(`RUN UI ${name}`);
  await fn();
  count++;
  console.log(`PASS UI ${name}`);
};
await page.goto(new URL('browser.html', import.meta.url).href);
await page.waitForFunction(() => window.cad && window.cad.canvas.width > 0);
const reset = async (fixture = false) =>
  page.evaluate((f) => window.cad.load(f ? window.cadFixture() : window.cadEmpty()), fixture);
const command = async (value) => {
  const input = page.getByRole('textbox', { name: 'CAD command line' });
  await input.fill(value);
  await input.press('Enter');
};
const clickWorld = async (x, y) => {
  const p = await page.evaluate(
    ({ x, y }) => {
      const e = window.cad,
        r = e.canvas.getBoundingClientRect(),
        s = e.renderer.camera.screen({ x, y });
      return { x: r.left + s.x, y: r.top + s.y };
    },
    { x, y },
  );
  await page.mouse.click(p.x, p.y);
};
const dragWorld = async (a, b) => {
  const points = await page.evaluate(
    ({ a, b }) => {
      const e = window.cad,
        r = e.canvas.getBoundingClientRect();
      return [a, b].map((p) => {
        const s = e.renderer.camera.screen(p);
        return { x: r.left + s.x, y: r.top + s.y };
      });
    },
    { a, b },
  );
  await page.mouse.move(points[0].x, points[0].y);
  await page.mouse.down();
  await page.mouse.move(points[1].x, points[1].y, { steps: 12 });
  await page.mouse.up();
};
try {
  await check('Retina canvas, library and render without exceptions', async () => {
    assert(
      await page.evaluate(
        () => window.cad.canvas.width === Math.round(window.cad.renderer.camera.width * 2),
      ),
      'DPR mismatch',
    );
    assert((await page.locator('.cad-symbol').count()) >= 26, 'Missing library');
    const colors = await page.evaluate(() => {
      const e = window.cad;
      e.renderer.render(e.drawing, { selected: new Set(), preview: [], pen: false });
      const data = e.canvas
        .getContext('2d')
        .getImageData(0, 0, e.canvas.width, e.canvas.height).data;
      const colors = new Set();
      for (let i = 0; i < data.length; i += 16)
        colors.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
      return colors.size;
    });
    assert(colors > 10, 'Canvas renderer did not paint vector geometry');
    if (process.env.CAD_SCREENSHOTS === '1')
      await page.screenshot({ path: 'tests/desktop.png', animations: 'disabled', timeout: 10000 });
  });
  await check('Mouse line tool with ORTHO', async () => {
    await reset();
    await page.evaluate(() => (window.cad.ortho = true));
    await page.getByRole('button', { name: 'Line (L)', exact: true }).click();
    await clickWorld(0, 0);
    await clickWorld(30, 20);
    const e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(e.type === 'line' && Math.abs(e.b.y) < 1e-6, 'ORTHO line incorrect');
    await page.evaluate(() => (window.cad.ortho = false));
  });
  await check('Command coordinates preserve exact values, undo and redo', async () => {
    await reset();
    for (const s of ['L', '0,0', '@50<30']) await command(s);
    const e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(
      Math.abs(e.b.x - 43.3012701892) < 1e-8 && Math.abs(e.b.y - 25) < 1e-8,
      'Exact polar coordinates lost',
    );
    await command('UNDO');
    assert((await page.evaluate(() => window.cad.drawing.entities.length)) === 0, 'Undo failed');
    await command('REDO');
    assert((await page.evaluate(() => window.cad.drawing.entities.length)) === 1, 'Redo failed');
  });
  await check('Circle, arc, rectangle, free polyline and finish', async () => {
    await reset();
    for (const s of [
      'C',
      '0,0',
      '10,0',
      'A',
      '20,0',
      '30,0',
      '20,10',
      'REC',
      '0,20',
      '20,40',
      'PL',
      '30,20',
      '40,30',
      '50,25',
      'CH',
    ])
      await command(s);
    const e = await page.evaluate(() => window.cad.drawing.entities);
    assert(e.length === 4, 'Expected four entities');
    assert(e[0].radius === 10 && e[1].start === 0 && e[1].end === 90, 'Arc or circle wrong');
    assert(e[2].closed && e[3].closed, 'Polylines not closed');
  });
  await check('Technical text dialog and escaped SVG-safe content', async () => {
    await reset();
    await page.getByRole('button', { name: 'Text (T)', exact: true }).click();
    await clickWorld(0, 0);
    await page.getByRole('dialog').getByLabel('Text', { exact: true }).fill('Quadro Q1 <400V>');
    await page.getByRole('dialog').getByRole('button', { name: 'Apply', exact: true }).click();
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].text)) === 'Quadro Q1 <400V>',
      'Text missing',
    );
  });
  await check('Block insert from palette and editable TAG', async () => {
    await reset();
    await page.getByRole('button', { name: 'Insert block (I)', exact: true }).click();
    await page.getByRole('button', { name: 'Browse all symbols', exact: true }).click();
    await page.getByRole('button', { name: 'Centrifugal pump', exact: true }).click();
    await clickWorld(0, 0);
    await page.getByRole('button', { name: 'Select (SELECT)', exact: true }).click();
    await clickWorld(6, 0);
    await page
      .locator('.cad-prop-section > summary', { hasText: 'Symbol Attributes & TAG' })
      .click();
    const input = page.getByLabel('TAG', { exact: true });
    await input.fill('P-777');
    await input.press('Tab');
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].attributes.TAG)) === 'P-777',
      'TAG not committed',
    );
  });
  await check('Move connected block reroutes wire; copying preserves original', async () => {
    await reset(true);
    await page.evaluate(() => {
      window.cad.selected = new Set(['valve']);
    });
    for (const s of ['M', '30,0', '45,30']) await command(s);
    const data = await page.evaluate(() => {
      const d = window.cad.drawing;
      return {
        position: d.entities.find((e) => e.id === 'valve').position,
        last: d.entities.find((e) => e.id === 'wire').points.at(-1),
      };
    });
    assert(
      data.position.x === 45 && data.position.y === 30 && data.last.x === 35 && data.last.y === 30,
      'Wire did not follow block',
    );
    for (const s of ['CO', '45,30', '65,30']) await command(s);
    assert(
      (await page.evaluate(
        () => window.cad.drawing.entities.filter((e) => e.type === 'insert').length,
      )) === 3,
      'Copy failed',
    );
  });
  await check('W snaps to block ports and stores intelligent attachments', async () => {
    await reset(true);
    await command('W');
    await clickWorld(-20, 0);
    await clickWorld(20, 0);
    const wire = await page.evaluate(() => window.cad.drawing.entities.at(-1));
    assert(
      wire.type === 'wire' && wire.from.insertId === 'pump' && wire.from.portId === 'OUT',
      'Start port not attached',
    );
    assert(wire.to.insertId === 'valve' && wire.to.portId === 'IN', 'End port not attached');
    await command('UNDO');
    assert(
      (await page.evaluate(() => window.cad.drawing.entities.length)) === 8,
      'Wire transaction undo failed',
    );
  });
  await check('Free rotation, mirror and transactional undo', async () => {
    await reset();
    for (const s of ['L', '0,0', '10,0']) await command(s);
    await page.evaluate(
      () => (window.cad.selected = new Set(window.cad.drawing.entities.map((e) => e.id))),
    );
    for (const s of ['RO 45', '0,0', '']) await command(s);
    let e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(Math.abs(e.b.y - 7.0710678119) < 1e-7, 'Free rotation failed');
    for (const s of ['MI', '0,0', '10,0']) await command(s);
    e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(e.b.y < 0, 'Mirror failed');
    await command('UNDO');
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].b.y)) > 0,
      'Mirror undo failed',
    );
  });
  await check('Window and Crossing pointer drag selection', async () => {
    await reset();
    for (const s of ['L', '0,0', '10,0', 'L', '-20,10', '20,10', 'SELECT']) await command(s);
    await dragWorld({ x: -5, y: -5 }, { x: 15, y: 15 });
    assert(
      (await page.evaluate(() => window.cad.selected.size)) === 1,
      'Window selection incorrect',
    );
    await dragWorld({ x: 15, y: 15 }, { x: -5, y: -5 });
    assert(
      (await page.evaluate(() => window.cad.selected.size)) === 2,
      'Crossing selection incorrect',
    );
  });
  await check('Layer creation, ACI, lock and hidden-state history', async () => {
    await reset();
    await page.getByRole('button', { name: 'Layers', exact: true }).click();
    await page.getByRole('button', { name: '+ New layer', exact: true }).click();
    await page.getByRole('dialog').getByLabel('Name', { exact: true }).fill('ELECTRICAL');
    await page.getByRole('dialog').getByRole('button', { name: 'Apply', exact: true }).click();
    const row = page
      .locator('.cad-layer')
      .filter({ has: page.locator('input[value="ELECTRICAL"]') });
    const last = page.locator('.cad-layer').last();
    await last.locator('summary').click();
    await last.getByRole('spinbutton', { name: 'ACI color', exact: true }).fill('5');
    await last.getByRole('spinbutton', { name: 'ACI color', exact: true }).press('Tab');
    assert((await page.evaluate(() => window.cad.drawing.layers.at(-1).color)) === 5, 'ACI failed');
    await page.locator('.cad-layer').last().getByLabel('Locked', { exact: true }).check();
    assert(await page.evaluate(() => window.cad.drawing.layers.at(-1).locked), 'Lock failed');
    await command('UNDO');
    assert(
      !(await page.evaluate(() => window.cad.drawing.layers.at(-1).locked)),
      'Layer undo failed',
    );
  });
  await check('TR / EX edit via pointer tools', async () => {
    await reset();
    for (const s of ['L', '0,0', '20,0', 'L', '10,-20', '10,20']) await command(s);
    // One-click Smart Trim without pre-selecting boundary
    await command('TR');
    await clickWorld(2, 0);
    assert((await page.evaluate(() => window.cad.drawing.entities[0].a.x)) === 10, 'Trim failed');
    await command('UNDO');
    await page.evaluate(() => {
      window.cad.stack.execute('shorten', (d) => (d.entities[0].b.x = 5));
    });
    // One-click Smart Extend without pre-selecting boundary
    await command('EX');
    await clickWorld(4, 0);
    assert((await page.evaluate(() => window.cad.drawing.entities[0].b.x)) === 10, 'Extend failed');
  });
  await check('Default free lines, grid snap and zoom-independent mm step', async () => {
    await reset();
    assert(await page.evaluate(() => !window.cad.ortho), 'Free drawing not default');
    await command('L');
    await clickWorld(0, 0);
    await clickWorld(23, 17);
    let e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(Math.abs(e.b.x - 23) < 0.01 && Math.abs(e.b.y - 17) < 0.01, 'Diagonal constrained');
    await reset();
    await page.evaluate(() => {
      window.cad.gridSnap = true;
      window.cad.gridStep = 5;
      window.cad.osnap = false;
    });
    await command('L');
    await clickWorld(2, 1);
    await clickWorld(22, 17);
    e = await page.evaluate(() => window.cad.drawing.entities[0]);
    assert(e.a.x === 0 && e.a.y === 0 && e.b.x === 20 && e.b.y === 15, 'Grid snap wrong');
    await page.evaluate(() => {
      window.cad.renderer.camera.zoom(1.4, { x: 200, y: 200 });
    });
    await command('L');
    await clickWorld(-12, -7);
    await clickWorld(-22, -17);
    e = await page.evaluate(() => window.cad.drawing.entities.at(-1));
    assert(
      e.a.x === -10 && e.a.y === -5 && e.b.x === -20 && e.b.y === -15,
      'Step changed with zoom',
    );
    await page.evaluate(() => {
      window.cad.gridSnap = false;
      window.cad.osnap = true;
    });
  });
  await check('Current and selected line styles apply and undo', async () => {
    await reset();
    await page.getByRole('button', { name: 'Current linetype', exact: true }).click();
    await page
      .locator('.cad-ltype-popover:visible .cad-ltype-item', { hasText: 'Dotted' })
      .first()
      .click();
    for (const s of ['L', '0,0', '50,10']) await command(s);
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].lineType)) === 'DOTTED',
      'Current style lost',
    );
    await command('SELECT');
    await clickWorld(25, 5);
    await page.locator('.cad-prop-section > summary', { hasText: 'Appearance & Actions' }).click();
    await page.getByRole('button', { name: 'Selection linetype', exact: true }).click();
    await page
      .locator('.cad-ltype-popover:visible .cad-ltype-item', { hasText: 'Phantom' })
      .first()
      .click();
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].lineType)) === 'PHANTOM',
      'Selected style lost',
    );
    await command('UNDO');
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].lineType)) === 'DOTTED',
      'Style undo failed',
    );
    await page.getByRole('button', { name: 'Current linetype', exact: true }).click();
    await page
      .locator('.cad-ltype-popover:visible .cad-ltype-item', { hasText: 'By layer' })
      .first()
      .click();
  });
  await check('Library filters expose electrical single-line and process families', async () => {
    await reset();
    await page.getByRole('button', { name: 'Symbols', exact: true }).click();
    assert(
      (await page.locator('.cad-prop-section[open]').count()) === 0,
      'Symbols filters and palette should start collapsed by default',
    );
    await page.locator('.cad-prop-section > summary', { hasText: 'Filters' }).click();
    await page
      .getByRole('combobox', { name: 'Symbol library', exact: true })
      .selectOption('Electrical single-line');
    assert(
      (await page.getByRole('button', { name: 'Cable · 4 conductors', exact: true }).count()) === 1,
      'Single line cable missing',
    );
    assert(
      (await page.getByRole('button', { name: 'Centrifugal pump', exact: true }).count()) === 0,
      'Filter leaks process symbols',
    );
    await page
      .getByRole('combobox', { name: 'Symbol family', exact: true })
      .selectOption('Distribution');
    assert((await page.locator('.cad-symbol').count()) === 4, 'Family filter incorrect');
    await page.getByRole('combobox', { name: 'Symbol library', exact: true }).selectOption('P&ID');
    await page.getByRole('searchbox', { name: 'Search symbols', exact: true }).fill('pressure');
    assert((await page.locator('.cad-symbol').count()) >= 6, 'Search incomplete');
    await page.getByRole('searchbox', { name: 'Search symbols', exact: true }).fill('');
    await page.getByRole('combobox', { name: 'Symbol library', exact: true }).selectOption('');
  });
  await check(
    'Fullscreen expands, ignores Escape (exits only via button), and preserves geometry',
    async () => {
      await reset(true);
      const before = await page.evaluate(() => JSON.stringify(window.cad.drawing));
      await page.getByRole('button', { name: 'Full screen', exact: true }).click();
      assert((await page.locator('.cad-fullscreen').count()) === 1, 'No fullscreen');
      assert(
        await page.evaluate(() => window.cad.root.parentElement === document.body),
        'Fullscreen portal not on body',
      );
      await page.getByRole('button', { name: 'Line (L)', exact: true }).click();
      await page.keyboard.press('Escape');
      assert(
        (await page.evaluate(() => window.cad.tool)) === 'SELECT',
        'Escape did not cancel tool',
      );
      assert((await page.locator('.cad-fullscreen').count()) === 1, 'Escape exited fullscreen');
      await page.getByRole('button', { name: 'Exit', exact: true }).click();
      assert((await page.locator('.cad-fullscreen').count()) === 0, 'Exit button failed');
      assert(
        (await page.evaluate(() => JSON.stringify(window.cad.drawing))) === before,
        'Fullscreen changed geometry',
      );
      assert(
        (await page.evaluate(() => window.cad.root.parentElement.id)) === 'app',
        'Editor not restored',
      );
    },
  );
  await check('Tablet mode, numeric pad and themes', async () => {
    await reset(true);
    await page
      .getByRole('button', {
        name: 'Switch Desktop / Tablet mode',
        exact: true,
      })
      .click();
    assert(
      await page.locator('.cad-root').evaluate((e) => e.classList.contains('cad-tablet')),
      'Tablet mode missing',
    );
    await page.getByRole('button', { name: 'Exact length and angle', exact: true }).click();
    assert(await page.locator('.cad-numpad').isVisible(), 'Numeric pad missing');
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await page.getByRole('combobox', { name: 'Theme', exact: true }).selectOption('blueprint');
    if (process.env.CAD_SCREENSHOTS === '1')
      await page.screenshot({ path: 'tests/tablet.png', animations: 'disabled', timeout: 10000 });
    assert(
      (await page.evaluate(() => window.cad.renderer.theme)) === 'blueprint',
      'Theme not applied',
    );
  });
  await check('Two-finger pan/pinch does not create geometry', async () => {
    const before = await page.evaluate(() => ({
      count: window.cad.drawing.entities.length,
      scale: window.cad.renderer.camera.scale,
    }));
    const session = await page.context().newCDPSession(page);
    const r = await page.locator('canvas').boundingBox();
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [
        { x: r.x + 100, y: r.y + 100, id: 1 },
        { x: r.x + 200, y: r.y + 100, id: 2 },
      ],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [
        { x: r.x + 70, y: r.y + 130, id: 1 },
        { x: r.x + 250, y: r.y + 130, id: 2 },
      ],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    const after = await page.evaluate(() => ({
      count: window.cad.drawing.entities.length,
      scale: window.cad.renderer.camera.scale,
    }));
    assert(
      after.count === before.count && after.scale > before.scale,
      'Pinch changed geometry or did not zoom',
    );
    await session.detach();
  });
  await check('Pen pointer input creates geometry and renders snap feedback', async () => {
    await page.evaluate(() => {
      window.cad.load(window.cadEmpty());
      window.cad.setTool('L');
    });
    const session = await page.context().newCDPSession(page),
      r = await page.locator('canvas').boundingBox();
    for (const x of [r.x + 150, r.x + 220]) {
      await session.send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x,
        y: r.y + 150,
        button: 'left',
        clickCount: 1,
        pointerType: 'pen',
      });
      await session.send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x,
        y: r.y + 150,
        button: 'left',
        clickCount: 1,
        pointerType: 'pen',
      });
    }
    assert(
      (await page.evaluate(() => window.cad.drawing.entities.length)) === 1,
      'Pen drawing failed',
    );
    await session.detach();
  });
  await check(
    'Tablet finger pans; pen drag draws once; palms and cancel do not commit',
    async () => {
      await reset();
      await page.evaluate(() => window.cad.setTool('L'));
      const session = await page.context().newCDPSession(page),
        r = await page.locator('canvas').boundingBox();
      const x = r.x + 150,
        y = r.y + 160;
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x, y, id: 1 }],
      });
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x + 40, y: y + 20, id: 1 }],
      });
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      assert(
        (await page.evaluate(() => window.cad.drawing.entities.length)) === 0,
        'Finger drew in pen-only mode',
      );
      await session.send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x,
        y,
        button: 'left',
        buttons: 1,
        clickCount: 1,
        pointerType: 'pen',
      });
      await session.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: x + 90,
        y: y + 50,
        button: 'left',
        buttons: 1,
        pointerType: 'pen',
      });
      await page.locator('canvas').dispatchEvent('pointerdown', {
        pointerId: 999,
        pointerType: 'touch',
        width: 70,
        height: 70,
        clientX: x + 20,
        clientY: y + 10,
      });
      await session.send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x: x + 90,
        y: y + 50,
        button: 'left',
        buttons: 0,
        clickCount: 1,
        pointerType: 'pen',
      });
      const e = await page.evaluate(() => window.cad.drawing.entities[0]);
      assert(
        e?.type === 'line' && Math.abs(e.a.x - e.b.x) > 1 && Math.abs(e.a.y - e.b.y) > 1,
        'Pen drag failed',
      );
      assert(
        (await page.evaluate(() => window.cad.drawing.entities.length)) === 1,
        'Palm committed geometry',
      );
      await session.send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x,
        y,
        button: 'left',
        buttons: 1,
        clickCount: 1,
        pointerType: 'pen',
      });
      const pointerId = await page.evaluate(() => [...window.cad.pointers.keys()][0]);
      await page
        .locator('canvas')
        .dispatchEvent('pointercancel', { pointerId, pointerType: 'pen' });
      await session.send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x: x + 40,
        y: y + 20,
        button: 'left',
        buttons: 0,
        clickCount: 1,
        pointerType: 'pen',
      });
      assert(
        (await page.evaluate(() => window.cad.drawing.entities.length)) === 1,
        'Cancelled pen committed',
      );
      await session.detach();
    },
  );
  await check('Responsive tablet layout within viewport', async () => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await reset(true);
    if (process.env.CAD_SCREENSHOTS === '1')
      await page.screenshot({
        path: 'tests/tablet-portrait.png',
        animations: 'disabled',
        timeout: 10000,
      });
    assert(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      'Horizontal overflow',
    );
  });
  await check('DXF read-only banner leads to a genuinely editable drawing', async () => {
    await page.evaluate(() => window.cadReadOnly());
    assert(
      (await page.locator('.cad-mode-badge').innerText()) === 'DXF · READ ONLY',
      'DXF mode is ambiguous',
    );
    assert(
      await page.getByRole('button', { name: 'Line (L)', exact: true }).isDisabled(),
      'DXF tools appear editable',
    );
    const before = await page.evaluate(() => JSON.stringify(window.cad.drawing));
    await clickWorld(0, 0);
    await clickWorld(10, 10);
    assert(
      (await page.evaluate(() => JSON.stringify(window.cad.drawing))) === before,
      'Viewer modified DXF',
    );
    await page.getByRole('button', { name: 'Open editable drawing', exact: true }).click();
    assert(
      (await page.locator('.cad-mode-badge').innerText()) === 'CAD · EDITABLE',
      'Conversion did not enter editing mode',
    );
    assert(
      await page.getByRole('button', { name: 'Line (L)', exact: true }).isEnabled(),
      'Editing tools remain disabled',
    );
    await page.evaluate(() => window.cad.load(window.cadEmpty()));
    await page.getByRole('button', { name: 'Line (L)', exact: true }).click();
    await clickWorld(0, 0);
    await clickWorld(20, 10);
    // Single Line tool finishes after 2 points (does not chain endlessly)
    assert(
      (await page.evaluate(() => window.cad.drawing.entities.length)) === 1,
      'Single line creation failed',
    );
    assert(
      (await page.evaluate(() => window.cad.points.length)) === 0,
      'Single line should not keep chaining after 2 points',
    );
    await page.keyboard.press('Enter');
    assert((await page.evaluate(() => window.cad.tool)) === 'SELECT', 'Enter did not finish LINE');
    await page.keyboard.press('Enter');
    assert((await page.evaluate(() => window.cad.tool)) === 'L', 'Enter did not repeat LINE');
    await page.keyboard.press('Escape');
    assert((await page.evaluate(() => window.cad.tool)) === 'SELECT', 'Escape did not cancel');
    assert((await page.evaluate(() => window.cadCounters.converted)) === 1, 'Edit action missing');
  });
  await check(
    'CAD ribbon, layer control, command aliases, save and cancel remain operable',
    async () => {
      await page.evaluate(() => window.cadEditable());
      await reset();
      assert(
        (await page.getByRole('toolbar', { name: 'Drawing and modification tools' }).count()) === 1,
        'Ribbon missing',
      );
      const canvas = page.locator('canvas'),
        box = await canvas.boundingBox();
      assert(
        (await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.tagName, {
          x: box.x + box.width / 2,
          y: box.y + box.height / 2,
        })) === 'CANVAS',
        'An overlay blocks the drawing area',
      );
      await command('PLINE');
      await command('0,0');
      await command('20,15');
      await command('40,30');
      await command('');
      assert(
        (await page.evaluate(() => window.cad.drawing.entities[0].points.length)) === 3,
        'PLINE sequence failed',
      );
      await page
        .getByRole('combobox', { name: 'Current layer', exact: true })
        .selectOption('SIGNALS');
      await command('CIRCLE');
      await command('60,0');
      await command('5');
      await command('');
      assert(
        (await page.evaluate(() => window.cad.drawing.entities.at(-1).layer)) === 'SIGNALS',
        'Current layer control not applied',
      );
      await canvas.focus();
      await page.keyboard.press('Control+s');
      assert((await page.evaluate(() => window.cadCounters.saved)) > 0, 'Save shortcut failed');
      const english = await page.locator('.cad-root').innerText();
      assert(
        !/Seleziona|Libreria|Cerca simbolo|Pannelli|Ortogonale|Disegno/.test(english),
        'Italian UI remains visible',
      );
    },
  );
  await check('PLINE close and polyline vertex undo follow CAD command conventions', async () => {
    await page.evaluate(() => window.cadEditable());
    await reset();
    for (const value of ['PLINE', '0,0', '20,0', '20,20', 'CLOSE']) await command(value);
    assert(
      (await page.evaluate(() => window.cad.drawing.entities[0].closed)) === true,
      'PLINE close did not close',
    );
    assert((await page.evaluate(() => window.cad.tool)) === 'SELECT', 'Close did not finish');
    for (const value of ['PLINE', '40,0', '60,0', '80,0', 'U', '60,20', 'CLOSE'])
      await command(value);
    const poly = await page.evaluate(() => window.cad.drawing.entities.at(-1));
    assert(
      poly.type === 'polyline' &&
        poly.closed &&
        poly.points.length === 3 &&
        poly.points[2].y === 20,
      'Polyline vertex undo failed',
    );
    const input = page.getByRole('textbox', { name: 'CAD command line' });
    assert(
      (await input.getAttribute('placeholder')).startsWith('Command:'),
      'Command input is not English',
    );
    const themeOptions = await page
      .getByRole('combobox', { name: 'Theme', exact: true })
      .innerText();
    assert(!/autocad/i.test(themeOptions), 'Third-party CAD name found in theme dropdown');
    if (process.env.CAD_SCREENSHOTS === '1') {
      await page.evaluate(() => window.cadReadOnly());
      await page.screenshot({ path: 'tests/dxf-readonly.png' });
      await page.getByRole('button', { name: 'Open editable drawing', exact: true }).click();
    }
  });
  await check(
    'Move with Grid Snap, Multifunctional Grip Editing, Dynamic Input HUD, and Polar/Alignment',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await reset();
      // 1. Move with gridSnap = true does not self-snap onto original endpoints
      for (const s of ['L', '0,0', '20,0']) await command(s);
      await page.evaluate(() => {
        window.cad.gridSnap = true;
        window.cad.gridStep = 5;
        window.cad.selected = new Set([window.cad.drawing.entities[0].id]);
      });
      await command('M');
      await clickWorld(0, 0);
      await clickWorld(4.8, 5.1); // Should snap cleanly to (5, 5), NOT back to (0, 0)
      const moved = await page.evaluate(() => window.cad.drawing.entities[0]);
      assert(
        moved.a.x === 5 && moved.a.y === 5 && moved.b.x === 25 && moved.b.y === 5,
        `Move with Grid Snap failed: got (${moved.a.x}, ${moved.a.y})`,
      );
      await page.evaluate(() => (window.cad.gridSnap = false));

      // 2. Multifunctional Grip Editing: drag end grip of line from (25, 5) to (40, 5)
      await command('SELECT');
      await dragWorld({ x: 25, y: 5 }, { x: 40, y: 5 });
      const stretched = await page.evaluate(() => window.cad.drawing.entities[0]);
      assert(
        Math.abs(stretched.b.x - 40) < 1 && Math.abs(stretched.b.y - 5) < 1,
        `Grip stretch failed: got (${stretched.b.x}, ${stretched.b.y})`,
      );

      // 3. Dynamic Input HUD visibility during drawing
      await command('L');
      await clickWorld(0, -10);
      const r = await page.locator('canvas').boundingBox();
      await page.mouse.move(r.x + r.width / 2 + 60, r.y + r.height / 2);
      assert(await page.locator('.cad-dyn-hud').isVisible(), 'Dynamic Input HUD did not appear');
      await page.keyboard.press('Escape');
    },
  );
  await check(
    'Standards sub-tree filter, Library Manager, Dimension (DIM), Sheet & BOM, and unified Grid Snap',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);
      // Verify unified reference grid step does not shift when toggling gridSnap
      const stepCheck = await page.evaluate(() => {
        window.cad.gridStep = 5;
        window.cad.gridSnap = false;
        window.cad.render();
        const stepOff = window.cad.renderer.camera.visualGridStep(window.cad.renderer.gridStep);
        window.cad.gridSnap = true;
        window.cad.render();
        const stepOn = window.cad.renderer.camera.visualGridStep(window.cad.renderer.gridStep);
        window.cad.gridSnap = false;
        return { stepOff, stepOn };
      });
      assert(stepCheck.stepOff === 5 && stepCheck.stepOn === 5, 'Grid step shifted on snap toggle');

      // Verify DIM command creates a true millimeter dimension
      for (const s of ['DIM', '0,0', '35,0']) await command(s);
      const lastEnt = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(
        lastEnt.type === 'dimension' && lastEnt.b.x === 35,
        'Dimension entity was not created',
      );

      // Verify Symbol standard filter (NFPA 79, ANSI Y32, ISO 10628, ISO 14617, ANSI/ISA-5.1)
      await page.getByRole('button', { name: 'Symbols', exact: true }).click();
      await page.locator('.cad-prop-section > summary', { hasText: 'Filters' }).click();
      await page
        .getByRole('combobox', { name: 'Symbol standard', exact: true })
        .selectOption('NFPA 79');
      assert(
        (await page.locator('.cad-symbol').count()) >= 8,
        'NFPA 79 symbols missing from filter',
      );
      await page.getByRole('combobox', { name: 'Symbol standard', exact: true }).selectOption('');

      // Verify centralized Library Manager modal opens and creates a custom symbol
      await page.locator('.cad-prop-section > summary', { hasText: 'Library Tools' }).click();
      await page
        .getByRole('button', { name: 'Open centralized Library Manager', exact: true })
        .click();
      const modal = page.getByRole('dialog', { name: 'Centralized Library Manager' });
      assert(await modal.isVisible(), 'Library Manager modal did not open');
      await modal.getByLabel('Symbol name').fill('Turbine Generator');
      await modal.getByRole('button', { name: 'Create Symbol in Library' }).click();
      assert(
        await page.evaluate(() =>
          window.cad.drawing.blocks.some((b) => b.name === 'Turbine Generator'),
        ),
        'Custom symbol not added to library',
      );

      // Verify Sheet & BOM tab renders title block controls and BOM preview
      await page.getByRole('button', { name: 'Sheet & BOM', exact: true }).click();
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Bill of Materials (BOM)' })
        .click();
      assert(
        (await page.locator('.cad-bom-row').count()) >= 2,
        'Live BOM preview rows missing in Sheet & BOM tab',
      );
    },
  );
  await check(
    'Polyline grid snap, Insert labelStyle UI, Obsidian Adaptive theme, Color pickers, Compressed Toolbar & Virtual Title Block',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Compressed toolbar: no redundant direct New/Save buttons; Export dropdown & canvas zoom HUD exist
      assert(
        (await page.locator('.cad-toolbar > button:has-text("New")').count()) === 0,
        'New button removed',
      );
      assert(
        (await page.locator('.cad-toolbar > button:has-text("Save")').count()) === 0,
        'Save button removed',
      );
      assert((await page.locator('.cad-zoom-hud button').count()) === 3, 'Canvas zoom HUD present');
      await page.getByRole('button', { name: 'Import & Export' }).click();
      assert(await page.locator('.cad-dropdown-menu').isVisible(), 'Export dropdown opens');
      await page.getByRole('button', { name: 'Import & Export' }).click();

      // 2) Current color selector creates colored geometry
      await page.getByRole('combobox', { name: 'Current color' }).selectOption('1');

      // 3) Polyline with gridSnap ON ignores off-grid tracking anchors and snaps vertices strictly to 5 mm grid
      await page.evaluate(() => {
        window.cad.gridStep = 5;
        window.cad.gridSnap = true;
        window.cad.tracking = true;
        window.cad.drawing.entities.push({
          id: 'offgrid-ref',
          type: 'line',
          layer: '0',
          a: { x: 112.37, y: 18.41 },
          b: { x: 162.63, y: 18.41 },
        });
        window.cad.snapIndex.rebuild(window.cad.drawing);
        window.cad.render();
      });
      await page.getByRole('button', { name: /Polyline/i }).click();
      const box = await page.locator('.cad-canvas').boundingBox();
      await page.mouse.click(box.x + 217, box.y + 193);
      await page.mouse.click(box.x + 343, box.y + 197);
      await page.mouse.click(box.x + 343, box.y + 271);
      await command('');
      const pl = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(pl?.type === 'polyline' && pl.points.length === 3, 'Polyline committed');
      assert(pl.color === 1, 'Current color (Red=1) applied to new polyline');
      for (const pt of pl.points) {
        assert(
          Math.abs(pt.x - Math.round(pt.x / 5) * 5) < 1e-4 &&
            Math.abs(pt.y - Math.round(pt.y / 5) * 5) < 1e-4,
          `Polyline vertex (${pt.x}, ${pt.y}) drifted off 5 mm grid`,
        );
      }

      // 4) Insert labelStyle UI controls & Selection color
      await page.evaluate(() => {
        const pump = window.cad.drawing.entities.find((e) => e.id === 'pump');
        window.cad.selected = new Set([pump.id]);
        window.cad.render();
      });
      await page.getByRole('button', { name: 'Properties', exact: true }).click();
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Label & Text Options' })
        .click();
      await page.getByRole('combobox', { name: 'Label placement' }).selectOption('top-left');
      await page.getByRole('combobox', { name: 'Label orientation' }).selectOption('vertical');
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Appearance & Actions' })
        .click();
      await page.getByRole('combobox', { name: 'Selection color' }).selectOption('3');
      const updatedPump = await page.evaluate(() =>
        window.cad.drawing.entities.find((e) => e.id === 'pump'),
      );
      assert(updatedPump.labelStyle?.anchor === 'top-left', 'Label anchor updated');
      assert(updatedPump.labelStyle?.textRotation === 90, 'Label vertical rotation updated');
      assert(updatedPump.color === 3, 'Selection color updated');

      // 5) Obsidian Adaptive theme reads host light CSS variables and adapts canvas pixels
      await page.evaluate(() => {
        document.body.style.setProperty('--background-primary', '#ffffff');
        document.body.style.setProperty('--background-secondary', '#f4f6f8');
        document.body.style.setProperty('--text-normal', '#111111');
        window.cad.drawing.sheet = {
          ...(window.cad.drawing.sheet ?? {}),
          enabled: true,
          titleBlockMode: 'virtual',
        };
        window.cad.setFrontmatter({ 'cad-project': 'Adaptive Unit', owner: 'Team A' });
      });
      await page.getByRole('combobox', { name: 'Theme' }).selectOption('adaptive');
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
      );
      const themeCheck = await page.evaluate(() => {
        const c = document.querySelector('.cad-canvas');
        const ctx = c.getContext('2d');
        const px = ctx.getImageData(4, 4, 1, 1).data;
        const vtb = document.querySelector('.cad-virtual-titleblock');
        return {
          r: px[0],
          g: px[1],
          b: px[2],
          vtbHidden: vtb.hidden,
          vtbText: vtb.textContent,
          attr: document.querySelector('.cad-root').getAttribute('data-theme'),
        };
      });
      assert(themeCheck.attr === 'adaptive', 'Root data-theme set to adaptive');
      assert(
        themeCheck.r > 230 && themeCheck.g > 230 && themeCheck.b > 230,
        'Canvas adapted to light Obsidian background',
      );
      assert(
        !themeCheck.vtbHidden && themeCheck.vtbText.includes('Adaptive Unit'),
        'Virtual title block HUD displays YAML metadata',
      );
      await page.evaluate(() => {
        document.body.style.removeProperty('--background-primary');
        document.body.style.removeProperty('--background-secondary');
        document.body.style.removeProperty('--text-normal');
      });
    },
  );
  await check(
    'Delayed pen loupe, iPad multi-touch Undo/Redo taps, General Settings modal, Visio humps & readable Tablet UI',
    async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Open General Settings (gear icon) and configure Visio humps + project defaults
      await page.getByRole('button', { name: 'General settings', exact: true }).click();
      const settingsDialog = page.getByRole('dialog', { name: 'General Project Settings' });
      assert(await settingsDialog.isVisible(), 'General Settings modal did not open');
      await settingsDialog.getByRole('spinbutton', { name: 'Default label text height' }).fill('5');
      await settingsDialog
        .getByRole('spinbutton', { name: 'Default label text height' })
        .dispatchEvent('change');
      await settingsDialog.getByRole('checkbox', { name: 'Enable line cross-over humps' }).check();
      await settingsDialog.getByRole('button', { name: 'Close', exact: true }).click();
      const psState = await page.evaluate(() => window.cad.drawing.projectSettings);
      assert(psState?.lineJumps === true, 'Visio cross-over humps option did not persist');
      assert(psState?.defaultTextHeight === 5, 'Default text height did not persist');

      // 2) Tablet compact layout check + readable numeric inputs in Inspector
      await page.getByRole('button', { name: /Desktop|Tablet/i }).click();
      await page.waitForTimeout(50);
      const layoutMetrics = await page.evaluate(() => {
        const ribbon = document.querySelector('.cad-ribbon').getBoundingClientRect();
        const stage = document.querySelector('.cad-stage').getBoundingClientRect();
        return { ribbonW: ribbon.width, stageW: stage.width };
      });
      assert(layoutMetrics.ribbonW <= 48, `Tablet ribbon too wide (${layoutMetrics.ribbonW}px)`);
      assert(layoutMetrics.stageW >= 700, `Canvas stage too narrow (${layoutMetrics.stageW}px)`);

      await page.getByRole('button', { name: 'Panels', exact: true }).click();
      await page.getByRole('button', { name: 'Layers', exact: true }).click();
      await page.locator('.cad-layer summary').first().click();
      const numBox = await page.locator('.cad-layer input[type="number"]').first().boundingBox();
      assert(
        numBox.width >= 70 && numBox.height >= 30,
        'Layer ACI number input too narrow to read',
      );
      // Close drawer by toggling Panels button
      await page.getByRole('button', { name: 'Panels', exact: true }).click();

      // 3) Delayed Apple Pencil loupe: immediate hover/down keeps loupe hidden, hold opens after delay
      const canvasBox = await page.locator('.cad-canvas').boundingBox();
      const immediateLoupe = await page.evaluate(
        ({ x, y }) => {
          window.cad.penLoupeDelayMs = 80;
          const ev = new PointerEvent('pointermove', {
            bubbles: true,
            pointerId: 71,
            pointerType: 'pen',
            clientX: x,
            clientY: y,
          });
          window.cad.canvas.dispatchEvent(ev);
          return window.cad.penLoupeVisible;
        },
        { x: canvasBox.x + 220, y: canvasBox.y + 220 },
      );
      assert(immediateLoupe === false, 'Pen loupe must NOT open immediately on pen hover/down');
      await page.waitForTimeout(130);
      const delayedLoupe = await page.evaluate(() => window.cad.penLoupeVisible);
      assert(delayedLoupe === true, 'Pen loupe should open after holding steady for delay');
      await page.evaluate(
        ({ x, y }) => {
          window.cad.canvas.dispatchEvent(
            new PointerEvent('pointerleave', {
              bubbles: true,
              pointerId: 71,
              pointerType: 'pen',
              clientX: x,
              clientY: y,
            }),
          );
        },
        { x: canvasBox.x + 220, y: canvasBox.y + 220 },
      );

      // 4) Multi-touch gestures: 2-finger tap = Undo, 3-finger tap = Redo
      await page.evaluate(() => {
        for (const s of ['L', '0,0', '50,0', '']) window.cad.executeCommand(s);
      });
      const beforeCount = await page.evaluate(() => window.cad.drawing.entities.length);
      await page.evaluate(
        ({ x, y }) => {
          const c = window.cad.canvas;
          for (const [id, dx] of [
            [101, 0],
            [102, 24],
          ]) {
            c.dispatchEvent(
              new PointerEvent('pointerdown', {
                bubbles: true,
                pointerId: id,
                pointerType: 'touch',
                clientX: x + dx,
                clientY: y,
              }),
            );
          }
          for (const [id, dx] of [
            [101, 0],
            [102, 24],
          ]) {
            c.dispatchEvent(
              new PointerEvent('pointerup', {
                bubbles: true,
                pointerId: id,
                pointerType: 'touch',
                clientX: x + dx,
                clientY: y,
              }),
            );
          }
        },
        { x: canvasBox.x + 200, y: canvasBox.y + 200 },
      );
      const afterUndo = await page.evaluate(() => window.cad.drawing.entities.length);
      assert(afterUndo === beforeCount - 1, 'Two-finger quick tap should Undo');

      await page.evaluate(
        ({ x, y }) => {
          const c = window.cad.canvas;
          for (const [id, dx] of [
            [201, 0],
            [202, 20],
            [203, 40],
          ]) {
            c.dispatchEvent(
              new PointerEvent('pointerdown', {
                bubbles: true,
                pointerId: id,
                pointerType: 'touch',
                clientX: x + dx,
                clientY: y,
              }),
            );
          }
          for (const [id, dx] of [
            [201, 0],
            [202, 20],
            [203, 40],
          ]) {
            c.dispatchEvent(
              new PointerEvent('pointerup', {
                bubbles: true,
                pointerId: id,
                pointerType: 'touch',
                clientX: x + dx,
                clientY: y,
              }),
            );
          }
        },
        { x: canvasBox.x + 200, y: canvasBox.y + 200 },
      );
      const afterRedo = await page.evaluate(() => window.cad.drawing.entities.length);
      assert(afterRedo === beforeCount, 'Three-finger quick tap should Redo');
    },
  );
  await check(
    'Mouse Copy places at cursor & increments BOM TAG, Mouse Move drags directly, Group/Ungroup & Visual Linetype spacing',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Visual Linetype Popover opens & custom dash/gap spacing applies
      await page.locator('.cad-toolbar .cad-ltype-btn').click();
      const pop = page.locator('.cad-ltype-popover');
      assert(await pop.isVisible(), 'Visual linetype popover did not open');
      assert(
        (await pop.locator('.cad-ltype-svg').count()) >= 10,
        'Missing SVG linetype preview icons',
      );
      await pop.getByRole('spinbutton', { name: 'Dash length mm' }).fill('9');
      await pop.getByRole('spinbutton', { name: 'Gap space mm' }).fill('4');
      await pop.getByRole('button', { name: 'Apply' }).click();
      for (const s of ['L', '0,20', '40,20', '']) await command(s);
      const customLine = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(
        customLine.type === 'line' &&
          customLine.linePattern?.[0] === 9 &&
          customLine.linePattern?.[1] === -4,
        'Custom dash/gap pattern did not apply to drawn line',
      );

      // 2) Copy (CO) by single click at cursor places away from original and increments TAG XV4 -> XV5
      await page.evaluate(() => {
        const v = window.cad.drawing.entities.find((e) => e.id === 'valve');
        v.attributes.TAG = 'XV4';
        window.cad.selected = new Set(['valve']);
        window.cad.setTool('CO');
      });
      await clickWorld(50, 22);
      const copied = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(
        copied.type === 'insert' &&
          copied.attributes.TAG === 'XV5' &&
          Math.abs(copied.position.x - 50) < 5 &&
          Math.abs(copied.position.y - 22) < 5,
        `Mouse Copy did not place at pointer or increment XV4 -> XV5 (got ${copied.attributes?.TAG} at ${copied.position?.x},${copied.position?.y})`,
      );

      // 3) Mouse Move (M): grabbing directly on an object and dragging moves it under cursor
      await page.evaluate(() => {
        window.cad.selected.clear();
        window.cad.setTool('M');
      });
      await dragWorld({ x: 50, y: 22 }, { x: 50, y: 36 });
      const moved = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(Math.abs(moved.position.y - 36) < 5, 'Mouse Move drag did not move clicked object');

      // 4) Group & Ungroup commands decompose symbol into editable shapes
      const beforeExplode = await page.evaluate(() => window.cad.drawing.entities.length);
      await page.evaluate(() => {
        const copyId = window.cad.drawing.entities.at(-1).id;
        window.cad.selected = new Set([copyId]);
      });
      await command('UNGROUP');
      const afterUngroup = await page.evaluate(() => window.cad.drawing.entities.length);
      assert(afterUngroup > beforeExplode, 'UNGROUP did not decompose symbol into shapes');
    },
  );
  await check(
    'iPad Touch Navigation: 1-finger pan (65px finger, pen hover safe), 2-finger pinch+pan, 2->1 finger continuation',
    async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);
      for (const s of ['L', '0,0', '20,0', '']) await command(s);
      await page.evaluate(() => {
        window.cad.setTool('L');
        // Explicitly test even when tablet toggle is false (e.g. Stage Manager / synced desktop flag)
        window.cad.tablet = false;
        window.cad.penOnly = true;
      });
      const box = await page.locator('canvas').boundingBox();
      const before = await page.evaluate(() => ({
        cx: window.cad.renderer.camera.center.x,
        cy: window.cad.renderer.camera.center.y,
        scale: window.cad.renderer.camera.scale,
        count: window.cad.drawing.entities.length,
      }));

      // 1) Wide 1-finger drag (width: 65, height: 65) + concurrent pen hover must still pan cleanly
      await page.evaluate(
        ({ x, y }) => {
          const c = document.querySelector('canvas');
          c.dispatchEvent(
            new PointerEvent('pointerdown', {
              bubbles: true,
              pointerId: 301,
              pointerType: 'touch',
              width: 65,
              height: 65,
              clientX: x,
              clientY: y,
            }),
          );
          // Simulated Apple Pencil hover nearby during finger pan
          c.dispatchEvent(
            new PointerEvent('pointermove', {
              bubbles: true,
              pointerId: 999,
              pointerType: 'pen',
              buttons: 0,
              clientX: x + 20,
              clientY: y + 20,
            }),
          );
          c.dispatchEvent(
            new PointerEvent('pointermove', {
              bubbles: true,
              pointerId: 301,
              pointerType: 'touch',
              width: 65,
              height: 65,
              clientX: x + 60,
              clientY: y + 40,
            }),
          );
          c.dispatchEvent(
            new PointerEvent('pointerup', {
              bubbles: true,
              pointerId: 301,
              pointerType: 'touch',
              width: 65,
              height: 65,
              clientX: x + 60,
              clientY: y + 40,
            }),
          );
        },
        { x: box.x + 200, y: box.y + 200 },
      );

      const afterOneFinger = await page.evaluate(() => ({
        cx: window.cad.renderer.camera.center.x,
        cy: window.cad.renderer.camera.center.y,
        count: window.cad.drawing.entities.length,
      }));
      assert(
        afterOneFinger.count === before.count &&
          Math.hypot(afterOneFinger.cx - before.cx, afterOneFinger.cy - before.cy) > 1,
        'One-finger pan failed or drew unwanted entity',
      );

      // 2) Two-finger pinch-zoom + lift finger 1 + continue panning smoothly with finger 2
      const beforePinch = await page.evaluate(() => ({
        cx: window.cad.renderer.camera.center.x,
        cy: window.cad.renderer.camera.center.y,
        scale: window.cad.renderer.camera.scale,
      }));
      await page.evaluate(
        ({ x, y }) => {
          const c = document.querySelector('canvas');
          c.dispatchEvent(
            new PointerEvent('pointerdown', {
              bubbles: true,
              pointerId: 401,
              pointerType: 'touch',
              clientX: x - 40,
              clientY: y,
            }),
          );
          c.dispatchEvent(
            new PointerEvent('pointerdown', {
              bubbles: true,
              pointerId: 402,
              pointerType: 'touch',
              clientX: x + 40,
              clientY: y,
            }),
          );
          // Pinch outward across multiple small ProMotion-like steps (must NOT trigger 2-finger Undo!)
          for (let i = 1; i <= 5; i++) {
            c.dispatchEvent(
              new PointerEvent('pointermove', {
                bubbles: true,
                pointerId: 401,
                pointerType: 'touch',
                clientX: x - 40 - i * 8,
                clientY: y,
              }),
            );
            c.dispatchEvent(
              new PointerEvent('pointermove', {
                bubbles: true,
                pointerId: 402,
                pointerType: 'touch',
                clientX: x + 40 + i * 8,
                clientY: y,
              }),
            );
          }
          // Lift finger 1 (401), then drag remaining finger 2 (402)
          c.dispatchEvent(
            new PointerEvent('pointerup', {
              bubbles: true,
              pointerId: 401,
              pointerType: 'touch',
              clientX: x - 80,
              clientY: y,
            }),
          );
        },
        { x: box.x + 220, y: box.y + 240 },
      );
      const afterPinchScale = await page.evaluate(() => ({
        cx: window.cad.renderer.camera.center.x,
        scale: window.cad.renderer.camera.scale,
        count: window.cad.drawing.entities.length,
      }));
      assert(afterPinchScale.scale > beforePinch.scale * 1.3, 'Two-finger pinch-zoom did not zoom');
      assert(afterPinchScale.count === before.count, 'Quick pinch falsely triggered Undo');

      await page.evaluate(
        ({ x, y }) => {
          const c = document.querySelector('canvas');
          c.dispatchEvent(
            new PointerEvent('pointermove', {
              bubbles: true,
              pointerId: 402,
              pointerType: 'touch',
              clientX: x + 150,
              clientY: y + 30,
            }),
          );
          c.dispatchEvent(
            new PointerEvent('pointerup', {
              bubbles: true,
              pointerId: 402,
              pointerType: 'touch',
              clientX: x + 150,
              clientY: y + 30,
            }),
          );
        },
        { x: box.x + 220, y: box.y + 240 },
      );
      const afterContinue = await page.evaluate(() => window.cad.renderer.camera.center.x);
      assert(
        Math.abs(afterContinue - afterPinchScale.cx) > 2,
        'Continued 1-finger pan after lifting 1 of 2 fingers stalled',
      );
    },
  );
  await check(
    'Post-draw measure tab, Match Prop, Scale (SC), Offset Inside/Outside/Both, Shortcuts/Mouse settings, Multi-Page, Print Fit & Find Layer Highlight',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Post-Dim starts OFF by default -> drawing does not popup until toggled ON in bottom bar
      const postDimBtn = page.locator('.cad-precision button', { hasText: 'Post-Dim' });
      assert(
        (await postDimBtn.getAttribute('aria-pressed')) === 'false',
        'Post-Dim should start OFF by default',
      );
      await postDimBtn.click();
      for (const s of ['L', '0,0', '30,0', '']) await command(s);
      const postTab = page.locator('.cad-post-dim-tab');
      assert(await postTab.isVisible(), 'Post-draw measurement tab did not appear after line');
      await postTab.getByLabel('Post-draw line length').fill('75');
      await postTab.getByRole('button', { name: 'Apply' }).click();
      const adjusted = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(Math.abs(adjusted.b.x - 75) < 0.1, 'Post-draw measure tab did not update line length');

      // 2) Match Properties (MA) copies layer/color/linetype from source to target
      await page.evaluate(() => {
        window.cad.drawing.entities.push(
          {
            id: 'ma-src',
            type: 'line',
            layer: '0',
            color: 5,
            lineType: 'DASHED',
            a: { x: -20, y: -5 },
            b: { x: 20, y: -5 },
          },
          {
            id: 'ma-dst',
            type: 'line',
            layer: '0',
            a: { x: -20, y: -15 },
            b: { x: 20, y: -15 },
          },
        );
        window.cad.fit();
        window.cad.setTool('MA');
      });
      await clickWorld(0, -5);
      await clickWorld(0, -15);
      const maDst = await page.evaluate(() =>
        window.cad.drawing.entities.find((e) => e.id === 'ma-dst'),
      );
      assert(maDst.color === 5 && maDst.lineType === 'DASHED', 'MA failed to copy properties');

      // 3) Scale command (SC) scales selected circle cleanly
      await page.evaluate(() => {
        window.cad.drawing.entities.push({
          id: 'sc-circ',
          type: 'circle',
          layer: '0',
          center: { x: 100, y: 0 },
          radius: 10,
        });
        window.cad.selected = new Set(['sc-circ']);
      });
      await command('SC');
      await command('2.5');
      const scaled = await page.evaluate(() =>
        window.cad.drawing.entities.find((e) => e.id === 'sc-circ'),
      );
      assert(Math.abs(scaled.radius - 25) < 0.01, 'SC command did not scale circle');

      // 4) Offset tool bar supports Inside / Outside / Both sides on closed rectangle
      await page.evaluate(() => {
        window.cad.drawing.entities.push({
          id: 'off-rect',
          type: 'polyline',
          layer: '0',
          points: [
            { x: 120, y: -10 },
            { x: 160, y: -10 },
            { x: 160, y: 10 },
            { x: 120, y: 10 },
          ],
          closed: true,
        });
        window.cad.selected = new Set(['off-rect']);
        window.cad.setTool('O');
      });
      const optsBar = page.locator('.cad-tool-options');
      assert(await optsBar.isVisible(), 'Offset options bar missing');
      await optsBar.getByLabel('Offset distance mm').fill('2');
      await optsBar.getByRole('button', { name: 'Both sides' }).click();
      const beforeOffCount = await page.evaluate(() => window.cad.drawing.entities.length);
      await optsBar.getByRole('button', { name: 'Apply to Selection' }).click();
      const afterOffCount = await page.evaluate(() => window.cad.drawing.entities.length);
      assert(afterOffCount === beforeOffCount + 2, 'Offset Both sides did not add 2 shapes');

      // 5) Keyboard F3/F8/F9 defaults + configurable shortcuts & mouse inside General Settings
      await page.evaluate(() => {
        window.cad.setTool('SELECT');
        window.cad.canvas.focus();
      });
      const osnapBefore = await page.evaluate(() => window.cad.osnap);
      await page.keyboard.press('F3');
      assert(
        (await page.evaluate(() => window.cad.osnap)) === !osnapBefore,
        'F3 did not toggle OSNAP',
      );
      const orthoBefore = await page.evaluate(() => window.cad.ortho);
      await page.keyboard.press('F8');
      assert(
        (await page.evaluate(() => window.cad.ortho)) === !orthoBefore,
        'F8 did not toggle ORTHO',
      );
      const snapBefore = await page.evaluate(() => window.cad.gridSnap);
      await page.keyboard.press('F9');
      assert(
        (await page.evaluate(() => window.cad.gridSnap)) === !snapBefore,
        'F9 did not toggle SNAP',
      );

      await page.locator('.cad-toolbar button[aria-label="General settings"]').click();
      const genModal = page.locator('[role="dialog"][aria-label="General Project Settings"]');
      assert(await genModal.isVisible());
      await genModal
        .locator('.cad-settings-summary', {
          hasText: 'Shortcuts, Command Aliases & Mouse Controls',
        })
        .click();
      await genModal.getByLabel('Mouse middle-button behavior').selectOption('zoom_extents');
      await genModal.getByLabel('Custom command abbreviations').fill('LN=LINE');
      await genModal.getByRole('button', { name: 'Close' }).click();
      await command('LN');
      assert((await page.evaluate(() => window.cad.tool)) === 'L', 'Custom alias LN=LINE failed');
      await page.keyboard.press('Escape');

      // 6) Multi-Page tabs bar adds & switches schematic pages cleanly
      await page.locator('.cad-page-bar .cad-page-add').click();
      assert(
        (await page.evaluate(() => window.cad.drawing.pages?.length ?? 0)) === 2,
        'Add Page button did not create 2nd page',
      );
      await page.locator('.cad-page-bar .cad-page-tab').first().click();

      // 7) Find modal highlights object Layer and jumps to it
      await command('FIND');
      const findDlg = page.locator('[role="dialog"][aria-label="Find Objects and Layers"]');
      assert(await findDlg.isVisible());
      await findDlg.getByLabel('Search drawing query').fill('FV-101');
      assert(
        (await findDlg.locator('.cad-layer-badge').first().textContent()).includes('Layer: 0'),
        'Find result missing Layer badge',
      );
      await findDlg.getByRole('button', { name: 'Go to & Select' }).first().click();
      assert(
        (await page.evaluate(() => window.cad.selected.has('valve'))) === true,
        'Go to & Select did not select matched object',
      );

      // 8) Print / Standard Paper Scaling modal calculates adapted sheet fit
      await command('PRINT');
      const printDlg = page.locator('[role="dialog"][aria-label="Print & Standard Sheet Scaling"]');
      assert(await printDlg.isVisible());
      await printDlg.getByLabel('Print paper size').selectOption('A4');
      await printDlg.getByLabel('Print scaling mode').selectOption('fit_snap');
      assert(
        (await printDlg.textContent()).includes('Adapted for Print: A4'),
        'Print scaling preview missing adapted standard sheet info',
      );
      await printDlg.getByRole('button', { name: 'Close' }).click();
    },
  );
  await check(
    'Single-line Desktop toolbar, no phantom pills, readable focused inputs, Tablet Export menu, Line Arrows, Density & Bridge Jumps',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Hidden tool/post-draw pills must NOT have bounding box on canvas (fixes Image 1 mystery pill)
      assert(
        (await page.locator('.cad-tool-options').boundingBox()) === null &&
          (await page.locator('.cad-post-dim-tab').boundingBox()) === null,
        'Hidden floating pills must have display:none',
      );

      // 2) Desktop toolbar fits in compact single horizontal row (fixes Image 3)
      const tbWrap = await page.evaluate(
        () => getComputedStyle(document.querySelector('.cad-toolbar')).flexWrap,
      );
      assert(tbWrap === 'nowrap', `Expected single-row toolbar nowrap, got ${tbWrap}`);

      // 3) Focused command line uses dark theme background instead of white (fixes Image 4)
      await page.locator('.cad-command').focus();
      const cmdBg = await page.evaluate(
        () => getComputedStyle(document.querySelector('.cad-command')).backgroundColor,
      );
      assert(cmdBg !== 'rgb(255, 255, 255)', `Command input must not turn white: ${cmdBg}`);

      // 4) Default grid step is 1 mm and clicking status "grid X mm" updates it cleanly
      assert(
        (await page.evaluate(() => window.cad.gridStep)) === 1,
        'Default grid step should be 1 mm',
      );
      await page.locator('.cad-status-grid').click();
      const gridModal = page.locator('[role="dialog"][aria-label="Grid spacing"]');
      assert(await gridModal.isVisible());
      await gridModal.locator('input').fill('2.5');
      await gridModal.getByRole('button', { name: 'Apply' }).click();
      assert(
        (await page.evaluate(() => window.cad.gridStep)) === 2.5 &&
          (await page.locator('.cad-status-grid').textContent()).includes('2.5 mm'),
      );

      // 5) Jumps toggle + Bridge (J) tool opens interactive crossing popover with Vertical/Horizontal flip
      await page.evaluate(() => {
        window.cad.drawing.entities = [
          { id: 'c1', type: 'line', layer: '0', a: { x: 0, y: 15 }, b: { x: 40, y: 15 } },
          { id: 'c2', type: 'line', layer: '0', a: { x: 20, y: 0 }, b: { x: 20, y: 30 } },
        ];
        window.cad.fit();
        window.cad.setTool('J');
      });
      await clickWorld(20, 15);
      const bridgePop = page.locator('.cad-bridge-popover');
      assert(await bridgePop.isVisible(), 'Bridge intersection popover did not open');
      await bridgePop.getByRole('button', { name: /Bridge:/ }).click();
      assert(
        (await page.evaluate(() => (window.cad.drawing.manualJumpKeys ?? []).length)) === 1,
        'Bridge popover did not enable intersection jump',
      );
      await bridgePop.getByRole('button', { name: /Vertical/ }).click();
      assert(
        (await page.evaluate(
          () => Object.values(window.cad.drawing.jumpDirectionOverrides ?? {})[0],
        )) === 'vertical',
        'Bridge popover did not set Vertical jump axis',
      );
      await bridgePop.getByRole('button', { name: 'Close bridge popover' }).click();
      await page.locator('.cad-precision button', { hasText: 'Jumps' }).click();
      assert(
        (await page.evaluate(() => !!window.cad.drawing.projectSettings?.lineJumps)) === true,
        'Jumps precision toggle did not enable default bridges',
      );

      // 6) Linetype Fine 0.5x density + Default Arrows (every_n, N=4, Reverse) on new line
      await page.locator('.cad-toolbar .cad-ltype-btn').click();
      const pop = page.locator('.cad-ltype-popover');
      assert(await pop.isVisible());
      await pop.getByRole('button', { name: 'Fine 0.5×' }).click();
      await page.locator('.cad-toolbar .cad-ltype-btn').click();
      await pop.getByLabel('Default arrow style').selectOption('closed');
      await pop.getByLabel('Default arrow placement').selectOption('every_n');
      await pop.getByLabel('Default arrow subdivisions N').fill('4');
      await pop.getByRole('button', { name: /Reverse/ }).click();
      await page.locator('canvas').click({ position: { x: 10, y: 10 }, force: true });
      for (const s of ['L', '0,0', '40,0', '']) await command(s);
      const arrowLine = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(
        arrowLine.arrows?.style === 'closed' &&
          arrowLine.arrows?.placement === 'every_n' &&
          arrowLine.arrows?.segments === 4 &&
          arrowLine.arrows?.reversed === true,
        'Arrows and custom dash density did not apply to drawn line',
      );

      // 7) Tablet viewport: Export menu must NOT be clipped by scrollable toolbar!
      await page.setViewportSize({ width: 768, height: 1024 });
      await reset(true);
      await page.locator('.cad-toolbar .cad-menu-wrap button').click();
      const dxfExportItem = page.locator('.cad-dropdown-menu button', { hasText: 'Export DXF' });
      const box = await dxfExportItem.boundingBox();
      assert(box && box.width > 50 && box.height > 20, 'Export menu clipped on tablet viewport');
      await page.keyboard.press('Escape');
    },
  );
  await check(
    'Context-anchored post-draw tab, N!=2 live arrows, large linetype SVGs, collapsible accordions, polyline gridSnap, 1-finger tap selection, dockable/floating panels & Piping notes',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Large readable linetype SVGs (>=50px trigger, >=80px popover list)
      const svgW = await page.evaluate(
        () => document.querySelector('.cad-toolbar .cad-ltype-svg').getBoundingClientRect().width,
      );
      assert(svgW >= 54, `Expected larger linetype preview button width >=54, got ${svgW}`);

      // 2) Piping discipline preset + Line Notes applied when drawing line + context-anchored compact post-draw tab
      await page.locator('.cad-toolbar .cad-ltype-btn').click();
      const pop = page.locator('.cad-ltype-popover');
      await pop.getByRole('button', { name: 'Piping (P&ID)' }).click();
      await pop.getByRole('button', { name: /Primary Process Line/ }).click();
      await pop.getByLabel('Default discipline line notes').fill('Steam condensate 4 bar');
      await page.locator('canvas').click({ position: { x: 10, y: 10 }, force: true });
      await page.locator('.cad-precision button', { hasText: 'Post-Dim' }).click();
      await command('L');
      await clickWorld(0, 20);
      await clickWorld(40, 20);
      const postTab = page.locator('.cad-post-dim-tab');
      assert(await postTab.isVisible(), 'Context-anchored post-draw tab missing');
      const tabPos = await page.evaluate(() => {
        const t = document.querySelector('.cad-post-dim-tab');
        const st = document.querySelector('.cad-stage').getBoundingClientRect();
        const r = t.getBoundingClientRect();
        const lineScr = window.cad.renderer.camera.screen({ x: 20, y: 20 });
        return {
          relTop: r.top - st.top,
          lineY: lineScr.y,
          width: r.width,
          notes: window.cad.drawing.entities.at(-1).lineNotes,
        };
      });
      assert(
        Math.abs(tabPos.relTop - tabPos.lineY) < 90 && tabPos.width <= 360,
        `Post-draw tab should anchor compactly right below line (${JSON.stringify(tabPos)})`,
      );
      assert(
        tabPos.notes === 'Steam condensate 4 bar',
        'Piping line notes not persisted to drawn line',
      );

      // 3) Collapsible accordions + N=5 live arrows update in Properties
      await postTab.getByRole('button', { name: 'Arrow options' }).click();
      await postTab.getByLabel('Quick arrow style').selectOption('closed');
      await postTab.getByLabel('Quick arrow placement').selectOption('every_n');
      await page.evaluate(() => {
        window.cad.selected = new Set([window.cad.drawing.entities.at(-1).id]);
        window.cad.setTool('SELECT');
        window.cad.selectedTab = 'properties';
        window.cad.renderSide();
      });
      const accCount = await page.locator('.cad-prop-section').count();
      const coordClosed = await page.evaluate(() => {
        const secs = [...document.querySelectorAll('.cad-prop-section')];
        const coord = secs.find((s) => s.textContent.includes('Coordinates'));
        return coord ? !coord.open : false;
      });
      assert(
        accCount >= 3 && coordClosed,
        'Properties should group coordinates inside collapsed accordion',
      );
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Arrows & Cross-Over Bridges' })
        .click();
      const nInput = page.locator('.cad-panel').getByLabel('Subdivisions N (arrows at L/N)');
      await nInput.fill('5');
      await nInput.dispatchEvent('input');
      assert(
        (await page.evaluate(() => window.cad.drawing.entities.at(-1).arrows?.segments)) === 5,
        'Live N=5 every_n arrow subdivision failed',
      );

      // 4) Polyline strictly snaps all vertices to Grid when gridSnap=true even near off-grid line midpoint
      await page.evaluate(() => {
        window.cad.drawing.entities = [
          { id: 'diag', type: 'line', layer: '0', a: { x: 0, y: 0 }, b: { x: 7, y: 7 } },
        ];
        window.cad.snapIndex.rebuild(window.cad.drawing);
        window.cad.fit();
        window.cad.gridSnap = true;
        window.cad.gridStep = 5;
        window.cad.setTool('PL');
      });
      await clickWorld(3.6, 3.4); // Near off-grid midpoint (3.5, 3.5) -> must snap to grid (5, 5)
      await clickWorld(14.8, 5.2); // Must snap to (15, 5)
      await command('');
      const poly = await page.evaluate(() => window.cad.drawing.entities.at(-1));
      assert(
        poly.type === 'polyline' &&
          poly.points[0].x === 5 &&
          poly.points[0].y === 5 &&
          poly.points[1].x === 15 &&
          poly.points[1].y === 5,
        `Polyline grid snap failed: got ${JSON.stringify(poly.points)}`,
      );
      await page.evaluate(() => (window.cad.gridSnap = false));

      // 5) 1-finger tap in "Pen draws - fingers navigate" selects entity at tap without drawing
      await page.evaluate(() => {
        window.cad.penOnly = true;
        window.cad.selected.clear();
        window.cad.setTool('L'); // Active draw tool
        const pt = window.cad.renderer.camera.screen({ x: 10, y: 5 });
        const rect = window.cad.canvas.getBoundingClientRect();
        const cx = rect.left + pt.x;
        const cy = rect.top + pt.y;
        window.cad.canvas.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            pointerId: 88,
            pointerType: 'touch',
            clientX: cx,
            clientY: cy,
          }),
        );
        window.cad.canvas.dispatchEvent(
          new PointerEvent('pointerup', {
            bubbles: true,
            pointerId: 88,
            pointerType: 'touch',
            clientX: cx,
            clientY: cy,
          }),
        );
      });
      const afterTapSel = await page.evaluate(() => ({
        selSize: window.cad.selected.size,
        count: window.cad.drawing.entities.length,
      }));
      assert(
        afterTapSel.selSize === 1 && afterTapSel.count === 2,
        `1-finger tap in penOnly must select object without drawing (${JSON.stringify(afterTapSel)})`,
      );

      // 6) Movable/Dockable Ribbon (top/bottom) & Floating + Collapsible Inspector moved to General Settings
      await page.getByRole('button', { name: 'General settings' }).click();
      const sDlg = page.getByRole('dialog', { name: 'General Project Settings' });
      await sDlg.getByLabel('Tools ribbon dock position').selectOption('top');
      assert(
        (await page.evaluate(() => document.querySelector('.cad-root').dataset.ribbonDock)) ===
          'top',
        'Ribbon failed to dock top',
      );
      await sDlg.getByLabel('Inspector panel dock mode').selectOption('floating');
      await sDlg.getByRole('button', { name: 'Close', exact: true }).click();
      assert(
        (await page.evaluate(
          () => getComputedStyle(document.querySelector('.cad-sidebar')).position,
        )) === 'absolute',
        'Inspector failed to enter floating mode',
      );
      await page.getByLabel('Collapse floating inspector').click();
      assert(
        await page.evaluate(() =>
          document.querySelector('.cad-sidebar').classList.contains('cad-floating-collapsed'),
        ),
        'Floating inspector failed to collapse',
      );
    },
  );
  await check(
    'v0.4.0 UI Polish: Align H/V, Unified Linetype, Collapsed Layers + Merge, Scroll Keep, Label Grip, Dynamic Connectors & Virtual/Inspector BOM',
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.evaluate(() => window.cadEditable());
      await reset(true);

      // 1) Unified linetype control (no duplicate native select), single bottom-right Grid button & Polar: prefix
      assert(
        (await page.locator('.cad-ltype-wrap select').count()) === 0,
        'Duplicate linetype <select> should be removed',
      );
      assert(
        (await page.locator('[aria-label="Grid snap spacing"]').count()) === 0,
        'Redundant bottom bar grid dropdown should be removed',
      );
      const polarTxt = await page
        .getByLabel('Polar tracking angle')
        .locator('option:checked')
        .textContent();
      assert(
        polarTxt?.startsWith('Polar:'),
        `Polar label should include Polar: prefix, got ${polarTxt}`,
      );

      // 2) General Settings uses 2-column layout + exposes Dynamic Port Connectors setting
      await page.getByRole('button', { name: 'General settings' }).click();
      const sDlg = page.getByRole('dialog', { name: 'General Project Settings' });
      const cols = await page.evaluate(
        () =>
          getComputedStyle(document.querySelector('.cad-settings-grid')).gridTemplateColumns.split(
            ' ',
          ).length,
      );
      assert(cols === 2, `Expected 2 columns in General Settings, got ${cols}`);
      await sDlg.getByLabel('Dynamic port connectors default').check();
      await sDlg.getByRole('button', { name: 'Close', exact: true }).click();

      // 3) Align H & Align V buttons in Properties panel + docked header collapse toggle works
      await page.evaluate(() => {
        const blk = window.cad.drawing.blocks[0];
        window.cad.drawing.entities = [
          {
            id: 'al1',
            type: 'line',
            layer: '0',
            a: { x: 0, y: 0 },
            b: { x: 20, y: 0 },
          },
          {
            id: 'al2',
            type: 'line',
            layer: '0',
            a: { x: 40, y: 30 },
            b: { x: 60, y: 30 },
          },
          {
            id: 'ins1',
            type: 'insert',
            layer: '0',
            block: blk.id,
            position: { x: 10, y: -20 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            attributes: { TAG: 'XV-1', VALORE: 'DN50', DESCRIZIONE: 'Gate Valve' },
          },
        ];
        window.cad.fit();
        window.cad.selected = new Set(['al1', 'al2']);
        window.cad.setTool('SELECT');
        window.cad.selectedTab = 'properties';
        window.cad.renderSide();
      });
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Appearance & Actions' })
        .click();
      await page
        .locator('.cad-action-grid')
        .getByRole('button', { name: 'Align horizontal centers' })
        .click();
      await page
        .locator('.cad-selection-bar')
        .getByRole('button', { name: 'Align vertical centers' })
        .click();
      const aligned = await page.evaluate(() => ({
        x1: (window.cad.drawing.entities[0].a.x + window.cad.drawing.entities[0].b.x) / 2,
        x2: (window.cad.drawing.entities[1].a.x + window.cad.drawing.entities[1].b.x) / 2,
        y1: (window.cad.drawing.entities[0].a.y + window.cad.drawing.entities[0].b.y) / 2,
        y2: (window.cad.drawing.entities[1].a.y + window.cad.drawing.entities[1].b.y) / 2,
      }));
      assert(
        Math.abs(aligned.x1 - aligned.x2) < 0.01 && Math.abs(aligned.y1 - aligned.y2) < 0.01,
        'Align H / Align V failed',
      );

      await page.getByLabel('Collapse floating inspector').click();
      assert(
        await page.evaluate(() =>
          document.querySelector('.cad-root').classList.contains('cad-panel-collapsed'),
        ),
        'Docked Inspector collapse button failed to collapse panel',
      );
      await page.getByRole('button', { name: 'Toggle right inspector panel', exact: true }).click();

      // 4) Interactive Label Position checkbox reveals draggable label grip
      await page.evaluate(() => {
        window.cad.selected = new Set(['ins1']);
        window.cad.selectedTab = 'properties';
        window.cad.renderSide();
      });
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Symbol Attributes & TAG' })
        .click();
      await page.locator('summary', { hasText: 'Label & Text Options' }).click();
      await page.locator('summary', { hasText: 'Coordinates & Transform' }).click();
      await page.getByLabel('Interactive label position').check();
      const labelState = await page.evaluate(() => {
        const grips = window.cad.allSelectedGrips();
        return {
          hasLabelGrip: grips.some((g) => g.kind === 'label'),
        };
      });
      assert(labelState.hasLabelGrip, 'Interactive label position did not expose label grip');
      // Verify scrollTop is preserved across Inspector re-render when editing a property
      const scrollKept = await page.evaluate(() => {
        const panel = document.querySelector('.cad-panel');
        panel.style.maxHeight = '220px';
        panel.scrollTop = 80;
        const before = panel.scrollTop;
        window.cad.renderSide();
        return { before, after: document.querySelector('.cad-panel').scrollTop };
      });
      assert(
        scrollKept.before >= 60 && scrollKept.after >= 60,
        `Inspector scrollTop reset on re-render (${JSON.stringify(scrollKept)})`,
      );

      // 5) Layers tab starts collapsed + Merge into Layer works
      await page.getByRole('button', { name: 'Layers', exact: true }).click();
      assert(
        (await page.locator('.cad-layer-card[open]').count()) === 0,
        'Layers should start collapsed by default',
      );
      await page.evaluate(() => {
        window.cad.stack.execute('add merge src', (d) => {
          d.layers.push({
            id: 'l_tmp',
            name: 'TMP_MERGE',
            visible: true,
            locked: false,
            color: 2,
            lineType: 'DASHED',
          });
          d.entities[0].layer = 'l_tmp';
        });
      });
      await page
        .locator('.cad-layer-card')
        .filter({ has: page.locator('summary', { hasText: 'TMP_MERGE' }) })
        .locator('summary')
        .click();
      await page.getByRole('button', { name: 'Merge' }).click();
      assert(
        (await page.evaluate(
          () =>
            window.cad.drawing.layers.some((l) => l.id === 'l_tmp') === false &&
            window.cad.drawing.entities[0].layer === '0',
        )) === true,
        'Layer merge failed',
      );

      // 6) Virtual Title Block opens YAML + interactive BOM modal (no Add Row, no Sheet Tab, has Brand & Model + Attribute Column)
      await page.locator('.cad-virtual-titleblock').click();
      const yDlg = page.getByRole('dialog', { name: 'Markdown Properties & BOM' });
      assert(await yDlg.isVisible(), 'Virtual Title Block click did not open YAML & BOM modal');
      assert(
        (await yDlg.getByRole('button', { name: 'Sheet Tab' }).count()) === 0,
        'Removed Sheet Tab button should not appear in YAML modal',
      );
      await yDlg
        .getByRole('button', {
          name: 'Toggle interactive Bill of Materials (BOM) table',
          exact: true,
        })
        .click();
      assert(
        (await yDlg.getByRole('button', { name: '+ Attribute Column' }).count()) === 1,
        'Missing + Attribute Column button in Virtual BOM modal',
      );
      await yDlg.getByLabel('BOM ins1 BRAND').fill('ABB');
      await yDlg.getByLabel('BOM ins1 BRAND').press('Tab');
      await yDlg.getByLabel('BOM ins1 MODEL').fill('ACS580');
      await yDlg.getByLabel('BOM ins1 MODEL').press('Tab');
      await yDlg.getByLabel('BOM ins1 VALORE').fill('DN80');
      await yDlg.getByLabel('BOM ins1 VALORE').press('Tab');
      assert(
        (await page.evaluate(() => {
          const ins = window.cad.drawing.entities.find((e) => e.id === 'ins1');
          return (
            ins.attributes.VALORE === 'DN80' &&
            ins.attributes.BRAND === 'ABB' &&
            ins.attributes.MODEL === 'ACS580'
          );
        })) === true,
        'Virtual BOM table edit did not update Brand/Model/Value attributes',
      );
      await yDlg.getByRole('button', { name: 'Close', exact: true }).click();

      // 7) Inspector Sheet & BOM starts collapsed, expands cleanly, selects component & edits inline
      await page.getByRole('button', { name: 'Sheet & BOM', exact: true }).click();
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Bill of Materials (BOM)' })
        .click();
      const bomRow = page.locator('.cad-bom-row').first();
      await bomRow.locator('.cad-bom-head-btn').click();
      assert(
        (await page.evaluate(() => window.cad.selected.has('ins1'))) === true,
        'Clicking Inspector BOM row did not select component on canvas',
      );
      await bomRow.getByLabel('Inspector BOM ins1 VALORE').fill('DN100');
      await bomRow.getByLabel('Inspector BOM ins1 VALORE').press('Tab');
      const bomResult = await page.evaluate(() => ({
        val: window.cad.drawing.entities.find((e) => e.id === 'ins1').attributes.VALORE,
        scroll: document.querySelector('.cad-panel')?.scrollTop ?? 0,
      }));
      assert(
        bomResult.val === 'DN100',
        `Inspector inline BOM edit failed (${JSON.stringify(bomResult)})`,
      );
      assert(typeof bomResult.scroll === 'number', 'Scroll container check');

      // 7b) Print / Fit Paper modal exposes symmetric margins & explicit Mode A fit button
      await page
        .locator('.cad-prop-section > summary', { hasText: 'Sheet Format, Scale & Mode' })
        .click();
      await page.getByRole('button', { name: 'Print / Fit Paper…' }).click();
      const printDlg = page.getByRole('dialog', { name: 'Print & Standard Sheet Scaling' });
      assert(await printDlg.isVisible(), 'Print modal did not open');
      await printDlg.getByLabel('Print margins mm').fill('15');
      await printDlg.getByLabel('Print margins mm').dispatchEvent('change');
      await printDlg
        .getByRole('button', { name: 'Fit Sheet Frame to Drawing (keep mm coordinates)' })
        .click();
      assert(
        (await page.evaluate(() => window.cad.drawing.sheet?.marginMm)) === 15,
        'Print Fit Sheet Frame did not save symmetric marginMm=15',
      );
      await printDlg.getByRole('button', { name: 'Close', exact: true }).click();

      // 8) Bottom-bar Dyn Conn toggle turns on Dynamic Port Connectors and attaches L endpoints
      const dynBtn = page.locator('.cad-precision button', { hasText: 'Dyn Conn' });
      assert(
        (await dynBtn.getAttribute('aria-pressed')) === 'true',
        'Dyn Conn bottom toggle synced',
      );
      await dynBtn.click();
      assert((await dynBtn.getAttribute('aria-pressed')) === 'false', 'Dyn Conn toggle off failed');
      await dynBtn.click();
      assert((await dynBtn.getAttribute('aria-pressed')) === 'true', 'Dyn Conn toggle on failed');
      await page.evaluate(() => {
        const blk =
          window.cad.drawing.blocks.find((b) => b.id === 'pid-pump') ??
          window.cad.drawing.blocks[0];
        window.cad.stack.execute('setup dp', (d) => {
          d.entities = [
            {
              id: 'dp1',
              type: 'insert',
              layer: '0',
              block: blk.id,
              position: { x: 0, y: 0 },
              rotation: 0,
              scale: { x: 1, y: 1 },
              attributes: { TAG: 'P-1' },
            },
            {
              id: 'dp2',
              type: 'insert',
              layer: '0',
              block: blk.id,
              position: { x: 40, y: 0 },
              rotation: 0,
              scale: { x: 1, y: 1 },
              attributes: { TAG: 'P-2' },
            },
          ];
        });
        window.cad.fit();
        window.cad.osnap = true;
      });
      const portPos = await page.evaluate(() => {
        const blk = window.cad.drawing.blocks.find(
          (b) => b.id === window.cad.drawing.entities[0].block,
        );
        const p1 = blk.ports[0]?.point ?? { x: 0, y: 0 };
        const p2 = blk.ports[0]?.point ?? { x: 0, y: 0 };
        return { p1, p2: { x: 40 + p2.x, y: p2.y } };
      });
      await command('L');
      await clickWorld(portPos.p1.x, portPos.p1.y);
      await clickWorld(portPos.p2.x, portPos.p2.y);
      const dynCheck = await page.evaluate(() => {
        window.cad.stack.execute('move dp2', (d) => {
          const ins = d.entities.find((e) => e.id === 'dp2');
          if (ins?.type === 'insert') ins.position.y = 20;
        });
        const ln = window.cad.drawing.entities.find(
          (e) => e.type === 'line' || e.type === 'polyline',
        );
        return {
          type: ln?.type,
          hasFrom: !!ln?.from,
          hasTo: !!ln?.to,
          lastY: ln?.type === 'polyline' ? ln.points.at(-1)?.y : ln?.b?.y,
        };
      });
      assert(
        dynCheck.hasFrom && dynCheck.hasTo && Math.abs((dynCheck.lastY ?? 0) - 20) < 5,
        `Dynamic port connectors should attach L endpoints and follow moved block (${JSON.stringify(dynCheck)})`,
      );
    },
  );
  await check('Disposal cancels rendering and removes listeners/root', async () => {
    await page.evaluate(() => {
      window.cad.toggleFullscreen(true);
      window.cad.dispose();
    });
    assert((await page.locator('.cad-root').count()) === 0, 'Editor not disposed');
    assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  });
  console.log(`\n${count} browser checks passed`);
} finally {
  await browser.close();
}
