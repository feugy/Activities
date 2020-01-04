

# Development

## Install

1. In order to send code to your Bangle.js, your version of node requires some privileges: 
   ```sh
   sudo setcap cap_net_raw+eip $(readlink -f `which node`)
   ```

## Bundle the code

| Command | Effect |
| ------- | ------ |
| `npm run build` | bundle and minify the code in `dist/bundle.js` folder, so it could be copy-pasted into [Espruino Web IDE][webIDE] |
| `npm run build -- --no-minify` | bundle the code without minification |
| `npm run build -- --app` | bundle, minify and package the code as a bangle.js application |
| `npm run build:watch` | watch the `src/` folder and restart build on file change |

## Syntax pitfalls

1. Babel output for function parameter default values is more verbose than `p = p == null ? 'default value' : p`
2. Babel output for spread operator in function call is more verbose than `obj.fct.apply(obj, args)`

# TODO list

## Bugs
- computed distance is off by 5000 km
- distance displayed in lap layout is the same for all rows
- no incline/decline values

## Features
- load layouts from distinct files
- limit GPS rate to 1 per sec
- display units and average

[webIDE]: https://www.espruino.com/ide/