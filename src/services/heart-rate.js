const BaseService = require('./base-service')

/**
 * Monitors heart rate
 */
class HeartRateService extends BaseService {
  constructor() {
    super({ name: 'heart-rate' })
    this.onHeartBeat = this.onHeartRate.bind(this)
    // Bangle.on('HRM', this.onHeartRate)
  }

  /**
   * Updates current value on new heart rate received
   * @param {object} event - event details
   * @param {number} event.bpm - beats per minute
   * @param {number} event.confidence - percentage from 0 to 100
   */
  onHeartRate({ bpm, confidence }) {
    this.value = `${bpm} ${confidence}`
  }

  /**
   * Starts heart rate monitoring
   * @returns {HeartRateService} for chaining purposes
   * @fires HeartRateService#update every second or so
   */
  start() {
    // Bangle.setGPSPower(1)
    return this
  }

  /**
   * Stops heart rate monitoring
   * @returns {HeartRateService} for chaining purposes
   */
  dispose() {
    // Bangle.removeListener('HRM', this.onHeartRate)
    // Bangle.setGPSPower(0)
    return this
  }
}

// exposes a singleton
module.exports = new HeartRateService()
