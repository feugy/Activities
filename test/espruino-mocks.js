/* eslint-disable no-extend-native */
'use strict'
const EventEmitter = require('events')

// Make sure objects are event emitters as well.
const emitter = new EventEmitter()
Object.prototype.on = emitter.on.bind(emitter)
Object.prototype.emit = emitter.emit.bind(emitter)
Object.prototype.removeListener = emitter.removeListener.bind(emitter)
Object.prototype.removeAllListeners = emitter.removeAllListeners.bind(emitter)

// Graphics shim
const g = {
  asBMP: jest.fn(),
  asImage: jest.fn(),
  asURL: jest.fn(),
  clear: jest.fn(),
  clearRect: jest.fn(),
  drawCircle: jest.fn(),
  drawEllipse: jest.fn(),
  drawImage: jest.fn(),
  drawLine: jest.fn(),
  drawPoly: jest.fn(),
  drawRect: jest.fn(),
  drawString: jest.fn(),
  dump: jest.fn(),
  fillCircle: jest.fn(),
  fillEllipse: jest.fn(),
  fillPoly: jest.fn(),
  fillRect: jest.fn(),
  getBgColor: jest.fn(),
  getColor: jest.fn(),
  getFont: jest.fn(),
  getFontHeight: jest.fn(),
  getFonts: jest.fn(),
  getHeight: jest.fn(),
  getModified: jest.fn(),
  getPixel: jest.fn(),
  getWidth: jest.fn(),
  lineTo: jest.fn(),
  moveTo: jest.fn(),
  scroll: jest.fn(),
  setBgColor: jest.fn(),
  setColor: jest.fn(),
  setFont: jest.fn(),
  setFontAlign: jest.fn(),
  setFontBitmap: jest.fn(),
  setFontCustom: jest.fn(),
  setFontVector: jest.fn(),
  setPixel: jest.fn(),
  setRotation: jest.fn(),
  stringWidth: jest.fn()
}
global.g = g
