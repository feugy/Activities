import build3FieldsLayout from './3-fields'
import buildTimeMetric from '../metrics/time'
import buildAltitudeMetric from '../metrics/altitude'
import buildBPMMetric from '../metrics/bpm'

export default function buildInstantLayout() {
  return build3FieldsLayout([
    buildBPMMetric(),
    buildAltitudeMetric(),
    buildTimeMetric()
  ])
}
