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
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const { checkingCredentials, login, logout } = authSlice.actions;
