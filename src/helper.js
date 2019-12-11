/**
 * Generates random number
 * The maximum is inclusive and the minimum is inclusive
 */
export function generateRandomNumber( min, max ) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

