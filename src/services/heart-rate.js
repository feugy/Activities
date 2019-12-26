import { now } from '../utils/time'

function handleHeartBeat({ bpm, confidence }) {
  if (confidence >= 33) {
    heartRate.value = { t: now(), bpm }
    heartRate.emit('change')
  }
}

/**
 * Tracks heart rate over time, to compute average and get latest value.
 * It stores an array of measures, each with a timestamp and a value
 */
const heartRate = {
  /**
   * Latest heart beat per minute
   * @type {object>} heart rate measure with timestamp (t) and value (bpm)
   */
  value: {},

  /**
   * Starts monitoring heart rate
   * @fires HeartRateService#change every second or so
   */
  start() {
    Bangle.on('HRM', handleHeartBeat)
    Bangle.setHRMPower(true)
  },

  /**
   * Stops monitoring heart rate
   */
  stop() {
    Bangle.removeListener('HRM', handleHeartBeat)
    Bangle.setHRMPower(false)
    this.removeAllListeners()
  },

  /**
   * @returns {number} latest known BPM or null
   */
  getLatestBPM() {
    return heartRate.value.bpm
  }
}

export default heartRate
