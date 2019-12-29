import { initLayout } from './common'
import { green, white } from '../utils/colors'
import { drawCenteredString } from '../utils/graphics'
import buildTimeMetric from '../metrics/time'
import positionService from '../services/position'

const startText = 'Start'

/**
 * Layout to start an activity, with current time and start button
 * @fires [StartLayout#start]
 */
export default function buildLayout() {
  const width = g.getWidth()
  const height = g.getHeight()
  const metric = buildTimeMetric()

  const layout = initLayout(
    {
      draw() {
        g.clear()
        let fontSize = height * 0.2
        g.setColor.apply(g, green)
        const radius = height * 0.17
        // draw rounded border around text
        const rectLeft = width * 0.32
        const rectRight = width * 0.87
        const rectTop = height * 0.5 - radius
        const rectBottom = height * 0.5 + radius
        g.drawCircle(rectLeft, height * 0.5, radius)
        g.drawCircle(rectRight, height * 0.5, radius)
        g.clearRect(rectLeft, rectTop, rectRight, rectBottom)
        g.drawLine(rectLeft, rectTop, rectRight, rectTop)
        g.drawLine(rectLeft, rectBottom, rectRight, rectBottom)
        // draw triangle next to button 2
        g.drawPoly(
          [
            width * 0.86,
            height * 0.44,
            width * 0.92,
            height * 0.5,
            width * 0.86,
            height * 0.56
          ],
          true
        )
        g.setColor.apply(g, white)
        drawCenteredString(startText, fontSize, width, height)
        // draw metric at the top
        fontSize = height * 0.1
        drawCenteredString(
          metric.curr(),
          fontSize,
          width,
          height,
          fontSize * 0.5
        )
        // draw satelite fix at the bottom
        const color = positionService.value.hasFix ? green : white
        g.setColor.apply(g, color)
        g.drawCircle(width * 0.5, height * 0.85, 10)
        if (positionService.value.hasFix) {
          g.fillCircle(width * 0.5, height * 0.85, 7)
        }
        g.flip()
      }
    },
    [metric],
    function({ button }) {
      if (button === BTN2) {
        layout.emit('start')
        layout.dispose()
      }
    }
  )

  return layout
}
