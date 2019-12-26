import { initLayout } from './common'
import { green, red } from '../utils/colors'
import { drawCenteredString } from '../utils/graphics'
import buildTimeMetric from '../metrics/time'
import buildDurationMetric from '../metrics/duration'

const pausedText = 'paused...'

/**
 * Layout displayed on activity pause:
 * - resume/stop markers
 * - duration/current time
 * @fires [PauseLayout#stop]
 * @fires [PauseLayout#resume]
 */
export default function buildLayout() {
  const width = g.getWidth()
  const height = g.getHeight()
  let currentSlot = 0
  const metrics = [buildDurationMetric(), buildTimeMetric()]

  const layout = initLayout(
    {
      draw() {
        g.clear()
        const fontSize = height * 0.15
        // draw message and metric
        drawCenteredString(
          pausedText,
          { width, height },
          height * 0.1,
          height * 0.25
        )
        const { x, y } = drawCenteredString(
          metrics[currentSlot].value,
          { width, height },
          fontSize
        )
        if (metrics[currentSlot].drawIcon) {
          metrics[currentSlot].drawIcon(x - 25, y + fontSize * 0.5)
        }
        // draw icons
        const color = g.getColor()
        g.setColor(...red)
        g.drawRect(width * 0.9, height * 0.915, width * 0.95, height * 0.99)
        g.setColor(...green)
        g.drawPoly(
          [
            width * 0.9,
            0,
            width * 0.95,
            height * 0.0375,
            width * 0.9,
            height * 0.075
          ],
          true
        )
        g.setColor(color)
        g.flip()
      }
    },
    metrics,
    function({ button }) {
      if (button === BTN3) {
        layout.emit('stop')
        layout.dispose()
      } else if (button === BTN2) {
        currentSlot = (currentSlot + 1) % metrics.length
        layout.draw()
      } else if (button === BTN1) {
        layout.emit('resume')
        layout.dispose()
      }
    }
  )
  return layout
}
