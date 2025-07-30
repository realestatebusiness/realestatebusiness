import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VillaProperty } from "../../types/propertyInterface.";

// ✅ Updated interface
export interface PropertyState {
  data: VillaProperty[]; // simpler: just an array
  loading: boolean;
  error: string | null;
}

// ✅ Match initialState to the interface
const initialState: PropertyState = {
  data: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    fetchPropertiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess(state, action: PayloadAction<VillaProperty[]>) {
      state.data = action.payload; // ✅ using `data` instead of `properties`
      state.loading = false;
    },
    fetchPropertiesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
} = propertySlice.actions;

export default propertySlice.reducer;
