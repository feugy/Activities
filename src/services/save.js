const storage = require('Storage')

let file

/**
 * Saves data on storage
 */
const saver = {
  /**
   * Prepare file to receive saved data
   */
  start() {
    const date = new Date()
    const fileName = `${date.getFullYear()}`.slice(2) + `${date.getMonth()}01`
    // erase all previous part for this file
    for (let i = 1; i <= 255; i++) {
      storage.erase(fileName + String.fromCharCode(i.toString(8)))
    }
    file = storage.open(fileName, 'a')
    file.write('[')
  },

  /**
   * Save JavaScript object to the file (assumes start was called)
   * @param {object} value - saved value
   */
  write(value) {
    file.write(',' + JSON.stringify(value))
  },

  /**
   * Closes file (assume start was called)
   */
  stop() {
    file.write(']')
  }
}

export default saver
