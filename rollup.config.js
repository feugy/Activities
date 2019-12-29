const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const tc = require('turbocolor')
const info = require('./package.json')

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

const saveAsApp = (enabled = true) => ({
  name: 'espruino-app',
  renderChunk(code) {
    console.error(
      tc.yellow(`minified code is ${tc.bold(code.length)} characters long`)
    )
    if (code.length >= limit) {
      console.error(
        tc.red.bold(
          `\u0007\nProduced code is more than ${limit} characters, and is unlikely to fit in Bangle.js RAM\n\u0007`
        )
      )
    }
    if (!enabled) {
      return code
    }
    const size = 2000
    const name = info.name.slice(0, 7)
    const chunks = []
    for (let i = 0; i < code.length; i += size) {
      chunks.push(code.slice(i, i + size))
    }
    console.error(tc.yellow(`written in ${tc.bold(chunks.length)} chunks`))
    return `const storage = require("Storage")
const appSrc = "-${name}";
storage.erase(appSrc);
${chunks
  .map(
    (chunk, i) =>
      `storage.write(appSrc, \`${chunk}\`, ${i * size}, ${code.length});`
  )
  .join('\n')}
const appDesc = "+${name}";
storage.erase(appDesc);
storage.write(appDesc, { "name": "${info.name}", "src": appSrc });
eval(storage.read(appSrc));`
  }
})

module.exports = {
  input: 'src/activity.js',
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
    file: 'dist/bundle.js',
    format: 'cjs', // Note: using iife causes memory issues
    exports: 'none' // Note: without this, rollup adds an extra module.exports = ...which Espruino does not support,
  },
  watch: {
    include: 'src/**'
  }
}
