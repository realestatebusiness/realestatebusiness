
import type { RootState } from "../../app/store";

export const selectAreaAndAmenitiesFilter = (state: RootState) =>
  state.areaAndAmenitiesFilter;

export const selectArea = (state: RootState) =>
  state.areaAndAmenitiesFilter.area;

export const selectAreaMin = (state: RootState) =>
  state.areaAndAmenitiesFilter.area.min;

export const selectAreaMax = (state: RootState) =>
  state.areaAndAmenitiesFilter.area.max;

export const selectAreaUnit = (state: RootState) =>
  state.areaAndAmenitiesFilter.area.unit;

export const selectAmenities = (state: RootState) =>
  state.areaAndAmenitiesFilter.amenities;
