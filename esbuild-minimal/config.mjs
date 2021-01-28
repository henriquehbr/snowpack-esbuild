/** @type {import('esbuild').BuildOptions} */
export const config = {
  entryPoints: ['./src/index.ts'],
  minify: true,
  bundle: true,
  outdir: 'build',
  format: 'esm',
  splitting: true,
  outExtension: { '.js': '.mjs' }
}
