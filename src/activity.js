import buildStartLayout from './layouts/start'
import buildPauseLayout from './layouts/pause'
import clockService from './services/clock'
import buttonsService from './services/buttons'
import lapsService from './services/laps'
import heartRateService from './services/heart-rate'
import positionService from './services/position'
import saveService from './services/save'
import buildProgressLayout from './layouts/progress'
import buildInstantLayout from './layouts/instant'
import buildLapsLayout from './layouts/laps'

console.log('> initial', process.memory().free)
setInterval(() => console.log(process.memory().free), 1000)

Bangle.setLCDMode('doublebuffered')

const allServices = [clockService, buttonsService, positionService, saveService]

const layouts = [buildProgressLayout, buildLapsLayout, buildInstantLayout]
let layoutIdx = 0

function displayLayout() {
  const layout = layouts[layoutIdx]()
  layout.on('next', () => {
    layoutIdx = (layoutIdx + 1) % layouts.length
    displayLayout()
  })
  layout.on('pause', function() {
    lapsService.pause()
    const pauseLayout = buildPauseLayout()
    pauseLayout.on('resume', function() {
      lapsService.resume()
      displayLayout()
    })
    pauseLayout.on('stop', function() {
      lapsService.stop()
      allServices.forEach(s => s.stop())
      reset()
    })
  })
  layout.on('new-lap', () => lapsService.newLap())
}

// start!
allServices.forEach(s => s.start())
buildStartLayout().on('start', function() {
  lapsService.start()
  heartRateService.start()
  positionService.resume()
  displayLayout()
})
