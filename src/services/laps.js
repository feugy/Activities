import * as time from '../utils/time'
import positionService from './position'
import heartRateService from './heart-rate'

/**
 * Tracks laps start, stop and pauses.
 * For each lap, stores an object with:
 * - start {number} - start timestamp, null when lap has not started
 * - stop {number} - stop timestamp, null when the lap is in progress
 * - pauses {array<array<object>>} - array of pauses, containing start and stop timestamps
 *
 * This tracker assumes a consistent usage:
 * - do not call pause/resume before start
 * - after start/resume must come either start or pause
 * - after pause must come either start or resume
 * - after resume must come either start or resume
 * - always call start before invoking next start
 */
const laps = {
  /**
   * Laps tracked, in reverse order (most recent first)
   * @type {array<object>} containing details of each laps
   */
  value: [{ start: null, stop: null, pauses: [] }],

  /**
   * Starts lap tracking and first lap
   */
  start() {
    laps.value[0].start = time.now()
  },

  /**
   * Pauses current lap
   */
  pause() {
    laps.value[0].pauses.unshift({ start: time.now() })
    positionService.pause()
  },

  /**
   * Resumes current lap
   */
  resume() {
    laps.value[0].pauses[0].stop = time.now()
    positionService.resume()
  },

  /**
   * Stops lap tracking and current lap
   */
  stop() {
    laps.value[0].stop = time.now()
  },

  /**
   * Stops current lap and starts a new one
   */
  newLap() {
    const now = time.now()
    Object.assign(laps.value[0], {
      stop: now,
      // store averages for lap display
      bpm: heartRateService.value.avg,
      speed: positionService.value.avgSpeed,
      alt: positionService.value.avgAlt
    })
    laps.value.unshift({ start: now, stop: null, pauses: [] })
    // reset average from other services
    positionService.reset()
    heartRateService.reset()
  }
}

export default laps
