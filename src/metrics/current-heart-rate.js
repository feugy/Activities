const BaseMetric = require('./base-metric')
const { heartRateService } = require('../services')
const { heart: icon } = require('../images')

/**
 * Displays current heart rate, as beats per minutes
 */
module.exports = class CurrentHeartRateMetric extends BaseMetric {
  constructor() {
    super({ name: 'current-heart-rate', icon })
    this.onHeartBeatUpdated = ({ value }) => this.setValue(value)
    heartRateService.on('update', this.onHeartBeatUpdated)
  }

  dispose() {
    heartRateService.removeListener('update', this.onHeartBeatUpdated)
    return super.dispose()
  }
}
