import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// State selectors
const selectAllProperties = (state: RootState) => state.property.data;
const selectBedrooms = (state: RootState) =>
  state.constructionstatusandbedroomfilter.bedroomOptions;
const selectConstructionStatus = (state: RootState) =>
  state.constructionstatusandbedroomfilter.constructionStatusOptions;

function extractBedroomNumber(label: string): number {
  if (label.includes('RK')) return 1;   // 1 RK or 1 BHK considered as 1 bedroom
  if (label.includes('9+')) return 9;   // 9+ means 9 or more bedrooms
  const match = label.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0; // parse first number found, else 0
}


export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectBedrooms, selectConstructionStatus],
  (properties, bedroomOptions, constructionStatuses) => {
    return (properties || []).filter((property) => {
      const profile = property.propertyProfile;
      if (!profile) return false;

      const bedroomCount = profile.bedrooms ?? 0;  // Number
      const constructionStatus = profile.availabilityStatus || '';

      const matchesBedroom =
        bedroomOptions.length === 0 ||
        bedroomOptions.some((label) => {
          const num = extractBedroomNumber(label);
          // For "9+" bedroom filter, include all with bedrooms >= 9
          return num === 9 ? bedroomCount >= 9 : bedroomCount === num;
        });

      const matchesConstructionStatus =
        constructionStatuses.length === 0 ||
        constructionStatuses.includes(constructionStatus);

      return matchesBedroom && matchesConstructionStatus;
    });
  }
);

