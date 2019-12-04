const BaseLayout = require('./base-layout')
const { CurrentTimeMetric, DurationMetric } = require('../metrics')
const { green, red } = require('../utils')
const { buttonsService } = require('../services')

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

    this.onToggleDisplayedMetric = this.onToggleDisplayedMetric.bind(this)
    buttonsService.on('press', this.onToggleDisplayedMetric)

    g.clear()
  }

  dispose() {
    buttonsService.removeListener('press', this.onToggleDisplayedMetric)
    super.dispose()
  }

  /**
   * When central button is pressed, circulate through available metrics
   * @param {number} button - pressed button
   */
  onToggleDisplayedMetric({ button }) {
    if (button === BTN2) {
      this.currentSlot = (this.currentSlot + 1) % this.slotNb
      this.onChangedMetric()
    }
  }

  /**
   * Handles changed from displayed metrics, redrawing the current metric only
   */
  onChangedMetric() {
    const { width, height, locale } = this
    const fontSize = height * 0.05
    g.setFontVector(fontSize)
    g.clearRect(0, height * 0.5 - fontSize, width, height * 0.5 + fontSize)
    const value = this.metrics[this.currentSlot].getDisplayValue({
      locale /*, TODO unit */
    })
    const textW = g.stringWidth(value)
    g.drawString(value, (width - textW) * 0.5, (height - fontSize * 1.1) * 0.5)
  }
}
