import * as time from '../utils/time'

/**
 * Tracks events over time, to compute activity and laps durations.
 * For current activity, stores an object with:
 * - start {number} - start timestamp, null when activity has not started
 * - stop {number} - stop timestamp, null when the activity is in progress
 * - pauses {array<array<object>>} - array of pauses, containing start and stop timestamps
 * It also manage such object for each laps created
 *
 * This tracker assumes a consistent usage:
 * - do not call pause/resume before start
 * - after start/resume must come either start or pause
 * - after pause must come either start or resume
 * - after resume must come either start or resume
 * - always call start before invoking next start
 */
const tracker = {
  /**
   * Activity and laps
   * @type {object} containing details of current activity and laps
   */
  value: {
    activity: { start: null, stop: null, pauses: [] },
    laps: [{ start: null, stop: null, pauses: [] }]
  },

  /**
   * Starts current activity by logging a started event
   */
  start() {
    const now = time.now()
    tracker.value.activity.start = now
    tracker.value.laps[0].start = now
    tracker.emit('change')
  },

  /**
   * Pauses current activity by logging a paused event
   */
  pause() {
    const start = time.now()
    tracker.value.activity.pauses.unshift({ start })
    tracker.value.laps[0].pauses.unshift({ start })
    tracker.emit('change')
  },

  /**
   * Resumes current activity by logging a resumed event
   */
  resume() {
    const now = time.now()
    tracker.value.activity.pauses[0].stop = now
    tracker.value.laps[0].pauses[0].stop = now
    tracker.emit('change')
  },

  /**
   * Stops current activity by logging a stopped event
   */
  stop() {
    const now = time.now()
    tracker.value.activity.stop = now
    tracker.value.laps[0].stop = now
    tracker.emit('change')
    this.removeAllListeners()
  },

  /**
   * Stops current lap abd starts a new one
   */
  newLap() {
    const now = time.now()
    tracker.value.laps[0].stop = now
    tracker.value.laps.unshift({ start: now, stop: null, pauses: [] })
    tracker.emit('change')
  }
}

export default tracker
