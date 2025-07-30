// features/typeOfProperty/typeOfPropertySlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TypeOfPropertyFilterState {
  selectedTypes: string[];
}

const initialState: TypeOfPropertyFilterState = {
  selectedTypes: [],
};

const typeOfPropertySlice = createSlice({
  name: 'typeOfProperty',
  initialState,
  reducers: {
    setTypeOfPropertySelection(state, action: PayloadAction<string[]>) {
      state.selectedTypes = action.payload;
    },
    clearTypeOfPropertySelection(state) {
      state.selectedTypes = [];
    }
  },
});

export const { setTypeOfPropertySelection, clearTypeOfPropertySelection } = typeOfPropertySlice.actions;
export default typeOfPropertySlice.reducer;
