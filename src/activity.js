import buildStartLayout from './layouts/start'
import buildPauseLayout from './layouts/pause'
import build3FieldsLayout from './layouts/3-fields'
import build5FieldsLayout from './layouts/5-fields'
import build3ColumnsLayout from './layouts/3-columns'
import buildDurationMetric from './metrics/duration'
import buildDistanceMetric from './metrics/distance'
import buildTimeMetric from './metrics/time'
import buildAltitudeMetric from './metrics/altitude'
import buildInclineMetric from './metrics/incline'
import buildDeclineMetric from './metrics/decline'
import buildBPMMetric from './metrics/bpm'
import buildSpeedMetric from './metrics/speed'
import clockService from './services/clock'
import buttonsService from './services/buttons'
import lapsService from './services/laps'
import heartRateService from './services/heart-rate'
import positionService from './services/position'

// console.log('> initial', process.memory().free)

Bangle.setLCDMode('doublebuffered')

const allServices = [clockService, buttonsService, positionService]

function displayProgressLayout() {
  const lapDuration = buildDurationMetric(lapsService.value[0], 'curr', false)
  const layout = build5FieldsLayout([
    buildSpeedMetric('avg'),
    buildInclineMetric(),
    buildDistanceMetric(),
    buildDeclineMetric(),
    lapDuration
  ])
  layout.on('next', handleNextLayout)
  layout.on('pause', handlePause)
  layout.on('new-lap', function() {
    lapsService.newLap()
    lapDuration.lap = lapsService.value[0]
  })
}

function displayLapsLayout() {
  registerCommandHandlers(
    build3ColumnsLayout([
      buildDurationMetric(),
      buildDistanceMetric(),
      buildSpeedMetric('avg')
    ])
  )
}

function displayInstantLayout() {
  registerCommandHandlers(
    build3FieldsLayout([
      buildBPMMetric(),
      buildAltitudeMetric(),
      buildTimeMetric()
    ])
  )
}

const layouts = [displayProgressLayout, displayLapsLayout, displayInstantLayout]
let currentLayout = 0

function registerCommandHandlers(layout) {
  layout.on('next', handleNextLayout)
  layout.on('pause', handlePause)
  layout.on('new-lap', () => lapsService.newLap())
}

function handlePause() {
  lapsService.pause()
  const pause = buildPauseLayout()
  pause.on('resume', function() {
    lapsService.resume()
    layouts[currentLayout]()
  })
  pause.on('stop', function() {
    lapsService.stop()
    allServices.forEach(s => s.stop())
    reset()
  })
}

function handleNextLayout() {
  currentLayout = (currentLayout + 1) % layouts.length
  layouts[currentLayout]()
}

// setInterval(() => console.log(process.memory().free), 1000)

// start!
allServices.forEach(s => s.start())
buildStartLayout().on('start', function() {
  lapsService.start()
  heartRateService.start()
  positionService.resume()
  layouts[currentLayout]()
})
