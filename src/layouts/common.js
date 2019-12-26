import { register, unregister } from '../utils/events'
import buttonsService from '../services/buttons'

/**
 * Performs common layout initialization:
 * - register metrics
 * - bind button press handler
 * - attach dispose() method to layout, to unregister metrics, unbind listener, and call custom disposal
 * - performs first draw
 * @param {object} layout - initialized layout
 * @param {array<object>} metrics - array of displayed metrics
 * @param {function} handleButtonPressed - handler for pressed buttons
 * @param {function} [handleDispose = null] - custom dispoal
 * @returns {object} enriched layout, for chaining purposes
 */
export function initLayout(
  layout,
  metrics,
  handleButtonPressed,
  handleDispose
) {
  // on dispose, release button handler and unregister metrics
  layout.dispose = function() {
    handleDispose && handleDispose()
    buttonsService.removeListener('press', handleButtonPressed)
    unregister(bindings)
  }

  // register metrics and bind button handler
  const bindings = register(metrics, layout)
  buttonsService.on('press', handleButtonPressed)

  // first draw
  layout.draw()
  return layout
}
