import { initMetric } from './common'
import clockService from '../services/clock'
import { padWith0 } from '../utils/numbers'

/**
 * Displays time
 */
export default function buildMetric(...params) {
  return initMetric(
    {
      /**
       * @returns current time with hours, minutes and seconds
       */
      curr() {
        const date = new Date(clockService.value)
        return date
          ? `${padWith0(date.getHours())}:${padWith0(
              date.getMinutes()
            )}:${padWith0(date.getSeconds())}`
          : '--'
      }
    },
    ...params
  )
}
