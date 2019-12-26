import positionService from '../services/position'
import { black, white } from '../utils/colors'

/**
 * Displays current speed
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
      metric.value = positionService.getLatestSpeed() || '--'
    },

    /**
     * Draws a tachymeter
     * @param {number} x - abscissa of the icon center
     * @param {number} y - ordinate of the icon center
     * @param {number} s - scale used
     */
    drawIcon(x, y, s = 1) {
      // white disk to shape the outer border of the tachymeter
      g.setColor(...white)
      g.fillCircle(x, y, 16 * s)
      // clear smaller disk to shape the outer border of the tachymeter
      g.setColor(...black)
      g.fillCircle(x, y, 12 * s)
      // clear a base triangle
      g.fillPoly([x, y, x - 12 * s, y + 16 * s, x + 12 * s, y + 16 * s])
      // draw the needle
      g.setColor(...white)
      g.fillPoly([
        x + 6 * s,
        y - 6 * s,
        x + 2 * s,
        y + 2 * s,
        x - 1 * s,
        y + 3 * s,
        x - 2 * s,
        y - 1 * s
      ])
    }
  }
  if (!withIcon) {
    delete metric.drawIcon
  }
  metric.refresh()
  return metric
}
