

# Development

## Bundle the code

| Command | Effect |
| ------- | ------ |
| `npm run build` | bundle and minify the code in `dist/bundle.js` folder, so it could be copy-pasted into [Espruino Web IDE][webIDE] |
| `npm run build -- --no-minify` | bundle the code without minification |
| `npm run build -- --app` | bundle, minify and package the code as a bangle.js application |
| `npm run build:watch` | watch the `src/` folder and restart build on file change |

## Syntax pitfall

1. Babel output for function parameter default values is more verbose than `p = p == null ? 'default value' : p`
2. Babel output for spread operator in function call is more verbose than `obj.fct.apply(obj, args)`

[webIDE]: https://www.espruino.com/ide/