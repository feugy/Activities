import build5FieldsLayout from './5-fields'
import buildDurationMetric from '../metrics/duration'
import buildDistanceMetric from '../metrics/distance'
import buildInclineMetric from '../metrics/incline'
import buildDeclineMetric from '../metrics/decline'
import buildSpeedMetric from '../metrics/speed'
import lapsService from '../services/laps'

export default function buildProgressLayout() {
  const lapDuration = buildDurationMetric(lapsService.value[0], 'curr', false)
  const layout = build5FieldsLayout([
    buildSpeedMetric('avg'),
    buildInclineMetric(),
    buildDistanceMetric(),
    buildDeclineMetric(),
    lapDuration
  ])
  layout.on('new-lap', function() {
    lapDuration.lap = lapsService.value[0]
  })
  return layout
}
