import timeTrackerService from '../services/time-tracker'
import { black, white } from '../utils/colors'

/**
 * Displays current lap
 */
export default function buildMetric(withIcon = true) {
  const metric = {
    /**
     * Services this metric depends on
     * @type {array<Service>}
     */
    deps: [timeTrackerService],

    /**
     * Current displayed value
     * @type {number}
     */
    value: timeTrackerService.value.laps.length,

    /**
     * Invoke to refresh value when one of the dependency has changed
     */
    refresh() {
      metric.value = timeTrackerService.value.laps.length
    },

    /**
     * Draws a rounded arrow
     * @param {number} x - abscissa of the icon center
     * @param {number} y - ordinate of the icon center
     * @param {number} s - scale used
     */
    drawIcon(x, y, s = 1) {
      // white disk to shape the outer border of the arrow
      g.setColor(...white)
      g.fillCircle(x, y, 15 * s)
      // clear smaller disk to shape the inner border of the arrow
      g.setColor(...black)
      g.fillCircle(x, y, 12 * s)
      // clear a triangle to limit arrow beginning and end
      g.fillPoly([x, y, x + 15 * s, y, x + 11 * s, y - 10 * s], true)
      // draws the arrow triangle
      g.setColor(...white)
      g.fillPoly(
        [x + 6 * s, y - 6 * s, x + 13 * s, y - 6 * s, x + 13 * s, y - 13 * s],
        true
      )
    }
  }
  if (!withIcon) {
    delete metric.drawIcon
  }
  return metric
}
