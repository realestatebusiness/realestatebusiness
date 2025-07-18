import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserProfile } from "../../types/authTypes";

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },

    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  clearProfile,
  setUser
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
