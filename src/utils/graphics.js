import { white } from './colors'

/**
 * Draws some text, horizontally centered, and vertically centered around the given offset.
 * Note: current font is modified and not restored. You also need to clear the appropriate area before drawing text.
 * @param {string} text - displayed text
 * @param {number} textH - size of the vector font used
 * @param {number} width - display width
 * @param {number} height - display height
 * @param {number} verticalOffset - y coordinate of the point used for vertical centering, default to half the layout height.
 * @param {number} verticalOffset - y coordinate of the point used for horizontal centering, default to half the layout width.
 * @returns {object} drawn text metrics: { x, y, textW, textH }
 */
export function drawCenteredString(
  text,
  textH,
  width,
  height,
  verticalOffset,
  horizontalOffset
) {
  const vOffset = verticalOffset || height * 0.5
  const hOffset = horizontalOffset || width * 0.5
  g.setFontVector(textH)
  const textW = g.stringWidth(text)
  const x = hOffset - textW * 0.5
  const y = vOffset - textH * 0.55
  g.setColor.apply(g, white)
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
 * @param {boolean} [rightAlign = false] - true to consider x/y as top-left corner of the last character
 * @returns {object} drawn text metrics: { textW, textH }
 */
export function drawString(text, textH, x, y, rightAlign) {
  g.setFontVector(textH)
  const textW = g.stringWidth(text)
  g.setColor.apply(g, white)
  g.drawString(text, (x || 0) - (rightAlign ? textW : 0), y || 0)
  return { textW, textH }
}
