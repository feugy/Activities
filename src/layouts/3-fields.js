import { initLayout } from './common'
import { drawCenteredString } from '../utils/graphics'

/**
 * This layout stacks 3 slots vertically, the first 2 being quite big.
 */
export default function buildLayout(metrics) {
  const width = g.getWidth()
  const height = g.getHeight()
  const padding = 20
  const bigFont = height * 0.2
  const smallFont = height * 0.1

  function drawMetric(metric, offset, fontSize) {
    if (!metric) {
      return
    }
    const { x, y } = drawCenteredString(
      metric.val(),
      fontSize,
      width,
      height,
      offset
    )
    if (metric.icon) {
      metric.icon(
        x - padding * 1.5,
        y + fontSize / 2,
        fontSize === bigFont ? 1 : 0.7
      )
    }
  }

  const layout = initLayout(
    {
      draw() {
        g.clear()
        drawMetric(metrics[0], height * 0.2, bigFont)
        drawMetric(metrics[1], height * 0.5, bigFont)
        drawMetric(metrics[2], height * 0.8, smallFont)
        g.flip()
      }
    },
    metrics
  )
  return layout
}
