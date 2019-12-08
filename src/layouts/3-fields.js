const BaseLayout = require('./base-layout')
const { drawCenteredString } = require('../utils')

const drawMetric = (metric, offset, fontSize, layout) => {
  const { locale } = layout
  const value = metric
    ? metric.getDisplayValue({
        locale /*, TODO unit */
      })
    : '--'
  drawCenteredString(value, layout, fontSize, offset)
  // TODO draw name/icon, draw unit
}

/**
 * This layout stacks 3 slots vertically, the first 2 being quite big.
 */
module.exports = class Layout3Fields extends BaseLayout {
  constructor(args = {}) {
    super({ ...args, slotNb: 3, name: '3-fields' })
  }

  /**
   * Handles changed from displayed metrics, redrawing the entire layout
   * @param {object} data - event data:
   * @param {Metric} data.metric - changed metric
   * @param {any} data.oldValue - previous value
   */
  onChangedMetric() {
    const { height } = this
    const bigFont = height * 0.2
    const smallFont = height * 0.1
    g.clear()
    drawMetric(this.metrics[0], height * 0.2, bigFont, this)
    drawMetric(this.metrics[1], height * 0.5, bigFont, this)
    drawMetric(this.metrics[2], height * 0.8, smallFont, this)
    g.flip()
  }
}
