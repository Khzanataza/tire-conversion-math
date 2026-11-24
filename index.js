/**
 * tire-conversion-math
 * Standard automotive tire & wheel geometry formulas modeled on TRA / ETRTO guidelines.
 * Interactive visual calculators: https://tiretoinches.com/
 */

const MM_PER_INCH = 25.4;
const INCHES_PER_MILE = 63360;

/**
 * Converts a metric tire size (e.g., 285/70R17) into imperial inches and rotational specs.
 * @param {number} widthMm - Nominal section width in millimeters (e.g., 285)
 * @param {number} aspectRatio - Sidewall aspect ratio percentage (e.g., 70)
 * @param {number} rimDiameterInches - Wheel rim diameter in inches (e.g., 17)
 */
export function metricToInches(widthMm, aspectRatio, rimDiameterInches) {
  const widthInches = widthMm / MM_PER_INCH;
  const sidewallMm = widthMm * (aspectRatio / 100);
  const sidewallInches = sidewallMm / MM_PER_INCH;
  const overallDiameterInches = rimDiameterInches + 2 * sidewallInches;
  const overallDiameterMm = overallDiameterInches * MM_PER_INCH;
  const circumferenceInches = overallDiameterInches * Math.PI;
  const revsPerMile = INCHES_PER_MILE / circumferenceInches;

  return {
    widthInches: Number(widthInches.toFixed(2)),
    sidewallInches: Number(sidewallInches.toFixed(2)),
    overallDiameterInches: Number(overallDiameterInches.toFixed(2)),
    overallDiameterMm: Number(overallDiameterMm.toFixed(1)),
    circumferenceInches: Number(circumferenceInches.toFixed(2)),
    revsPerMile: Math.round(revsPerMile),
    flotationNotation: `${overallDiameterInches.toFixed(1)}x${widthInches.toFixed(2)}R${rimDiameterInches}`
  };
}

/**
 * Calculates true vehicle GPS speed and odometer error after changing tire diameter.
 * @param {number} stockDiameterInches - Original factory tire diameter in inches
 * @param {number} newDiameterInches - New tire diameter in inches
 * @param {number} indicatedMph - Speed shown on the dashboard speedometer (default 65 mph)
 */
export function calculateSpeedometerDelta(stockDiameterInches, newDiameterInches, indicatedMph = 65) {
  const ratio = newDiameterInches / stockDiameterInches;
  const actualMph = indicatedMph * ratio;
  const mphError = actualMph - indicatedMph;
  const pctDifference = (ratio - 1) * 100;

  return {
    indicatedMph,
    actualMph: Number(actualMph.toFixed(1)),
    mphError: Number(mphError.toFixed(1)),
    diameterDifferencePct: Number(pctDifference.toFixed(2)),
    rideHeightGainInches: Number(((newDiameterInches - stockDiameterInches) / 2).toFixed(2))
  };
}

/**
 * Computes effective axle gear ratio and required re-gear target to restore factory torque.
 * @param {number} stockDiameterInches - Original tire diameter in inches
 * @param {number} newDiameterInches - New tire diameter in inches
 * @param {number} stockGearRatio - Factory differential gear ratio (e.g., 3.73)
 */
export function calculateEffectiveGearRatio(stockDiameterInches, newDiameterInches, stockGearRatio) {
  const effectiveRatio = stockGearRatio * (stockDiameterInches / newDiameterInches);
  const idealNewGearRatio = stockGearRatio * (newDiameterInches / stockDiameterInches);

  return {
    effectiveGearRatio: Number(effectiveRatio.toFixed(2)),
    idealNewGearRatio: Number(idealNewGearRatio.toFixed(2))
  };
}

/**
 * Computes wheel backspacing and inner/outer fender clearance shifts from rim width & ET offset.
 * @param {number} rimWidthInches - Nominal wheel width in inches (e.g., 9.0)
 * @param {number} offsetMm - Wheel offset (ET) in millimeters (positive = tucked, negative = poke)
 */
export function calculateWheelBackspacing(rimWidthInches, offsetMm) {
  // Total flange-to-flange width adds ~1.0 inch (0.5" per bead lip)
  const overallWheelWidthInches = rimWidthInches + 1.0;
  const centerlineInches = overallWheelWidthInches / 2;
  const offsetInches = offsetMm / MM_PER_INCH;
  const backspacingInches = centerlineInches + offsetInches;

  return {
    backspacingInches: Number(backspacingInches.toFixed(2)),
    offsetInches: Number(offsetInches.toFixed(2))
  };
}
