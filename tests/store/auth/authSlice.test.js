import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  checkingState,
  notAuthenticatedState,
  testUser,
} from "../../fixtures";

describe("authSlice", () => {
  test("should return initial state named as 'auth'", () => {
    expect(authSlice.name).toBe("auth");
    expect(authSlice.getInitialState()).toEqual(notAuthenticatedState);
  });

  test("should login the test user", () => {
    const state = authSlice.reducer(notAuthenticatedState, login(testUser));

    expect(state).toEqual(authenticatedState);
  });

  test("should logout the test user", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test("should logout the test user with error message", () => {
    const errorMessage = "test error message";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test("should set checking status", () => {
    const state = authSlice.reducer(
      notAuthenticatedState,
      checkingCredentials(testUser)
    );

    expect(state).toEqual(checkingState);
  });
});
