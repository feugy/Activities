import { initMetric } from './common'
import heartRateService from '../services/heart-rate'
import { white } from '../utils/colors'

/**
 * Displays heart beats per minute
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * Services this metric depends on
       * @type {array<Service>}
       */
      deps: [heartRateService],

      /**
       * @returns current heart beats per minutes
       */
      curr() {
        return heartRateService.value.last == undefined
          ? '--'
          : heartRateService.value.last.bpm
      },

      /**
       * @param {object} lap - lap for which average is displayed.
       *                       Returns service current value if not provided
       * @returns average heart beats per minutes
       */
      avg(lap) {
        const avg =
          lap && lap.bpm != undefined ? lap.bpm : heartRateService.value.avg
        return avg == undefined ? '--' : avg.toFixed(0)
      },

      /**
       * Draws an heart
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        g.setColor.apply(g, white)
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
    },
    ...params
  )
}
