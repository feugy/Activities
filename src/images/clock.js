const { decompress } = require('heatshrink')

// https://www.espruino.com/Image+Converter from svg/clock-20x20.svg
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
      '/wAY2fX2eJxOtAgISK680iEQmgDDDYISH1oNBAANfr4FDwYqGCQgTGCgIpE64LECY8Q1oSDnQTNiA9CEwwTJHgQTQHgRhFCZVfFAITHGYITJBQ4UIHYQTJCgxjC2aLGAAYKEZIYoKWY55JMI4TExISJwYmFHwc0CIs01olFAAmz64sBEQIEBCJIAPA=='
    )
  )
}
