import type { RootState } from "../../app/store"; // adjust path as necessary

export const selectAllProperties = (state: RootState) => state.property.data;
export const selectPropertyLoading = (state: RootState) => state.property.loading;
export const selectPropertyError = (state: RootState) => state.property.error;
