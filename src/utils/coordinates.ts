/**
 * Converts decimal degrees to degrees, minutes, seconds format
 */
export function decimalToDMS(
  decimal: number,
  isLatitude: boolean
): {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: string;
} {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;

  let direction: string;
  if (isLatitude) {
    direction = decimal >= 0 ? "N" : "S";
  } else {
    direction = decimal >= 0 ? "E" : "W";
  }

  return {
    degrees,
    minutes,
    seconds,
    direction,
  };
}

/**
 * Formats coordinates in DMS format
 */
export function formatDMS(
  decimal: number,
  isLatitude: boolean
): string {
  const dms = decimalToDMS(decimal, isLatitude);
  return `${dms.degrees}° ${dms.minutes}' ${dms.seconds.toFixed(2)}" ${dms.direction}`;
}
