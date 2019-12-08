const BaseLayout = require('./base-layout')
const { CurrentTimeMetric } = require('../metrics')
const { green, drawCenteredString } = require('../utils')

/**
 * Layout to start an activity, with current time and start button
 * @fires [StartLayout#start]
 */
module.exports = class StartLayout extends BaseLayout {
  constructor() {
    super({ slotNb: 1, name: 'start' })
    this.assignMetric(new CurrentTimeMetric())
    this.onChangedMetric()
  }

  /**
   * Invoked when a button is pressed
   * Fires event:
   * - start on BTN2 (dispose)
   * @param {object} evt - pressed button event
   * @param {number} evt.button - pressed button
   */
  onPressedButton({ button }) {
    if (button === BTN2) {
      this.emit('start', this)
      this.dispose()
    }
  }

  /**
   * Handles changed from displayed metrics, redrawing the time metric only
   */
  onChangedMetric() {
    g.clear()
    const { width, height, locale } = this
    const text = 'Start'
    let fontSize = height * 0.2
    const color = g.getColor()
    g.setColor(...green)
    const radius = height * 0.17
    // draw rounded border around text
    const rectLeft = width * 0.32
    const rectRight = width * 0.87
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
        width * 0.86,
        height * 0.44,
        width * 0.92,
        height * 0.5,
        width * 0.86,
        height * 0.56
      ],
      true
    )
    g.setColor(color)
    drawCenteredString(text, this, fontSize)
    // draw metric
    const time = this.metrics[0].getDisplayValue({
      locale /*, TODO unit */
    })
    fontSize = height * 0.1
    drawCenteredString(time, this, fontSize, fontSize * 0.5)
    g.flip()
  }
}
