import { initLayout } from './common'
import { drawCenteredString } from '../utils/graphics'

/**
 * This layout has 2 columns containing each 2 metrics, the last metric being cnetered bellow them
 */
export default function buildLayout(metrics) {
  const width = g.getWidth()
  const height = g.getHeight()
  const padding = 10
  const fontSize = height * 0.18
  const colW = width / 2

  function drawMetric(metric, offset, col) {
    if (metric) {
      if (metric.icon) {
        metric.icon(colW * (col + 0.5), offset + padding * 0.8, 0.5)
      }
      drawCenteredString(
        metric.val(),
        fontSize,
        0,
        0,
        offset + padding * 3.2,
        colW * (col + 0.5)
      )
    }
  }

  const layout = initLayout(
    {
      draw() {
        g.clear()
        // draw each column
        drawMetric(metrics[0], 0, 0)
        drawMetric(metrics[1], 0, 1)
        drawMetric(metrics[2], padding * 3.5 + fontSize, 0)
        drawMetric(metrics[3], padding * 3.5 + fontSize, 1)
        if (metrics[4]) {
          const { x, y } = drawCenteredString(
            metrics[4].val(),
            fontSize,
            width,
            height,
            padding * 7 + fontSize * 2.5
          )
          if (metrics[4].icon) {
            metrics[4].icon(x - padding * 2, y + fontSize / 2, 0.7)
          }
        }
        g.flip()
      }
    },
    metrics
  )
  return layout
}
