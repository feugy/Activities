export function padWith0(number) {
  return number < 10 ? `0${number}` : number.toString()
}
