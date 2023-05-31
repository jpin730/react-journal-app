import { HashRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const JournalApp = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};
