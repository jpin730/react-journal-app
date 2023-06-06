import { Navigate, Route, Routes } from "react-router-dom";

import { AUTH_STATUS } from "../store";
import { JournalRoutes } from "../journal";
import { CheckingAuth } from "../shared";
import { AuthRoutes } from "../auth";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === AUTH_STATUS.checking) {
    return <CheckingAuth />;
  }

  const routes = [
    status === AUTH_STATUS.notAuthenticated
      ? {
          path: "auth/*",
          element: <AuthRoutes />,
        }
      : {
          path: "/*",
          element: <JournalRoutes />,
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
