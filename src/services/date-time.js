const BaseService = require('./base-service')

/**
 * Monitors current date and time, refreshing every 10 ms
 */
class DateTimeService extends BaseService {
  constructor() {
    super({ name: 'time' })
  }

  /**
   * TODOC
   * @returns {DateTimeService} for chaining purposes
   * @fires BaseService#update every 10 milliseconds
   */
  start() {
    const tick = () => {
      this.timeout = setTimeout(tick, 10)
      this.value = new Date()
      this.emit('update', this)
    }
    tick()
    return this
  }

  /**
   * Stops time monitoring
   * @returns {DateTimeService} for chaining purposes
   */
  dispose() {
    clearTimeout(this.timeout)
    return this
  }
}

// exposes a singleton
module.exports = new DateTimeService()
