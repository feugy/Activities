const { decompress } = require('heatshrink')

// https://www.espruino.com/Image+Converter from svg/heart-20x20.svg
// use compression
// with transparency
// flat diffusion
// 8bit Web palette
module.exports = {
  width: 20,
  height: 20,
  bpp: 8,
  transparent: 254,
  buffer: decompress(
    atob(
      '/wAV6AAB1nQBAfX0ulBQISE6+XtgABy/XBA4UD6+eBIQUD6ASDAAOeDoYJEAAI1BBAwTCBQ4AIHgQTTLIgAKNof+0oTN0qLIExp5JOo7IFMBgAFWwywGCg5SGJgwUGJhpSKJhAAGUoSZEABZnBL5QUICSIAL'
    )
  )
}
