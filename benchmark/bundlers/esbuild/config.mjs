import path from 'path'
import esbuild from 'esbuild'
import sveltePlugin from 'esbuild-svelte'

// Necessário devido a problemas de duplicações das "internals" do Svelte
const dedupeSveltePlugin = {
  name: 'dedupe-svelte-plugin',
  setup(build) {
    build.onResolve({ filter: /^svelte(\/[\a-zA-Z0-9@-]+)?$/ }, args => ({
      path: path.resolve(process.cwd(), 'esbuild', 'node_modules', args.path, 'index.js')
    }))
  }
}

await esbuild.build({
  bundle: true,
  format: 'esm',
  minify: true,
  entryPoints: ['../src/index.js'],
  outfile: './esbuild/build/entry.esbuild.js',
  plugins: [sveltePlugin(), dedupeSveltePlugin]
})
