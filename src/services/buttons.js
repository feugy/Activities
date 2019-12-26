let watches = []

/**
 * Monitors button pushes
 * @fires ButtonsService#press when button 1, 2 or 3 is pressed
 */
const buttons = {
  /**
   * Starts monitoring button press
   * @fires ClockService#change every 100 milliseconds
   */
  start() {
    watches = [BTN1, BTN2, BTN3].map(function(button) {
      setWatch(
        function() {
          buttons.emit('press', { button })
        },
        button,
        { repeat: true, edge: 'rising' }
      )
    })
  },

  /**
   * Stops monitoring button press
   */
  stop() {
    watches.forEach(clearWatch)
    watches = []
    buttons.removeAllListeners()
  }
}

export default buttons
