# Habilitar o `esbuild` em uma aplicação Snowpack

> Tais otimizações são recentes e exclusivas da recém-lançada versão 3.0 do Snowpack

- Adicione a propriedade `optimize` no arquivo de configuração do Snowpack :(`snowpack.config.js`)

```javascript
module.exports = {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2020'
  }
}
```

- `bundle` -> Realiza o "empacotamento" da aplicação com o `esbuild`
- `minify` -> Minifica a bundle com o `esbuild` (ao invés de ferramentas como `terser`)
- `target` -> Versão do ECMAScript na qual sua aplicação será gerada
