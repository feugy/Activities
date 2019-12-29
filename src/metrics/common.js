/**
 * Performs common metric initialization:
 * - deletes icon when not required
 * - set value function
 * @param {object} metric - initialized metric
 * @param {string} [valueFct = 'curr'] - name of the value function used
 * @param {boolean} [withIcon = true] - setto false to remove icon
 */
export function initMetric(metric, valueFct, withIcon) {
  if (withIcon === false) {
    delete metric.icon
  }
  metric.val = metric[valueFct || 'curr']
  return metric
}
