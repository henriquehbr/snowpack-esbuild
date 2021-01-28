import { rollup } from 'rollup'
import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'

const inputOptions = {
  input: '../src/index.js',
  plugins: [
    svelte(),
    css({ output: 'entry.esbuild.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser()
  ]
}

const outputOptions = {
  format: 'esm',
  file: './rollup/build/entry.rollup.js'
}

const bundle = await rollup(inputOptions)
await bundle.write(outputOptions)
await bundle.close()
