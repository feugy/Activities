import { white } from './colors'

/**
 * Draws some text, horizontally centered, and vertically centered around the given offset.
 * Note: current font is modified and not restored. You also need to clear the appropriate area before drawing text.
 * @param {string} text - displayed text
 * @param {number} textH - size of the vector font used
 * @param {number} width - display width
 * @param {number} height - display height
 * @param {number} [verticalOffset = null] - y coordinate of the point used for vertical centering, default to half the layout height.
 * @returns {object} drawn text metrics: { x, y, textW, textH }
 */
export function drawCenteredString(
  text,
  textH,
  width,
  height,
  verticalOffset = null
) {
  const offset = verticalOffset === null ? height * 0.5 : verticalOffset
  g.setFontVector(textH)
  const textW = g.stringWidth(text)
  const x = (width - textW) * 0.5
  const y = offset - textH * 0.55
  g.setColor(...white)
  g.drawString(text, x, y)
  return { x, y, textW, textH }
}

/**
 * Draws some text to the given coordinate.
 * Note: current font is modified and not restored. You also need to clear the appropriate area before drawing text.
 * @param {string} text - displayed text
 * @param {number} textH - size of the vector font used
 * @param {number} x - abscissa of the top-right corner of the first character
 * @param {number} y - ordinate of the top-right corner of the first character
 * @returns {object} drawn text metrics: { textW, textH }
 */
export function drawString(text, textH, x = 0, y = 0) {
  g.setFontVector(textH)
  const textW = g.stringWidth(text)
  g.setColor(...white)
  g.drawString(text, x, y)
  return { textW, textH }
}
