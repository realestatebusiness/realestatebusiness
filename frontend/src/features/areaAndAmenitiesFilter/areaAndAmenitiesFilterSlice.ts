// src/features/filters/areaAndAmenitiesFilterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AreaFilter, FilterState } from "../../utils/constants";

const initialState: FilterState = {
  area: {
    unit: "sq_feet",
    min: 100,
    max: 4000,
  },
  amenities: [],
};

const areaAndAmenitiesFilterSlice = createSlice({
  name: "areaAndAmenitiesFilter",
  initialState,
  reducers: {
    setAreaFilter(state, action: PayloadAction<AreaFilter>) {
      state.area = action.payload;
    },
    clearAreaFilter(state) {
      state.area = initialState.area;
    },
    toggleAmenity(state, action: PayloadAction<string>) {
      const value = action.payload;
      const index = state.amenities.indexOf(value);
      if (index >= 0) {
        state.amenities.splice(index, 1);
      } else {
        state.amenities.push(value);
      }
    },
    clearAmenities(state) {
      state.amenities = [];
    },
  },
});

export const {
  setAreaFilter,
  clearAreaFilter,
  toggleAmenity,
  clearAmenities,
} = areaAndAmenitiesFilterSlice.actions;

export default areaAndAmenitiesFilterSlice.reducer;
