import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { ThemeInitializer } from "components/ThemeInitializer";

import "assets/styles/index.css";

dayjs.extend(relativeTime);
dayjs.locale("ru");

createRoot(document.getElementById("root")!).render(
  <ThemeInitializer>
    <App />
  </ThemeInitializer>,
);
