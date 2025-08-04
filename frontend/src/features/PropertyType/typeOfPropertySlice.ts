// Updated typeOfPropertySlice.ts with proper typing

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define valid property types from backend schema
type ResidentialType = 'flat_apartment' | 'independent_house_villa' | 'plot_land';
type CommercialType = 'office' | 'hospitality' | 'industry';
type PropertyType = ResidentialType | CommercialType;

interface TypeOfPropertyFilterState {
  selectedTypes: PropertyType[];
}

const initialState: TypeOfPropertyFilterState = {
  selectedTypes: [],
};

const typeOfPropertySlice = createSlice({
  name: 'typeOfProperty',
  initialState,
  reducers: {
    setTypeOfPropertySelection(state, action: PayloadAction<PropertyType[]>) {
      state.selectedTypes = action.payload;
    },
    
    addPropertyType(state, action: PayloadAction<PropertyType>) {
      if (!state.selectedTypes.includes(action.payload)) {
        state.selectedTypes.push(action.payload);
      }
    },
    
    removePropertyType(state, action: PayloadAction<PropertyType>) {
      state.selectedTypes = state.selectedTypes.filter(type => type !== action.payload);
    },
    
    togglePropertyType(state, action: PayloadAction<PropertyType>) {
      const type = action.payload;
      if (state.selectedTypes.includes(type)) {
        state.selectedTypes = state.selectedTypes.filter(t => t !== type);
      } else {
        state.selectedTypes.push(type);
      }
    },
    
    clearTypeOfPropertySelection(state) {
      state.selectedTypes = [];
    },
    
    setResidentialTypes(state, action: PayloadAction<ResidentialType[]>) {
      // Remove all residential types and add new ones
      state.selectedTypes = state.selectedTypes.filter(type => 
        !(['flat_apartment', 'independent_house_villa', 'plot_land'] as ResidentialType[]).includes(type as ResidentialType)
      );
      state.selectedTypes.push(...action.payload);
    },
    
    setCommercialTypes(state, action: PayloadAction<CommercialType[]>) {
      // Remove all commercial types and add new ones
      state.selectedTypes = state.selectedTypes.filter(type => 
        !(['office', 'hospitality', 'industry'] as CommercialType[]).includes(type as CommercialType)
      );
      state.selectedTypes.push(...action.payload);
    }
  },
});

export const { 
  setTypeOfPropertySelection, 
  addPropertyType,
  removePropertyType,
  togglePropertyType,
  clearTypeOfPropertySelection,
  setResidentialTypes,
  setCommercialTypes
} = typeOfPropertySlice.actions;

export default typeOfPropertySlice.reducer;

// Export types for use in components
export type { PropertyType, ResidentialType, CommercialType };