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
