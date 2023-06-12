import {
  loginWithEmailAndPassword,
  logoutFirebase,
  signInWithGoogle,
} from "../../../src/firebase";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesOnLogout } from "../../../src/store/journal/journalSlice";
import { testUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers", () => ({
  signInWithGoogle: jest.fn(),
  loginWithEmailAndPassword: jest.fn(),
  logoutFirebase: jest.fn(),
}));

describe("auth/thunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should dispatch checking credentials on checking authentication", async () => {
    (await checkingAuthentication())(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("should dispatch login on start Google sign in", async () => {
    const loginData = { ok: true, ...testUser };
    signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("should dispatch logout on start Google sign in", async () => {
    const loginData = { ok: false, errorMessage: "test error message" };
    signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("should dispatch login on start login with email and password", async () => {
    const loginData = { ok: true, ...testUser };
    const formData = { email: testUser.email, password: "test-password" };

    loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("should dispatch logout on start login with email and password", async () => {
    const loginData = { ok: false, errorMessage: "test error message" };
    const formData = { email: testUser.email, password: "test-password" };

    loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("should dispatch logout and clear notes on start logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(clearNotesOnLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
