import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import tc from 'turbocolor'
import info from './package.json'

// observed limit above which the app can not be loaded in Bangle's RAM
const limit = 10000

const buildTerserOption = (minify = true) => ({
  ecma: 6,
  // https://github.com/terser/terser#compress-options
  compress: {
    defaults: !minify,
    ecma: 5,
    booleans_as_integers: true
  },
  // https://github.com/terser/terser#output-options
  output: {
    beautify: !minify,
    quote_style: 0,
    ecma: 5,
    comments: false
  },
  // https://github.com/terser/terser#mangle-properties-options
  mangle: minify && {
    toplevel: true,
    module: true
  }
})

const appName = info.name.slice(0, 7)
const chunkName = info.name.slice(0, 6)

const saveAsApp = (enabled = true) => {
  let inlineInports
  return {
    name: 'espruino-app',
    buildStart(options) {
      inlineInports = options.inlineDynamicImports
    },
    generateBundle(options, bundle) {
      if (!enabled) {
        return
      }
      const output = [
        `const storage = require("Storage")
  const appDesc = "+${appName}";
  storage.write(appDesc, { "name": "${info.name}", "src": "-${appName}" });
  const chunkCount = storage.list().filter(n => n.startsWith("${chunkName}")).length
  for (let i = 1; i <= chunkCount; i++) {
    storage.erase("${chunkName}" + i)
  }`
      ]
      let nextChunk = 1
      const fileMap = {}
      for (const [name, { isEntry }] of Object.entries(bundle)) {
        if (!isEntry) {
          fileMap[name] = chunkName + nextChunk++
        }
      }
      for (const [originalName, { code, isEntry }] of Object.entries(bundle)) {
        delete bundle[originalName]
        let chunk = code.replace(
          '"use strict";',
          // Rollup adds calls to freeze when modules are inlined, which Espruino does not support
          isEntry && inlineInports ? 'Object.freeze=n=>n;' : ''
        )
        for (const name in fileMap) {
          chunk = chunk.replace(`./${name}`, fileMap[name])
        }
        const length = chunk.length
        const fileName = isEntry ? originalName : fileMap[originalName]
        console.error(
          tc.yellow(
            `${isEntry ? 'entry' : 'chunk'} ${fileName} is ${tc.bold(
              length
            )} characters long`
          )
        )
        if (length >= limit) {
          console.error(
            tc.red.bold(
              `\u0007\nProduced code is more than ${limit} characters, and is unlikely to fit in Bangle.js RAM\n\u0007`
            )
          )
        }
        const size = 2000
        for (let i = 0; i < length; i += size) {
          output.push(
            `storage.write("${fileName}", \`${chunk.slice(
              i,
              i + size
            )}\`, ${i}, ${length});`
          )
        }
      }
      output.push('storage.compact()', `eval(storage.read("-${appName}"))`)
      this.emitFile({
        type: 'asset',
        source: output.join('\n'),
        fileName: 'bundle.js'
      })
    }
  }
}

export default {
  input: 'src/main.js',
  external: ['heatshrink'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser(buildTerserOption(!process.argv.includes('--no-minify'))),
    saveAsApp(process.argv.includes('--app'))
  ],
  output: {
    dir: 'dist',
    format: 'cjs', // Note: using iife causes memory issues
    entryFileNames: `-${appName}`
  },
  watch: {
    include: 'src/**'
  }
}
