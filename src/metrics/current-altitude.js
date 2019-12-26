import positionService from '../services/position'
import { white } from '../utils/colors'

/**
 * Displays current altitude
 */
export default function buildMetric(withIcon = true) {
  const metric = {
    /**
     * Services this metric depends on
     * @type {array<Service>}
     */
    deps: [positionService],

    /**
     * Current displayed value
     * @type {number}
     */
    value: null,

    /**
     * Invoke to refresh value when one of the dependency has changed
     */
    refresh() {
      metric.value = positionService.getLatestAlt() || '--'
    },

    /**
     * Draws montains
     * @param {number} x - abscissa of the icon center
     * @param {number} y - ordinate of the icon center
     * @param {number} s - scale used
     */
    drawIcon(x, y, s = 1) {
      g.setColor(...white)
      g.fillPoly([
        x - 15 * s,
        y + 10 * s,
        x - 5 * s,
        y - 5 * s,
        x + 10 * s,
        y + 10 * s
      ])
      g.fillPoly([
        x - 5 * s,
        y + 10 * s,
        x + 7 * s,
        y - 15 * s,
        x + 15 * s,
        y + 10 * s
      ])
    }
  }
  if (!withIcon) {
    delete metric.drawIcon
  }
  metric.refresh()
  return metric
}
