import type { RootState } from "../../app/store";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectCurrentUserId = (state: RootState) =>
  state.auth.user?._id ?? null;
