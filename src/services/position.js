import { now } from '../utils/time'

function handlePosition({ speed, alt }) {
  position.value = { t: now(), speed, alt }
  position.emit('change')
}

/**
 * Tracks heart rate over time, to compute average and get latest value.
 * It stores an array of measures, each with a timestamp and a value
 */
const position = {
  /**
   * Latest position and altitude
   * @type {object>} position measure with timestamp (t), speed (speed) and altitude (alt)
   */
  value: {},

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
   * @returns {number} latest known speed in kilometers per hour
   */
  getLatestSpeed() {
    return position.value.speed
  },

  /**
   * @returns {number} latest known altitude in meters
   */
  getLatestAlt() {
    return position.value.alt
  }
}

export default position
