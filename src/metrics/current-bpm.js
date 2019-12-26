import heartRateService from '../services/heart-rate'
import { white } from '../utils/colors'

/**
 * Displays current heart beats per minute
 */
export default function buildMetric(withIcon = true) {
  const metric = {
    /**
     * Services this metric depends on
     * @type {array<Service>}
     */
    deps: [heartRateService],

    /**
     * Current displayed value
     * @type {number}
     */
    value: null,

    /**
     * Invoke to refresh value when one of the dependency has changed
     */
    refresh() {
      metric.value = heartRateService.getLatestBPM() || '--'
    },

    /**
     * Draws an heart
     * @param {number} x - abscissa of the icon center
     * @param {number} y - ordinate of the icon center
     * @param {number} s - scale used
     */
    drawIcon(x, y, s = 1) {
      g.setColor(...white)
      // two circles
      g.fillCircle(x - 8 * s, y - 3 * s, 9 * s)
      g.fillCircle(x + 8 * s, y - 3 * s, 9 * s)
      // a fat triangle
      g.fillPoly([
        x,
        y + 15 * s,
        x - 9 * s,
        y + 8 * s,
        x - 16 * s,
        y + 1 * s,
        x + 16 * s,
        y + 1 * s,
        x + 9 * s,
        y + 8 * s
      ])
    }
  }
  if (!withIcon) {
    delete metric.drawIcon
  }
  metric.refresh()
  return metric
}
