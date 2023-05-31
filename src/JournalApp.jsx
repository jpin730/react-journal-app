import { HashRouter } from "react-router-dom";

import { AppRouter } from "./router";

export const JournalApp = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};
