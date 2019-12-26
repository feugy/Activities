import buildStartLayout from './layouts/start'
import buildPauseLayout from './layouts/pause'
import build3FieldsLayout from './layouts/3-fields'
import buildDurationMetric from './metrics/duration'
import buildTimeMetric from './metrics/time'
import buildLapCountMetric from './metrics/lap-count'
import buildCurrentAltitudeMetric from './metrics/current-altitude'
import buildCurrentBPMMetric from './metrics/current-bpm'
import buildCurrentSpeedMetric from './metrics/current-speed'
import clockService from './services/clock'
import buttonsService from './services/buttons'
import timeTrackerService from './services/time-tracker'
import heartRateService from './services/heart-rate'
import positionService from './services/position'

// console.log('> initial', process.memory().free)

Bangle.setLCDMode('doublebuffered')

const allServices = [
  clockService,
  buttonsService,
  heartRateService,
  positionService
]

function handlePause() {
  timeTrackerService.pause()
  const pause = buildPauseLayout()
  pause.on('resume', function() {
    timeTrackerService.resume()
    displayTimeLayout()
  })
  pause.on('stop', function() {
    timeTrackerService.stop()
    allServices.forEach(s => s.stop())
    reset()
  })
}

function displayPositionLayout() {
  const layout = build3FieldsLayout([
    buildCurrentSpeedMetric(),
    buildCurrentAltitudeMetric(),
    buildCurrentBPMMetric()
  ])
  layout.on('next', displayTimeLayout)
  layout.on('pause', handlePause)
}

function displayTimeLayout() {
  const lapDuration = buildDurationMetric(
    timeTrackerService.value.laps[0],
    false
  )
  const layout = build3FieldsLayout([
    buildLapCountMetric(),
    lapDuration,
    buildTimeMetric()
  ])
  layout.on('new-lap', function() {
    timeTrackerService.newLap()
    lapDuration.lap = timeTrackerService.value.laps[0]
  })
  layout.on('next', displayPositionLayout)
  layout.on('pause', handlePause)
}

function displayStart() {
  allServices.forEach(s => s.start())
  buildStartLayout().on('start', function() {
    timeTrackerService.start()
    displayTimeLayout()
  })
}

// setInterval(() => console.log(process.memory().free), 1000)

displayStart()
