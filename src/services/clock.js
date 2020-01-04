import { now } from '../utils/time'

function handleTick() {
  clock.value = now()
  clock.emit('tick')
}

let interval

/**
 * Monitors current date and time, refreshing every 100 ms
 * @fires ClockService#tick every 100 milliseconds
 */
const clock = {
  /**
   * Current timestamp
   * @type {number}
   */
  value: null,

  /**
   * Starts time monitoring
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
