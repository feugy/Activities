import { initMetric } from './common'
import clockService from '../services/clock'
import { padWith0 } from '../utils/numbers'
import { black, white } from '../utils/colors'
import { now } from '../utils/time'

/**
 * Tracks ellapsed time since creation (or dateTimeService's start)
 * Stores duration in millis
 * @param {object} lap - current lap tracked, with:
 * @param {number} lap.start - start timestamp
 * @param {number} lap.stop - stop timestamp, when defined
 * @param {array<object>} lap.pauses - array of pauses
 * @param {number} lap.pauses[].start - pause start timestamp
 * @param {number} lap.pauses[].stop - pause stop timestamp, when defined
 */
export default function buildMetric(lap, ...params) {
  if (!lap) {
    lap = { start: now(), stop: null, pauses: [] }
  }
  const metric = initMetric(
    {
      /**
       * Current lap
       */
      lap,

      /**
       * Compute lap duration, using either provided lap or metric lap.
       * @param {object} lapParam - lap for which duration is computed, with:
       * @param {number} lapParam.start - start timestamp
       * @param {number} lapParam.stop - stop timestamp, when defined
       * @param {array<object>} lapParam.pauses - array of pauses
       * @param {number} lapParam.pauses[].start - pause start timestamp
       * @param {number} lapParam.pauses[].stop - pause stop timestamp, when defined
       * @returns duration for this lap
       */
      curr(lapParam) {
        const lap = lapParam || metric.lap
        // if lap is over, consider stop date as now
        let now = lap.stop || clockService.value
        // sum up time spent in pauses
        const paused = lap.pauses.reduce(function(paused, { start, stop }) {
          if (stop) {
            // pause is over
            return stop - start + paused
          } else {
            // pause in progress: consider pause start as now
            now = start
            return paused
          }
        }, 0)
        const duration = now - lap.start - paused
        const minutes = Math.floor(duration / 60000)
        const seconds = Math.floor(duration - minutes * 60000) / 1000
        return `${padWith0(minutes)}'${padWith0(seconds.toFixed(1))}`
      },

      /**
       * Draws a timer
       * @param {number} x - abscissa of the icon center
       * @param {number} y - ordinate of the icon center
       * @param {number} s - scale used
       */
      icon(x, y, s) {
        s = s == null ? 1 : s
        // white disk for the clock
        g.setColor.apply(g, white)
        g.fillCircle(x, y, 15 * s)
        // top button
        g.fillRect(x - 2 * s, y - 15 * s, x + 2 * s, y - 17 * s)
        // left button
        g.fillPoly(
          [
            x - 12 * s,
            y - 9 * s,
            x - 15 * s,
            y - 11 * s,
            x - 10 * s,
            y - 15 * s,
            x - 8 * s,
            y - 11 * s
          ],
          true
        )
        // right button
        g.fillPoly(
          [
            x + 12 * s,
            y - 9 * s,
            x + 15 * s,
            y - 11 * s,
            x + 10 * s,
            y - 15 * s,
            x + 8 * s,
            y - 11 * s
          ],
          true
        )
        // clear a third of the clock frame
        g.setColor.apply(g, black)
        g.fillPoly(
          [
            x,
            y,
            x + 11 * s,
            y + 6 * s,
            x + 12 * s,
            y - 2 * s,
            x + 8 * s,
            y - 9 * s,
            x + 6 * s,
            y - 10 * s,
            x + 4 * s,
            y - 11 * s,
            x,
            y - 12 * s
          ],
          true
        )
      }
    },
    ...params
  )
  return metric
}
