const BaseService = require('./base-service')

/**
 * Monitors button pushes
 */
class ButtonsService extends BaseService {
  constructor() {
    super({ name: 'buttons' })
  }

  /**
   * Starts monitoring button press (rising edge) for physical buttons
   * @returns {ButtonsService} for chaining purposes
   * @fires ButtonsService#press on button pushes
   */
  start() {
    this.watches = [BTN1, BTN2, BTN3].map(button =>
      setWatch(
        () => {
          this.emit('press', { button })
        },
        button,
        { repeat: true, edge: 'rising' }
      )
    )
    return this
  }

  /**
   * Stops buttons monitoring
   * @returns {ButtonsService} for chaining purposes
   */
  dispose() {
    this.watches.forEach(clearWatch)
    return super.dispose()
  }
}

// exposes a singleton
module.exports = new ButtonsService()
