const BaseService = require('./base-service')

const started = 'started'
const stopped = 'stopped'
const paused = 'paused'
const resumed = 'resumed'

/**
 * Tracks events over time, to compute durations.
 * It stores an array of traces (this.value), each with a timestamp and a type
 *
 * This tracker assumes a consistent usage:
 * - do not call pause/resume before start
 * - after start/resume must come either dispose or pause
 * - after pause must come either dispose or resume
 * - after resume must come either dispose or resume
 * - always call dispose before invoking next start
 *
 * Supported types:
 * - started: beginning of current activity
 * - stopped: end of current activity. No end means the activity is in progress
 * - paused: beginning of activity pause
 * - resumed: end of activity pause
 * - lapTicked: TODO
 */
class TimeTrackerService extends BaseService {
  constructor() {
    super({ name: 'time-tracker', value: [] })
  }

  /**
   * Starts current activity by logging a 'start' trace
   * @returns {TimeTrackerService} for chaining purposes
   */
  start() {
    this.value = [{ ts: Date.now(), type: started }]
    return this
  }

  /**
   * Pauses current activity by logging a 'pause' trace
   * @returns {TimeTrackerService} for chaining purposes
   */
  pause() {
    this.value.push({ ts: Date.now(), type: paused })
    return this
  }

  /**
   * Resumes current activity by logging a 'resume' trace
   * @returns {TimeTrackerService} for chaining purposes
   */
  resume() {
    this.value.push({ ts: Date.now(), type: resumed })
    return this
  }

  /**
   * Returns current activity "virtual" start, that is, start timestamp + time spent in pause.
   * Subtracting the virtual start to current time will give the activity duration
   * Does not support stopped or paused activity
   * @returns {number} virtual time whan activity started. Current time if actitity has not started
   */
  getActivityStart() {
    if (this.value.length === 0) {
      return Date.now()
    }
    let start
    let paused = 0
    let pauseStart
    for (const { ts, type } of this.value) {
      if (type === started) {
        start = ts
      } else if (type === paused) {
        pauseStart = ts
      } else if (type === resumed || type === stopped) {
        paused += ts - pauseStart
      }
    }
    return start + paused
  }

  /**
   * Stops current activity by logging a 'stop' trace
   * @returns {TimeTrackerService} for chaining purposes
   */
  dispose() {
    this.value.push({ ts: Date.now(), type: stopped })
    return this
  }
}

// exposes a singleton
module.exports = new TimeTrackerService()
