import { initMetric } from './common'
import positionService from '../services/position'
import { white } from '../utils/colors'

/**
 * Displays altitude
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * @returns current altitude in meters
       */
      curr() {
        return positionService.value.alt || '--'
      },

      /**
       * @param {object} lap - lap for which average is displayed.
       *                       Returns service current value if not provided
       * @returns average altitude in meters
       */
      avg(lap) {
        const avg =
          lap && lap.alt != undefined ? lap.alt : positionService.value.avgAlt
        return avg == undefined ? '--' : avg.toFixed(0)
      },

      /**
       * Draws montains
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        g.setColor.apply(g, white)
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
    },
    ...params
  )
}
