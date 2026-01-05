export enum CalculationTarget {
  APERTURE = 'Aperture',
  DISTANCE = 'Distance',
  ISO = 'ISO',
  GN = 'Guide Number'
}

export enum UnitSystem {
  METRIC = 'Meters',
  IMPERIAL = 'Feet'
}

export interface CalculatorState {
  target: CalculationTarget;
  iso: number;
  aperture: number;
  distance: number;
  guideNumber: number;
  unit: UnitSystem;
}