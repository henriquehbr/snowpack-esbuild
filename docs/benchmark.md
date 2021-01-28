# Comparação do esbuild com outros bundlers ao buildar um projeto de larga escala

> Nesse teste, iremos buildar 250 cópias da biblioteca [svelte-notifications](https://github.com/beyonk-adventures/svelte-notifications) (com o objetivo de simular um projeto Svelte de médio porte), referenciar todas num `index.js` e apontar tal arquivo como entry point para o esbuild, Rollup e Webpack e analisar os resultados

---

- Clone o diretório `src` do svelte-notifications com seguinte comando (requer `degit`)

```
$ degit beyonk-adventures/svelte-notifications/src benchmark/svelte-notifications && cd benchmark
```

- Crie o diretório `src`, no qual as 250 cópias do svelte-notifications serão armazenadas

```
$ mkdir src
```

- Faça 250 cópias do projeto recém clonado para o diretório `src`

```
$ for i in $(seq 1 250); do cp -r svelte-notifications "src/copy$i"; done
```

- Crie um `index.js` que importe todas as 250 cópias

```
$ for i in $(seq 1 250); do echo "export * as copy$i from './copy$i/index.js'" >> src/index.js; done
```

- Com o projeto a ser testado pronto, agora vamos configurar os bundlers, crie um diretório para cada um

```
$ mkdir -p bundlers/esbuild bundlers/rollup bundlers/webpack && cd bundlers
```

- Crie o arquivo de configuração de cada bundler, por fins de padronização, nomearemos todos como `config.mjs`

```
$ touch esbuild/config.mjs rollup/config.mjs webpack/config.mjs
```

#### `esbuild/config.mjs`

> - Instale as dependencies necessárias para buildar o projeto
>
> ```
> $ yarn --cwd esbuild add -D esbuild@0.8.36 esbuild-svelte@0.4.0
> ```

```javascript
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
```

- Execute o teste com o seguinte comando:

```
$ time -p node esbuild/config.mjs
```

### `rollup/config.mjs`

> - Instale as dependências necessárias para buildar o projeto
>
> ```
> $ yarn --cwd rollup add -D svelte@3.32.0 rollup@2.38.1 rollup-plugin-{terser@7.0.2,svelte@7.1.0,css-only@3.1.0} @rollup/plugin-{commonjs@17.0.0,node-resolve@11.1.0}
> ```

```javascript
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
```

- Execute o teste com o seguinte comando:

```
$ time -p node rollup/config.mjs
```

### `webpack/config.mjs`

> - Instale as dependências necessárias para buildar o projeto
>
> ```
> $ yarn --cwd webpack add -D svelte@3.32.0 webpack@4.46.0 webpack-cli@4.4.0 mini-css-extract-plugin@1.3.5 svelte-loader@3.0.0 css-loader@5.0.1
> ```

```javascript
{
  mode: 'production',
  entry: path.resolve('..', '..', 'src', 'index.js'),
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'entry.webpack.js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'entry.webpack.css'
    })
  ]
}
```

- Execute o teste com o seguinte comando:

```
$ time -p yarn --cwd webpack webpack -c config.js
```
