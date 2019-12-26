import { initLayout } from './common'
import { drawCenteredString } from '../utils/graphics'

/**
 * This layout stacks 3 slots vertically, the first 2 being quite big.
 * @fires [3FieldsLayout#pause]
 * @fires [3FieldsLayout#new-lap]
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
    const { x, y, textH } = drawCenteredString(
      metric.value,
      { width, height },
      fontSize,
      offset
    )
    if (metric.drawIcon) {
      metric.drawIcon(
        x - padding * 1.5,
        y + textH / 2,
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
    metrics,
    function({ button }) {
      if (button === BTN1) {
        layout.emit('pause')
        layout.dispose()
      } else if (button === BTN2) {
        layout.emit('next')
        layout.dispose()
      } else if (button === BTN3) {
        layout.emit('new-lap')
      }
    }
  )
  return layout
}
