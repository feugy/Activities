const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const info = require('./package.json')

module.exports = {
  input: 'src/index.js',
  external: ['heatshrink'],
  plugins: [
    resolve(),
    commonjs({
      include: ['src/**', 'node_modules/**']
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    terser({
      ecma: 6,
      // https://github.com/terser/terser#compress-options
      compress: {
        defaults: false,
        ecma: 5
      },
      // https://github.com/terser/terser#output-options
      output: {
        beautify: true,
        quote_style: 0,
        ecma: 5
      },
      // mangling names creates LOW_MEMORY issues on upload
      // https://github.com/terser/terser#mangle-properties-options
      mangle: false
    }),
    {
      name: 'espruino-app',
      renderChunk(code) {
        const name = info.name.slice(0, 7)
        return `const storage = require("Storage")
const appName = "-${name}";
storage.write(appName, \`${code}\`);
storage.write("+${name}",{ "name": "${info.name}", "src": appName);`
      }
    }
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
