import type { ViewModeType } from "pages/CardsPage/types";

export interface IViewTogglerProps {
  viewMode: ViewModeType;
  onChange: (mode: ViewModeType) => void;
  className?: string;
}
