const BaseService = require('./base-service')

/**
 * Monitors button pushes
 */
class ButtonsService extends BaseService {
  constructor() {
    super({ name: 'buttons' })
  }

  /**
   * TODOC
   * @returns {ButtonsService} for chaining purposes
   * @fires Buttons#press on button pushes
   */
  start() {
    this.watches = [BTN1, BTN2, BTN3].map(button =>
      setWatch(() => this.emit('press', { button }), button, { repeat: true })
    )
    return this
  }

  /**
   * Stops buttons monitoring
   * @returns {ButtonsService} for chaining purposes
   */
  dispose() {
    this.watches.forEach(clearWatch)
    return this
  }
}

// exposes a singleton
module.exports = new ButtonsService()
