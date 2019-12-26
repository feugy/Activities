import clockService from '../services/clock'
import { padWith0 } from '../utils/numbers'

/**
 * Displays current time
 */
export default function buildMetric(withIcon = true) {
  const metric = {
    /**
     * Services this metric depends on
     * @type {array<Service>}
     */
    deps: [clockService],

    /**
     * Current displayed value
     * @type {string}
     */
    value: '--',

    /**
     * Invoke to refresh value when one of the dependency has changed
     */
    refresh() {
      const date = new Date(clockService.value)
      metric.value = `${padWith0(date.getHours())}:${padWith0(
        date.getMinutes()
      )}:${padWith0(date.getSeconds())}`
    }
  }
  if (!withIcon) {
    delete metric.drawIcon
  }
  return metric
}
