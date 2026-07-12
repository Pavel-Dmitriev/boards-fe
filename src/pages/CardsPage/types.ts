import type { VIEW_MODE } from "./constants";

export type ViewModeType = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];
