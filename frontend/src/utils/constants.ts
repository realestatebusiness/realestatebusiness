export type SortOption =
  | 'Relevance'
  | 'Newest First'
  | 'Price Low to High'
  | 'Price High to Low'
  | 'Price / sq.ft. : Low to High'
  | 'Price / sq.ft. : High to Low';

export const sortOptions: SortOption[] = [
  'Relevance',
  'Newest First',
  'Price Low to High',
  'Price High to Low',
  'Price / sq.ft. : Low to High',
  'Price / sq.ft. : High to Low',
];

export type AreaUnit = 'sq_feet' | 'sq_metres' | 'sq_cm' | 'sq_inch';

export interface AreaFilter {
  unit: AreaUnit;
  min: number;
  max: number;
}

export interface FilterState {
  area: AreaFilter;
  amenities: string[];
}


