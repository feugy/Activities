const BaseLayout = require('./base-layout')
const { CurrentTimeMetric } = require('../metrics')
const { green } = require('../utils')

/**
 * Layout to start an activity, with current time and start button
 */
module.exports = class StartLayout extends BaseLayout {
  constructor() {
    super({ slotNb: 1, name: 'start' })
    this.assignMetric(new CurrentTimeMetric())

    g.clear()
    const { width, height } = this
    const text = 'Start'
    const fontSize = height * 0.1
    g.setFontVector(fontSize)
    const textW = g.stringWidth(text)
    const color = g.getColor()
    g.setColor(...green)
    const radius = height * 0.08
    // draw rounded border around text
    const rectLeft = (width - textW) * 0.5 + radius * 0.3
    const rectRight = width * 0.8
    const rectTop = height * 0.5 - radius
    const rectBottom = height * 0.5 + radius
    g.drawCircle(rectLeft, height * 0.5, radius)
    g.drawCircle(rectRight, height * 0.5, radius)
    g.clearRect(rectLeft, rectTop, rectRight, rectBottom)
    g.drawLine(rectLeft, rectTop, rectRight, rectTop)
    g.drawLine(rectLeft, rectBottom, rectRight, rectBottom)
    // draw triangle next to button 2
    g.drawPoly(
      [
        width * 0.8,
        height * 0.47,
        width * 0.84,
        height * 0.5,
        width * 0.8,
        height * 0.53
      ],
      true
    )
    g.setColor(color)
    g.drawString(text, (width - textW) * 0.5, (height - fontSize * 1.1) * 0.5)
  }

  /**
   * Handles changed from displayed metrics, redrawing the time metric only
   */
  onChangedMetric() {
    const { width, height, locale } = this
    g.clearRect(0, 0, width, height * 0.1)
    const time = this.metrics[0].getDisplayValue({
      locale /*, TODO unit */
    })
    g.setFontVector(height * 0.05)
    const textW = g.stringWidth(time)
    g.drawString(time, (width - textW) * 0.5, 10)
  }
}
