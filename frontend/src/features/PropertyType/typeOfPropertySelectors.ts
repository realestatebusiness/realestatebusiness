import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { VillaProperty } from '../../types/propertyInterface.';

export const selectSelectedTypes = (state: RootState) => state.typeOfProperty.selectedTypes;
export const selectAllProperties = (state: RootState) => state.property.data;

export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectSelectedTypes],
  (allProperties: VillaProperty[], selectedTypes: string[]) => {
    if (selectedTypes.length === 0) return allProperties;
    return allProperties.filter(prop => {
      const category = prop.basicDetails.propertyCategory;
      if (category === 'residential') {
        return selectedTypes.includes(prop.basicDetails.residentialType);
      } else if (category === 'commercial') {
        return prop.basicDetails.commercialType
          ? selectedTypes.includes(prop.basicDetails.commercialType)
          : false;
      }
      return false;
    });
  }
);

