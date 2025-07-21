import type { RootState } from "../../app/store";

export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectProfileLoading = (state: RootState) => state.userProfile.loading;
export const selectProfileError = (state: RootState) => state.userProfile.error;
