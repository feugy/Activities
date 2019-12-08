const { buttonsService } = require('../services')

/**
 * Base class for all layouts.
 * - holds a set of metrics,
 * - draw them in slots,
 * - register itself to metric changes to only refresh when needed
 * Bangle screen is 240x240 pixels
 */
module.exports = class BaseLayout {
  /**
   * Meant for subclasses: allows to set name
   * @param {object} args - metric arguments, including:
   * @param {string} args.name - metric's name
   * @param {number} [args.slotNb = 1] - maximum slot supported
   * @param {string} [args.locale = null] - locale used to display metrics
   */
  constructor({ name, locale = null, slotNb = 1 } = {}) {
    Object.assign(this, {
      name,
      metrics: [],
      locale,
      slotNb,
      height: g.getHeight(),
      width: g.getWidth()
    })
    this.onChangedMetric = this.onChangedMetric.bind(this)
    this.onPressedButton = this.onPressedButton.bind(this)
    buttonsService.on('press', this.onPressedButton)
  }

  /**
   * Assigns a metric to a given slot, and registers to its change event.
   * Replace the existing metric when relevant
   * @param {Metric} metric - metric assigned to a given slot
   * @param {number} [slotIdx = 0] - slot index to which the metric is assigned
   * @throws {Error} when desired slot is not supported
   */
  assignMetric(metric, slotIdx = 0) {
    if (slotIdx >= this.slotNb || slotIdx < 0) {
      throw new Error(`Unsupported slot ${slotIdx}`)
    }
    if (this.metrics[slotIdx]) {
      // unregister from previous value
      this.metrics[slotIdx].removeListener('change', this.onChangedMetric)
    }
    // register to the new metric, and redraw
    this.metrics[slotIdx] = metric
    this.metrics[slotIdx].on('change', this.onChangedMetric)
    this.onChangedMetric({ metric })
  }

  /**
   * Handles changed from displayed metrics, redrawing the entire layout
   * @param {object} data - event data:
   * @param {Metric} data.metric - changed metric
   * @param {any} data.oldValue - previous value
   */
  onChangedMetric() {
    g.clear()
    for (let i = 0; i < this.metrics.length; i++) {
      if (this.metrics[i]) {
        const value = this.metrics[i].getDisplayValue({
          locale: this.locale /*, TODO unit */
        })
        g.drawString(value, 30, 30 * (i + 1))
      }
    }
    g.flip()
  }

  /**
   * Invoked when a button is pressed
   * Fires events:
   * - pause on BTN1 (dispose)
   * - next on BTN2
   * @param {object} evt - pressed button event
   * @param {number} evt.button - pressed button
   */
  onPressedButton({ button }) {
    if (button === BTN1) {
      this.emit('pause', this)
      this.dispose()
    } else if (button === BTN2) {
      this.emit('next', this)
    }
  }

  /**
   * Removes change listeners on contained metrics
   */
  dispose() {
    this.removeAllListeners()
    buttonsService.removeListener('press', this.onPressedButton)
    for (const metric of this.metrics) {
      if (metric) {
        metric.removeListener('change', this.onChangedMetric)
      }
    }
  }
}
