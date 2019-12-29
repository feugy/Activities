import { distance } from '../utils/gps'
import { save } from '../utils/track'
import { now } from '../utils/time'

// count how many measures to compute averages
let count = 0
// when paused, nothing is recorded
let paused = true

function handlePosition({ speed, alt, fix, lat, lon, course }) {
  position.value.hasFix = fix > 0
  if (fix > 0 && !paused) {
    const { avgSpeed, avgAlt, dist } = position.value
    Object.assign(position.value, {
      speed,
      alt,
      lat,
      lon,
      course,
      avgSpeed: (avgSpeed * count + speed) / (count + 1),
      avgAlt: (avgAlt * count + alt) / (count + 1),
      dist: dist + distance(position.value, { lat, lon, alt })
    })
    count++
    const altDiff = position.value.alt == null ? null : alt - position.value.alt
    if (altDiff > 0) {
      position.value.inc += altDiff
    } else if (altDiff < 0) {
      position.value.dec -= altDiff
    }
    position.emit('change')
    save({ speed, alt, lat, lon, time: now() })
  }
}

/**
 * Tracks heart rate over time, to compute average and get latest value.
 * It stores an array of measures, each with a timestamp and a value
 */
const position = {
  /**
   * Service value, including several indicators
   */
  value: {
    // true when satelite fix is ok
    hasFix: false,
    // current speed
    speed: null,
    // current altitude
    alt: null,
    // total incline and decline
    inc: 0,
    dec: 0,
    // current position
    lat: null,
    lon: null,
    // current course
    course: null,
    // average
    avgSpeed: null,
    avgAlt: null,
    // distance
    dist: 0
  },

  /**
   * Starts monitoring position
   * @fires PositionService#change every second or so
   */
  start() {
    Bangle.on('GPS', handlePosition)
    Bangle.setGPSPower(true)
  },

  /**
   * Stops monitoring position
   */
  stop() {
    Bangle.removeListener('GPS', handlePosition)
    Bangle.setGPSPower(false)
    this.removeAllListeners()
  },

  /**
   * Pauses position monitoring
   */
  pause() {
    paused = true
  },

  /**
   * Resumes position monitoring
   */
  resume() {
    paused = false
  },

  /**
   * Reset:
   * - average speed
   * - average altitude
   * - distance
   * - total incline
   * - total decline
   * (typically on new lap)
   */
  reset() {
    Object.assign(position.value, {
      avgSpeed: null,
      avgAlt: null,
      dist: 0,
      inc: 0,
      dec: 0,
      _c: 0
    })
  }
}

export default position
