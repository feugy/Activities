import { initLayout } from './common'
import { drawCenteredString, drawString } from '../utils/graphics'
import timeTrackerService from '../services/time-tracker'

/**
 * This layout has 3 columns side by side.
 * The first metric is always drawn as title, while other metrics are displayed per lap in their respective column.
 * @fires [3ColumnsLayout#pause]
 * @fires [3ColumnsLayout#new-lap]
 */
export default function buildLayout(metrics) {
  const width = g.getWidth()
  const height = g.getHeight()
  const padding = 15
  const bigFont = height * 0.15
  const smallFont = height * 0.1

  const layout = initLayout(
    {
      draw() {
        g.clear()
        // draw title
        if (metrics[0]) {
          const { x, y } = drawCenteredString(
            metrics[0].value,
            bigFont,
            width,
            height,
            bigFont * 0.5
          )
          if (metrics[0].drawIcon) {
            metrics[0].drawIcon(x - padding, y + bigFont * 0.7, 0.7)
          }
        }
        // draw each column
        const colW = width / 3
        const rowOffset = bigFont + padding * 2 + 5
        metrics.slice(1).forEach((metric, i) => {
          if (!metric || !metric.drawIcon) {
            return
          }
          metric.drawIcon(colW * 0.5 + colW * i, bigFont + 5 + padding, 0.5)
          // draw one column per lap
          timeTrackerService.value.laps.forEach((lap, j) => {
            drawString(
              metric.value, // TODO per lap
              smallFont,
              colW * i,
              rowOffset + (smallFont + padding) * j
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
