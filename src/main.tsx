import { createRoot } from "react-dom/client";

import { App } from "./App";
import { ThemeInitializer } from "components/ThemeInitializer";

import "assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeInitializer>
    <App />
  </ThemeInitializer>,
);
