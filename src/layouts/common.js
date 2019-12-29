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
 * @param {function} onButtonPressed - handler for pressed buttons
 * @param {function} [handleDispose = null] - custom dispoal
 * @returns {object} enriched layout, for chaining purposes
 */
export function initLayout(layout, metrics, onButtonPressed, onDispose) {
  const handleButton = onButtonPressed || makeHandleButtons(layout)
  // on dispose, release button handler and unregister metrics
  layout.dispose = function() {
    onDispose && onDispose()
    buttonsService.removeListener('press', handleButton)
    unregister(bindings)
  }

  // register metrics and bind button handler
  const bindings = register(metrics, layout)
  buttonsService.on('press', handleButton)

  // first draw
  layout.draw()
  return layout
}

/**
 * Generates a button handler for a given layout:
 * - 'pause' on button 1 (disposes the layout)
 * - 'next' on button 2 (diposes the layout)
 * - 'new-lap' on button 3
 * @param {object} layout - layout used
 * @returns {function} button handler
 */
export function makeHandleButtons(layout) {
  return ({ button }) => {
    if (button === BTN1) {
      layout.emit('pause')
      layout.dispose()
    } else if (button === BTN2) {
      layout.emit('next')
      layout.dispose()
    } else if (button === BTN3) {
      layout.emit('new-lap')
    }
  }
}
