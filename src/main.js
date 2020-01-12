console.log('> initial', process.memory().free)
setInterval(() => console.log(process.memory().free), 1000)

Bangle.setLCDMode('doublebuffered')

import('./activity').then(a => a.build())
