import { createSlice } from "@reduxjs/toolkit";

export const AUTH_STATUS = {
  authenticated: "authenticated",
  checking: "checking",
  notAuthenticated: "not-authenticated",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: AUTH_STATUS.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    checkingCredentials: (state) => {
      state.status = AUTH_STATUS.checking;
    },
    login: (state, { payload }) => {
      state.status = AUTH_STATUS.authenticated;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = AUTH_STATUS.notAuthenticated;
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
