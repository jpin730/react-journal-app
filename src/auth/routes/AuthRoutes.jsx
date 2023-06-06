import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  const routes = [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "/*",
      element: <Navigate to="/auth/login" />,
    },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
};
