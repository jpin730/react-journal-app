import { HashRouter } from "react-router-dom";

import { AppRouter } from "./router";
import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <HashRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </HashRouter>
  );
};
