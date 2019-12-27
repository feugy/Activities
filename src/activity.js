import buildStartLayout from './layouts/start'
import buildPauseLayout from './layouts/pause'
import build3FieldsLayout from './layouts/3-fields'
import build3ColumnsLayout from './layouts/3-columns'
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
  buttonsService
  // heartRateService,
  // positionService
]

function displayPositionLayout() {
  const layout = build3FieldsLayout([
    buildCurrentSpeedMetric(),
    buildCurrentAltitudeMetric(),
    buildCurrentBPMMetric()
  ])
  layout.on('next', handleNextLayout)
  layout.on('pause', handlePause)
}

function displayLapsLayout() {
  const layout = build3ColumnsLayout([
    buildLapCountMetric(),
    buildDurationMetric(),
    buildDurationMetric(),
    buildDurationMetric()
  ])
  layout.on('next', handleNextLayout)
  layout.on('pause', handlePause)
  layout.on('new-lap', () => {
    timeTrackerService.newLap()
  })
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
  layout.on('next', handleNextLayout)
  layout.on('pause', handlePause)
}

const layouts = [displayLapsLayout, displayTimeLayout, displayPositionLayout]
let currentLayout = -1

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

function handleNextLayout() {
  currentLayout = (currentLayout + 1) % layouts.length
  layouts[currentLayout]()
}

function displayStart() {
  allServices.forEach(s => s.start())
  buildStartLayout().on('start', function() {
    timeTrackerService.start()
    handleNextLayout()
  })
}

// setInterval(() => console.log(process.memory().free), 1000)

displayStart()
