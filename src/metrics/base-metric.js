/**
 * Base class for all metrics.
 * - holds the metric's value,
 * - wraps the formatting logic (display for a given unit and locale),
 * - fires event when value changes
 */
module.exports = class BaseMetric {
  /**
   * Meant for subclasses: allows to set name and initial value
   * @param {object} args - metric arguments, including:
   * @param {string} args.name - metric's name
   * @param {any} [args.value = null] - initial value set
   */
  constructor({ name, value = null }) {
    Object.assign(this, { name, value })
  }

  /**
   * Must be used to change the metric's value: it will trigger the change event with old and new value
   * @param {any} newValue - new value set for this metrics
   * @fires BaseMetric#change
   */
  setValue(newValue) {
    const eventData = { metric: this, oldValue: this.value }
    this.value = newValue
    this.emit('change', eventData)
  }

  /**
   * Computes (possibly memoized) display value for a given locale and unit
   * @param {object} opts - display options:
   * @param {string} opts.locale - desired locale, if any
   * @param {string} opts.unit - desired unit, when relevant
   */
  getDisplayValue({ locale, unit } = {}) {
    return this.value === true
      ? 'On'
      : this.value === false
      ? 'Off'
      : this.value != null
      ? this.value.toString()
      : '--'
  }
}

/**
 * Value change event
 *
 * @event BaseMetric#change
 * @type {object}
 * @property {boolean} metric - the current metric with its new value
 * @property {any} oldValue - the previous value
 */
