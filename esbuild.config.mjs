import * as esbuild from 'esbuild';
// Resolve only files inside this project. This also prevents esbuild from scanning
// parent iCloud directories for tsconfig/package.json on macOS.
const fileUrl = (value) => {
  const normalized = value.replace(/\\/g, '/');
  return new URL(normalized.startsWith('/') ? `file://${normalized}` : `file:///${normalized}`);
};
const root = fileUrl(`${process.cwd()}/`);
const localResolver = {
  name: 'project-only-resolution',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.path === 'yaml' && test) return { path: 'yaml', external: true };
      if (args.path === 'obsidian') return { path: args.path, external: true };
      if (/^(node:|fs$|path$|os$|child_process$|crypto$|buffer$|util$|stream$)/.test(args.path))
        return {
          errors: [{ text: `Forbidden runtime dependency: ${args.path}` }],
        };
      if (args.kind !== 'entry-point' && !args.path.startsWith('.'))
        return {
          errors: [{ text: `Unexpected runtime package: ${args.path}` }],
        };
      const base = args.importer ? fileUrl(args.importer) : root;
      const url = new URL(args.path, base);
      if (!url.href.startsWith(root.href))
        return { errors: [{ text: 'Source is outside the project' }] };
      const decoded = decodeURIComponent(url.pathname);
      const path = process.platform === 'win32' ? decoded.slice(1).replace(/\//g, '\\') : decoded;
      return { path: path.endsWith('.ts') ? path : `${path}.ts` };
    });
  },
};
const prod = process.argv.includes('production'),
  test = process.argv.includes('--test'),
  browser = process.argv.includes('--browser'),
  artifacts = process.argv.includes('--artifacts');
const options = {
  entryPoints: [
    artifacts
      ? 'tests/artifacts.ts'
      : test
        ? 'tests/run.ts'
        : browser
          ? 'tests/browser-harness.ts'
          : 'src/main.ts',
  ],
  bundle: true,
  outfile: artifacts
    ? 'tests/artifacts.mjs'
    : test
      ? 'tests/run.mjs'
      : browser
        ? 'tests/browser-harness.js'
        : 'main.js',
  format: test || artifacts ? 'esm' : browser ? 'iife' : 'cjs',
  platform: 'browser',
  target: ['es2020', 'safari15'],
  tsconfigRaw: {
    compilerOptions: { target: 'ES2020', useDefineForClassFields: false },
  },
  minify: prod,
  sourcemap: prod ? false : true,
  logLevel: 'info',
  plugins: [localResolver],
};
if (process.argv.includes('--watch')) {
  const context = await esbuild.context(options);
  await context.watch();
} else await esbuild.build(options);
