# Resultados dos testes

> Para seleção de um resultado definitivo e justo, todos os bundlers executaram o teste 3 vezes e o melhor resultado foi selecionado (todos os resultados estão em segundos)

### esbuild

```
$ time -p bundlers/esbuild/config.mjs

real 7.27
user 0.01
sys 0.00
```

### Rollup

```
$ time -p bundlers/rollup/config.mjs

real 29.27
user 0.01
sys 0.00
```

### Webpack 4

```
$ time -p bundlers/webpack/config.mjs

real 48.27
user 0.01
sys 0.00
```
