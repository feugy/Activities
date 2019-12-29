import { now } from '../utils/time'

// count how many measures to compute averages
let count = 0

function handleHeartBeat({ bpm, confidence }) {
  if (confidence >= 33) {
    heartRate.value = {
      last: { t: now(), bpm },
      avg: (heartRate.value.avg * count + bpm) / (count + 1)
    }
    count++
    heartRate.emit('change')
  }
}

/**
 * Tracks heart rate over time, to compute average and get latest value.
 * last bpm is stored with its timestamp, and average is computed since last reset
 */
const heartRate = {
  /**
   * Last and average heart beat per minute.
   * @type {object>} heart rate measure with timestamp (t) and value (bpm)
   */
  value: {
    last: null,
    avg: null
  },

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
   * Reset average (typically on new lap)
   */
  reset() {
    heartRate.value.avg = null
    heartRate.value._c = 0
  }
}

export default heartRate
