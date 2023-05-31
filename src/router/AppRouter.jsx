import { Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";

export const AppRouter = () => {
  const routes = [
    {
      path: "auth/*",
      element: <AuthRoutes />,
    },
    {
      path: "/*",
      element: <JournalRoutes />,
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
