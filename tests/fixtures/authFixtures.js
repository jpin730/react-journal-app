import { AUTH_STATUS } from "../../src/store/auth/authSlice";

const uid = "test-uid";
const email = "test@email.com";
const displayName = "Test User";
const photoURL = "https://test-image-url.jpg";

export const checkingState = {
  status: AUTH_STATUS.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: AUTH_STATUS.authenticated,
  uid,
  email,
  displayName,
  photoURL,
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: AUTH_STATUS.notAuthenticated,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const testUser = {
  uid,
  email,
  displayName,
  photoURL,
};
