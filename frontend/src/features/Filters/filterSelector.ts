import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { VillaProperty } from '../../types/propertyInterface.';

export const selectAllProperties = (state: RootState) => state.property.data;

export const selectPropertyLoading = (state: RootState) => state.property.loading;
export const selectPropertyError = (state: RootState) => state.property.error;

// Budget filters from filtersSlice
export const selectBudgetRange = (state: RootState) => ({
  min: state.filters.minBudget,
  max: state.filters.maxBudget,
});

export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectBudgetRange],
  (properties: VillaProperty[], { min, max }) => {
    return properties.filter((property: VillaProperty) => {
      const price =
        property?.propertyProfile?.priceDetails?.price ||
        property?.plotDetails?.priceDetails?.price ||
        0;
      const priceInLacs = price / 100000; 
      return priceInLacs >= min && priceInLacs <= max;
    });
  }
);

