const BaseService = require('./base-service')

/**
 * Monitors current date and time, refreshing every 100 ms
 */
class DateTimeService extends BaseService {
  constructor() {
    super({ name: 'time' })
  }

  /**
   * Starts time monitoring
   * @returns {DateTimeService} for chaining purposes
   * @fires DateTimeService#update every 10 milliseconds
   */
  start() {
    const tick = () => {
      this.value = Date.now()
      this.emit('update', this)
    }
    tick()
    this.interval = setInterval(tick, 10)
    return this
  }

  /**
   * Stops time monitoring
   * @returns {DateTimeService} for chaining purposes
   */
  dispose() {
    clearInterval(this.tintervalimeout)
    return this
  }
}

// exposes a singleton
module.exports = new DateTimeService()
