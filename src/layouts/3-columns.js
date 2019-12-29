import { initLayout } from './common'
import { drawString } from '../utils/graphics'
import lapsService from '../services/laps'

/**
 * This layout has 3 columns side by side.
 * Metrics are displayed per lap in their respective column.
 */
export default function buildLayout(metrics) {
  const width = g.getWidth()
  const height = g.getHeight()
  const padding = 15
  const smallFont = height * 0.1

  const layout = initLayout(
    {
      draw() {
        g.clear()
        // draw each column
        const colW = width / 3
        const rowOffset = padding * 2
        metrics.forEach((metric, i) => {
          if (!metric || !metric.icon) {
            return
          }
          metric.icon(colW * 0.5 + colW * i, padding, 0.5)
          // draw one column per lap
          lapsService.value.forEach((lap, j) => {
            drawString(
              metric.val(lap),
              smallFont,
              colW * (i + 1),
              rowOffset + (smallFont + padding) * j,
              true
            )
          })
        })
        g.flip()
      }
    },
    metrics
  )
  return layout
}
