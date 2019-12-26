import { now } from '../utils/time'

function handleTick() {
  clock.value = now()
  clock.emit('change')
}

let interval

/**
 * Monitors current date and time, refreshing every 100 ms
 */
const clock = {
  /**
   * Current timestamp
   * @type {number}
   */
  value: null,

  /**
   * Starts time monitoring
   * @fires ClockService#change every 100 milliseconds
   */
  start() {
    handleTick()
    interval = setInterval(handleTick, 100)
  },

  /**
   * Stops time monitoring
   */
  stop() {
    clearInterval(interval)
    clock.removeAllListeners()
  }
}

export default clock
