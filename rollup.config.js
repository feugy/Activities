const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

module.exports = {
  input: 'src/index.js',
  plugins: [
    resolve(),
    commonjs({
      include: ['src/**', 'node_modules/**']
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // Note: using iife causes memory issues
    exports: 'none' // Note: without this, rollup adds an extra module.exports = ...which Espruino does not support
  },
  watch: {
    include: 'src/**'
  }
}
