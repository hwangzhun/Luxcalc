import { CalculationTarget } from '../types';

/**
 * Calculates the missing parameter based on the exposure triangle for flash.
 * Formula: GN_effective = Aperture * Distance
 * GN_effective = GN_base * sqrt(ISO / 100)
 */
export const calculateFlashParameter = (
  target: CalculationTarget,
  gn: number,
  iso: number,
  aperture: number,
  distance: number
): string => {
  // Ensure we don't divide by zero
  if (distance <= 0) distance = 1;
  if (aperture <= 0) aperture = 1;
  if (iso <= 0) iso = 100;
  
  const isoFactor = Math.sqrt(iso / 100);

  switch (target) {
    case CalculationTarget.APERTURE:
      // f = (GN * isoFactor) / distance
      const resultF = (gn * isoFactor) / distance;
      return `ƒ/${resultF.toFixed(1)}`;

    case CalculationTarget.DISTANCE:
      // d = (GN * isoFactor) / aperture
      const resultD = (gn * isoFactor) / aperture;
      return resultD.toFixed(1);

    case CalculationTarget.ISO:
      // ISO = 100 * ((aperture * distance) / gn)^2
      const resultISO = 100 * Math.pow((aperture * distance) / gn, 2);
      return Math.round(resultISO).toString();

    case CalculationTarget.GN:
      // GN_base = (aperture * distance) / isoFactor
      const resultGN = (aperture * distance) / isoFactor;
      return resultGN.toFixed(1);

    default:
      return "0";
  }
};