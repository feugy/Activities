const BaseService = require('./base-service')

/**
 * Monitors heart rate
 */
class HeartRateService extends BaseService {
  constructor() {
    super({ name: 'heart-rate' })
  }

  /**
   * Starts heart rate monitoring
   * @returns {HeartRateService} for chaining purposes
   * @fires HeartRateService#update every second or so
   */
  start() {
    this.onHeartBeat = ({ bpm, confidence }) => {
      if (confidence >= 33) {
        this.value = bpm
        this.emit('update', this)
      }
    }
    Bangle.on('HRM', this.onHeartBeat)
    Bangle.setHRMPower(true)
    return this
  }

  /**
   * Stops heart rate monitoring
   * @returns {HeartRateService} for chaining purposes
   */
  dispose() {
    Bangle.removeListener('HRM', this.onHeartBeat)
    Bangle.setHRMPower(false)
    return super.dispose()
  }
}

// exposes a singleton
module.exports = new HeartRateService()
