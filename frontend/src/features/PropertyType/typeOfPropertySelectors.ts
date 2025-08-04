// Updated selectors with proper backend schema filtering

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { VillaProperty } from '../../types/propertyInterface.';

export const selectSelectedTypes = (state: RootState) => state.typeOfProperty.selectedTypes;
export const selectAllProperties = (state: RootState) => state.property.data;

export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectSelectedTypes],
  (allProperties: VillaProperty[], selectedTypes: string[]) => {
    // If no filters selected, return all properties
    if (selectedTypes.length === 0) return allProperties;
    
    return allProperties.filter(property => {
      const { propertyCategory, residentialType, commercialType } = property.basicDetails;
      
      // Check residential properties
      if (propertyCategory === 'residential' && residentialType) {
        return selectedTypes.includes(residentialType);
      }
      
      // Check commercial properties
      if (propertyCategory === 'commercial' && commercialType) {
        return selectedTypes.includes(commercialType);
      }
      
      return false;
    });
  }
);

// Additional helper selectors
export const selectResidentialProperties = createSelector(
  [selectAllProperties],
  (allProperties: VillaProperty[]) => 
    allProperties.filter(prop => prop.basicDetails.propertyCategory === 'residential')
);

export const selectCommercialProperties = createSelector(
  [selectAllProperties],
  (allProperties: VillaProperty[]) => 
    allProperties.filter(prop => prop.basicDetails.propertyCategory === 'commercial')
);

export const selectPropertiesByType = createSelector(
  [selectAllProperties],
  (allProperties: VillaProperty[]) => {
    const grouped = {
      residential: {
        flat_apartment: 0,
        independent_house_villa: 0,
        plot_land: 0
      },
      commercial: {
        office: 0,
        hospitality: 0,
        industry: 0
      }
    };

    allProperties.forEach(property => {
      const { propertyCategory, residentialType, commercialType } = property.basicDetails;
      
      if (propertyCategory === 'residential' && residentialType) {
        if (residentialType in grouped.residential) {
          grouped.residential[residentialType as keyof typeof grouped.residential]++;
        }
      } else if (propertyCategory === 'commercial' && commercialType) {
        if (commercialType in grouped.commercial) {
          grouped.commercial[commercialType as keyof typeof grouped.commercial]++;
        }
      }
    });

    return grouped;
  }
);