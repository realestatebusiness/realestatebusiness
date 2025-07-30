// features/filters/filtersSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  minBudget: number;
  maxBudget: number;
}

const initialState: FiltersState = {
  minBudget: 0,
  maxBudget: 10000, // ₹100+ Crores
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMinBudget: (state, action: PayloadAction<number>) => {
      state.minBudget = action.payload;
    },
    setMaxBudget: (state, action: PayloadAction<number>) => {
      state.maxBudget = action.payload;
    },
    resetBudget: (state) => {
      state.minBudget = 0;
      state.maxBudget = 10000;
    },
  },
});

export const { setMinBudget, setMaxBudget, resetBudget } = filtersSlice.actions;
export default filtersSlice.reducer;
