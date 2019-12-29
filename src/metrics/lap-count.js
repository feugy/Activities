import { initMetric } from './common'
import lapsService from '../services/laps'
import { black, white } from '../utils/colors'

/**
 * Displays total lap count
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * Services this metric depends on
       * @type {array<Service>}
       */
      deps: [lapsService],

      /**
       * @returns number of laps
       */
      curr() {
        return lapsService.value.length
      },

      /**
       * Draws a rounded arrow
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        // white disk to shape the outer border of the arrow
        g.setColor.apply(g, white)
        g.fillCircle(x, y, 15 * s)
        // clear smaller disk to shape the inner border of the arrow
        g.setColor.apply(g, black)
        g.fillCircle(x, y, 12 * s)
        // clear a triangle to limit arrow beginning and end
        g.fillPoly([x, y, x + 15 * s, y, x + 11 * s, y - 10 * s], true)
        // draws the arrow triangle
        g.setColor.apply(g, white)
        g.fillPoly(
          [x + 6 * s, y - 6 * s, x + 13 * s, y - 6 * s, x + 13 * s, y - 13 * s],
          true
        )
      }
    },
    ...params
  )
}
