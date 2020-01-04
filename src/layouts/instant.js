import build3ColumnsLayout from './3-columns'
import buildDurationMetric from '../metrics/duration'
import buildDistanceMetric from '../metrics/distance'
import buildSpeedMetric from '../metrics/speed'

export default function buildInstantLayout() {
  return build3ColumnsLayout([
    buildDurationMetric(),
    buildDistanceMetric(),
    buildSpeedMetric('avg')
  ])
}
