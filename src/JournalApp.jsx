import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { AppRouter } from "./router";
import { AppTheme } from "./theme";
import { store } from "./store";

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </HashRouter>
    </Provider>
  );
};
