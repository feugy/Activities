const BaseMetric = require('./base-metric')
const { dateTimeService } = require('../services')
const { padWith0 } = require('../utils')

/**
 * Displays current time, without unit and regardless of locale
 */
module.exports = class CurrentTimeMetric extends BaseMetric {
  constructor() {
    super({ name: 'time' })
    dateTimeService.on('update', () =>
      this.setValue(new Date(dateTimeService.value))
    )
  }

  /**
   * @returns {string} - current hours, minutes and seconds separated with colon
   */
  getDisplayValue() {
    if (!this.value) {
      return '--'
    }
    return `${padWith0(this.value.getHours())}:${padWith0(
      this.value.getMinutes()
    )}:${padWith0(this.value.getSeconds())}`
  }
}
