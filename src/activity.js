import buildStartLayout from './layouts/start'
import clockService from './services/clock'
import buttonsService from './services/buttons'
import lapsService from './services/laps'
import heartRateService from './services/heart-rate'
import positionService from './services/position'
import saveService from './services/save'

const allServices = [clockService, buttonsService, positionService, saveService]

const layoutLoaders = [
  () => import('./layouts/progress').then(l => l.build()),
  () => import('./layouts/laps').then(l => l.build()),
  () => import('./layouts/instant').then(l => l.build())
]
let layoutIdx = 0

function displayLayout() {
  layoutLoaders[layoutIdx]().then(layout => {
    // TODO causes LOW_MEMORY error :(
    // Modules.removeAllCached()
    layout.on('next', () => {
      layoutIdx = (layoutIdx + 1) % layoutLoaders.length
      displayLayout()
    })
    layout.on('pause', () => {
      lapsService.pause()
      import('./layouts/pause').then(l => {
        const pauseLayout = l.build()
        pauseLayout.on('resume', () => {
          lapsService.resume()
          displayLayout()
        })
        pauseLayout.on('stop', () => {
          lapsService.stop()
          allServices.forEach(s => s.stop())
          reset()
        })
      })
    })
    layout.on('new-lap', () => lapsService.newLap())
  })
}

export function build() {
  allServices.forEach(s => s.start())
  buildStartLayout().on('start', () => {
    lapsService.start()
    heartRateService.start()
    positionService.resume()
    displayLayout()
  })
}
