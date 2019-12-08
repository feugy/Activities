const BaseMetric = require('./base-metric')
const { heartRateService } = require('../services')

/**
 * Displays current heart rate, as beats per minutes
 */
module.exports = class CurrentHeartRateMetric extends BaseMetric {
  constructor({ start } = {}) {
    super({ name: 'current-heart-rate' })
    this.start = start
    heartRateService.on('update', ({ value }) => this.setValue(value))
  }
}
