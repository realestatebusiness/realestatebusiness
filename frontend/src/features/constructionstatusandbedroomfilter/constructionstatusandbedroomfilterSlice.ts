import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  bedroomOptions: string[];
  constructionStatusOptions: string[];
}

const initialState: FilterState = {
  bedroomOptions: [],
  constructionStatusOptions: [],
};

const constructionstatusandbedroomfilterSlice = createSlice({
  name: 'constructionstatusandbedroomfilter',
  initialState,
  reducers: {
    setBedroomOptions(state, action: PayloadAction<string[]>) {
      state.bedroomOptions = action.payload;
    },
    setConstructionStatusOptions(state, action: PayloadAction<string[]>) {
      state.constructionStatusOptions = action.payload;
    },
    clearAllFilters(state) {
      state.bedroomOptions = [];
      state.constructionStatusOptions = [];
    },
  },
});

export const {
  setBedroomOptions,
  setConstructionStatusOptions,
  clearAllFilters,
} = constructionstatusandbedroomfilterSlice.actions;

export default constructionstatusandbedroomfilterSlice.reducer;
