import type { ViewModeType } from "pages/BoardDetailPage/types";

export interface IViewTogglerProps {
  viewMode: ViewModeType;
  onChange: (mode: ViewModeType) => void;
}
