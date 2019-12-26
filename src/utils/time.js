/**
 * Return current timestamp.
 * For an unknown reason, Date.now() returns a float with unecessary digits
 * @return {number} of milliseconds since Jan 1st 1970
 */
export function now() {
  return Math.floor(Date.now())
}
