import { white } from './colors'

/**
 * Draws some text, horizontally centered, and vertically centered around the given offset.
 * Note: current font is modified and not restored. You also need to clear the appropriate area before drawing text.
 * @param {string} text - displayed text
 * @param {Layout} layout - current layout used, defining display width and height
 * @param {number} fontSize - size of the vector font used
 * @param {number} [verticalOffset = null] - y coordinate of the point used for vertical centering, default to half the layout height.
 * @returns {object} draw text metrics: { x, y, textW, textH }
 */
export function drawCenteredString(
  text,
  { width, height },
  fontSize,
  verticalOffset = null
) {
  const offset = verticalOffset === null ? height * 0.5 : verticalOffset
  g.setFontVector(fontSize)
  const textW = g.stringWidth(text)
  const x = (width - textW) * 0.5
  const y = offset - fontSize * 0.55
  g.setColor(...white)
  g.drawString(text, x, y)
  return { x, y, textW, textH: fontSize }
}
