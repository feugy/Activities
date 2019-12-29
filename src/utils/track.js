const storage = require('Storage')

const date = new Date()
const fileName = `${`${date.getFullYear()}`.slice(2)}${date.getMonth()}01`

storage.erase(fileName)

const { write } = storage.open(fileName, 'a')

export function save(value) {
  write(JSON.stringify(value))
}
