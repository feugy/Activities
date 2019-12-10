const BaseLayout = require('./base-layout')
const { CurrentTimeMetric, DurationMetric } = require('../metrics')
const { drawCenteredString, green, red } = require('../utils')

/**
 * Layout displayed on activity pause:
 * - resume/stop markers
 * - duration/current time
 */
module.exports = class PauseLayout extends BaseLayout {
  constructor() {
    super({ slotNb: 2, name: 'pause' })
    this.currentSlot = 0
    this.assignMetric(new DurationMetric())
    this.assignMetric(new CurrentTimeMetric(), 1)
  }

  /**
   * Invoked when a button is pressed
   * Fires event:
   * - stop on BTN1 (dispose)
   * - resume on BTN3 (dispose)
   * On BTN2, switch displayed metric
   * @param {object} evt - pressed button event
   * @param {number} evt.button - pressed button
   */
  onPressedButton({ button }) {
    if (button === BTN3) {
      this.emit('stop', this)
      this.dispose()
    } else if (button === BTN2) {
      this.currentSlot = (this.currentSlot + 1) % this.slotNb
      this.onChangedMetric()
    } else if (button === BTN1) {
      this.emit('resume', this)
      this.dispose()
    }
  }

  /**
   * Handles changed from displayed metrics, redrawing the current metric only
   */
  onChangedMetric() {
    const { width, height, locale } = this
    const fontSize = height * 0.15
    const value = this.metrics[this.currentSlot].getDisplayValue({
      locale /*, TODO unit */
    })
    g.clear()
    // draw message and metric
    drawCenteredString('paused...', this, height * 0.1, height * 0.25)
    drawCenteredString(value, this, fontSize)
    // draw icons
    const color = g.getColor()
    g.setColor(...red)
    g.drawRect(width * 0.9, height * 0.915, width * 0.95, height * 0.99)
    g.setColor(...green)
    g.drawPoly(
      [
        width * 0.9,
        0,
        width * 0.95,
        height * 0.0375,
        width * 0.9,
        height * 0.075
      ],
      true
    )
    g.setColor(color)
    g.flip()
  }
}
