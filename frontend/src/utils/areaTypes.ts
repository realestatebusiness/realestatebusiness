export type AreaUnit = 'sq_metres' | 'sq_cm' | 'sq_feet' | 'sq_inch' | 'acres' | 'marla' | 'cents' | 'sq_yards';

export interface AreaFilterProps {
  areaUnit?: AreaUnit;
  minArea?: number;
  maxArea?: number;
  onAreaChange?: (min: number, max: number, unit: AreaUnit) => void;
}