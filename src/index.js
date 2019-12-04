// Note: using common.js syntax makes rollup considering there is a default export
// which conflicts with output.exports: 'none' configuration key
import { Layout3Fields, PauseLayout, StartLayout } from './layouts'
import { BaseMetric, CurrentTimeMetric, DurationMetric } from './metrics'
import { buttonsService, dateTimeService } from './services'

let started = false
let paused = false
let layout = new StartLayout()
let duration

dateTimeService.start()
buttonsService.start().on('press', ({ button }) => {
  if ((!started && button === BTN2) || (paused && button === BTN3)) {
    console.log('started or resume')
    started = true
    paused = false
    layout.dispose()
    layout = new Layout3Fields()
    layout.assignMetric(new BaseMetric({ name: 'hello', value: 'Hello!' }))
    if (!duration) {
      duration = new DurationMetric()
    }
    layout.assignMetric(duration, 1)
    layout.assignMetric(new CurrentTimeMetric(), 2)
  } else if (!paused && started && button === BTN2) {
    console.log('paused')
    paused = true
    layout.dispose()
    layout = new PauseLayout()
  } else if (paused && button === BTN1) {
    console.log('stopped')
    paused = false
    started = false
    layout.dispose()
    layout = new StartLayout()
    duration = null
  }
})
