# esbuild-minimal

- Criar o diretório do projeto

- Inicializar o `package.json`

- Instalar `esbuild` e `chokidar` como `devDependencies`

- Criar applicação demo do `src`

**src/index.ts**

```typescript
const main = async () => {
  console.log('esbuild & TypeSript are working flawlessly!')
  await import('./message')
}
main()
```

**src/message.js**

```javascript
console.log('JavaScript Dynamic imports included')
```

- Criar `config.mjs` do esbuild

```javascript
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
```

- Criar `scripts` de build

**scripts/watch.mjs**

```javascript
import esbuild from 'esbuild'
import chokidar from 'chokidar'
import { config } from '../config.js'

const service = await esbuild.startService()

const chokidarEventHandler = async event => {
  const msg = !event
    ? 'chokidar has started'
    : `chokidar has detected change on ${event}`
  console.log(msg)
  await service.build({ ...config, incremental: true })
}

chokidar.watch('./src/**/*').on('ready', chokidarEventHandler).on('change', chokidarEventHandler)
```

**scripts/build.mjs**

```javascript
import esbuild from 'esbuild'
import { config } from '../config.js'

await esbuild.build(config)
```
