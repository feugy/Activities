const { readFile, writeFile } = require('fs').promises
const { extname } = require('path')
const createGpx = require('gps-to-gpx').default

/**
 * Convert a track file from the Bangle to a GPX file
 * Could then be used on https://www.gpx-view.com
 * @async
 * @param {string} input - path to JSON file
 * @returns {string} created GPX file path
 */
const convertToGPX = async input => {
  // TODO concatenate various part
  // TODO handle errors
  const track = JSON.parse(await readFile(input, 'utf8'))
  const waypoints = track
    .filter(p => p != null)
    .sort((a, b) => a.time - b.time)
    .map(metric => (metric.bpm ? null : metric))
    .filter(p => p != null)
  console.log(`
Analysis:
- ${waypoints.length} positions
- from ${new Date(waypoints[0].time * 1000)} to ${new Date(
    waypoints[waypoints.length - 1].time * 1000
  )}
`)
  const output = input.replace(extname(input), '.gpx')
  await writeFile(
    output,
    createGpx(waypoints, {
      activityName: 'Test activity',
      creator: 'Bangle.js',
      eleKey: 'alt',
      latKey: 'lat',
      lonKey: 'lon',
      timeKey: 'time'
    })
  )
  return output
}

// usage: `node tools/trackToGPX runs/track-1.json`
convertToGPX(process.argv[2])
