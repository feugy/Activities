const BaseMetric = require('./base-metric')
const { dateTimeService } = require('../services')
const { padWith0 } = require('../utils')

/**
 * Tracks ellapsed time since creation (or dateTimeService's start)
 * Stores duration in millis
 */
module.exports = class DurationMetric extends BaseMetric {
  constructor() {
    super({ name: 'ellapsed-time' })
    let start = null
    dateTimeService.on('update', () => {
      const now = dateTimeService.value
      if (!start) {
        start = now
      }
      this.setValue(now.getTime() - start.getTime())
    })
  }

  /**
   * @returns {string} - current hours, minutes and seconds separated with colon
   */
  getDisplayValue() {
    if (!this.value) {
      return 0
    }
    var minutes = Math.floor(this.value / 60000)
    var seconds = Math.floor(this.value - minutes * 60000) / 1000
    return `${padWith0(minutes)}'${padWith0(seconds.toFixed(1))}`
  }
}
