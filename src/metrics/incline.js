import { initMetric } from './common'
import positionService from '../services/position'
import { white } from '../utils/colors'

/**
 * Displays incline
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * @returns total incline in meters
       */
      curr() {
        return positionService.value.inc || '--'
      },

      /**
       * Draws arrow going up
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        // first leg: up and right
        g.setColor.apply(g, white)
        g.fillPoly([
          x - 15 * s,
          y + 15 * s,
          x - 4 * s,
          y - 8 * s,
          x - 3 * s,
          y - 4 * s,
          x - 13 * s,
          y + 16 * s
        ])
        // second leg: down and right
        g.fillPoly([
          x - 4 * s,
          y - 8 * s,
          x + 6 * s,
          y,
          x + 7 * s,
          y + 4 * s,
          x - 3 * s,
          y - 4 * s
        ])
        // third leg: up and right
        g.fillPoly([
          x + 6 * s,
          y,
          x + 13 * s,
          y - 13 * s,
          x + 14 * s,
          y - 10 * s,
          x + 7 * s,
          y + 4 * s
        ])
        // arrow
        g.fillPoly([
          x + 17 * s,
          y - 16 * s,
          x + 17 * s,
          y - 8 * s,
          x + 8 * s,
          y - 12 * s
        ])
      }
    },
    ...params
  )
}
