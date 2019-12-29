// Earth radius in meter
const R = 6372800
const toRadian = a => (Math.PI / 180) * a
const trigoDistance = (a, b) => (Math.PI / 180) * (a - b)

/**
 * Computes great circle distance based on Habersine Formula
 * @param {object} a - first point, with lat/lon properties
 * @param {object} b - second point, with lat/lon properties
 * @returns {number} distance between points
 * @see https://stackoverflow.com/a/48805273
 */
export function greatCircle(a, b) {
  const angle =
    Math.pow(Math.sin(trigoDistance(b.lat, a.lat) / 2), 2) +
    Math.pow(Math.sin(trigoDistance(b.lon, a.lon) / 2), 2) *
      Math.cos(toRadian(a.lat)) *
      Math.cos(toRadian(b.lat))
  return R * 2 * Math.asin(Math.sqrt(angle))
}

/**
 * Computes distance between two positions including elevation
 * @param {object} a - first point, with lat/lon/alt properties
 * @param {object} b - second point, with lat/lon/alt properties
 * @returns {number} distance between points
 * @see https://medium.com/javascript-in-plain-english/calculating-azimuth-distance-and-altitude-from-a-pair-of-gps-locations-36b4325d8ab0
 */
export function distance(a, b) {
  return Math.floor(
    Math.sqrt(Math.pow(greatCircle(a, b), 2) + Math.pow(a.alt - b.alt, 2))
  )
}
