import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailAndPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailAndPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("LoginPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should render component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { level: 5 }).innerHTML).toBe("Login");
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).innerHTML).toContain("Login");
    expect(buttons.at(1).innerHTML).toContain("Google");
    expect(screen.getByRole("link").innerHTML).toBe("Create an account");
  });

  test("should call 'start Google sign in' on click Google button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getAllByRole("button").at(1);
    fireEvent.click(googleButton);

    expect(mockStartGoogleSignIn).toHaveBeenCalledTimes(1);
  });

  test("should call 'start login with email and password' on submit form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const loginButton = screen.getAllByRole("button").at(0);
    fireEvent.click(loginButton);

    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({
      email: "user@email.com",
      password: "123456",
    });
  });
});
