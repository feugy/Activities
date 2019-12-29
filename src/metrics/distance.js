import { initMetric } from './common'
import positionService from '../services/position'
import { black, white } from '../utils/colors'

/**
 * Displays distance
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
       * @returns current distance in meters
       */
      curr() {
        const { dist } = positionService.value
        return dist == undefined ? '0.00' : (dist / 1000).toFixed(2)
      },

      /**
       * Draws ruler
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        // draw the ruler body
        g.setColor.apply(g, white)
        g.fillPoly([
          x - 14 * s,
          y + 8 * s,
          x - 16 * s,
          y + 7 * s,
          x - 16 * s,
          y - 7 * s,
          x - 14 * s,
          y - 8 * s,
          x + 14 * s,
          y - 8 * s,
          x + 16 * s,
          y - 7 * s,
          x + 16 * s,
          y + 7 * s,
          x + 14 * s,
          y + 8 * s
        ])
        g.setColor.apply(g, black)
        // clear out center tick
        g.fillPoly([
          x - 1 * s,
          y - 6 * s,
          x + 1 * s,
          y - 6 * s,
          x + 1 * s,
          y + 3 * s,
          x,
          y + 5 * s,
          x - 1 * s,
          y + 3 * s
        ])
        // left tick
        g.fillPoly([
          x - 7 * s,
          y - 6 * s,
          x - 5 * s,
          y - 6 * s,
          x - 5 * s,
          y - 1 * s,
          x - 6 * s,
          y,
          x - 7 * s,
          y - 1 * s
        ])
        // left wing tick
        g.fillPoly([
          x - 13 * s,
          y - 6 * s,
          x - 11 * s,
          y - 6 * s,
          x - 11 * s,
          y - 1 * s,
          x - 12 * s,
          y,
          x - 13 * s,
          y - 1 * s
        ])
        // right tick
        g.fillPoly([
          x + 7 * s,
          y - 6 * s,
          x + 5 * s,
          y - 6 * s,
          x + 5 * s,
          y - 1 * s,
          x + 6 * s,
          y,
          x + 7 * s,
          y - 1 * s
        ])
        // right wing tick
        g.fillPoly([
          x + 13 * s,
          y - 6 * s,
          x + 11 * s,
          y - 6 * s,
          x + 11 * s,
          y - 1 * s,
          x + 12 * s,
          y,
          x + 13 * s,
          y - 1 * s
        ])
      }
    },
    ...params
  )
}
