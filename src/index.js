// Note: using common.js syntax makes rollup considering there is a default export
// which conflicts with output.exports: 'none' configuration key
import { Layout3Fields, PauseLayout, StartLayout } from './layouts'
// import {
//   CurrentTimeMetric,
//   DurationMetric,
//   CurrentHeartRateMetric
// } from './metrics'
import {
  buttonsService,
  dateTimeService
  // timeTrackerService,
  // heartRateService
} from './services'

Bangle.setLCDMode('doublebuffered')

// const stop = () => {
//   timeTrackerService.dispose()
//   heartRateService.dispose()
//   displayStart()
// }

// const displayActivity = () => {
//   const layout = new Layout3Fields()
//   layout.assignMetric(new CurrentHeartRateMetric())
//   layout.assignMetric(
//     new DurationMetric({ start: timeTrackerService.getActivityStart() }),
//     1
//   )
//   layout.assignMetric(new CurrentTimeMetric(), 2)
//   layout.on('pause', () => {
//     const pause = new PauseLayout()
//     pause.on('resume', displayActivity)
//     pause.on('stop', stop)
//   })
// }

const displayStart = () => {
  new StartLayout() /* .on('start', () => {
    timeTrackerService.start()
    heartRateService.start()
    displayActivity()
  }) */
}
dateTimeService.start()
buttonsService.start()
displayStart()
