/**
 * Draws some text, horizontally centered, and vertically centered around the given offset.
 * Note: current font is modified and not restored. You also need to clear the appropriate area before drawing text.
 * @param {string} text - displayed text
 * @param {Layout} layout - current layout used, defining display width and height
 * @param {number} fontSize - size of the vector font used
 * @param {number} [verticalOffset = null] - y coordinate of the point used for vertical centering, default to half the layout height.
 * @returns {object} draw text metrics: { x, y, width, height }
 */
exports.drawCenteredString = (
  text,
  layout,
  fontSize,
  verticalOffset = null
) => {
  const { width, height } = layout
  const offset = verticalOffset === null ? height * 0.5 : verticalOffset
  g.setFontVector(fontSize)
  const textW = g.stringWidth(text)
  const x = (width - textW) * 0.5
  const y = offset - fontSize * 0.55
  g.drawString(text, x, y)
  return { x, y, width: textW, height: fontSize }
}
