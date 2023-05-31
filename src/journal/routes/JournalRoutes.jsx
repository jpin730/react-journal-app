import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../pages";

export const JournalRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/*",
      element: <Navigate to="/" />,
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
