import { initMetric } from './common'
import positionService from '../services/position'
import { black, white } from '../utils/colors'

const precision = 2

/**
 * Displays speed
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * Services this metric depends on
       * @type {array<Service>}
       */
      deps: [positionService],

      /**
       * @returns current speed in kilometers per hour
       */
      curr() {
        const { speed } = positionService.value
        return speed == undefined ? '--' : speed.toFixed(precision)
      },

      /**
       * @param {object} lap - lap for which average is displayed.
       *                       Returns service current value if not provided
       * @returns average speed in kilometers per hour in meters
       */
      avg(lap) {
        const avg =
          lap && lap.speed != undefined
            ? lap.speed
            : positionService.value.avgSpeed
        return avg == undefined ? '--' : avg.toFixed(precision)
      },

      /**
       * Draws a tachymeter
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        // white disk to shape the outer border of the tachymeter
        g.setColor.apply(g, white)
        g.fillCircle(x, y, 16 * s)
        // clear smaller disk to shape the outer border of the tachymeter
        g.setColor.apply(g, black)
        g.fillCircle(x, y, 12 * s)
        // clear a base triangle
        g.fillPoly([x, y, x - 12 * s, y + 16 * s, x + 12 * s, y + 16 * s])
        // draw the needle
        g.setColor.apply(g, white)
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
    },
    ...params
  )
}
