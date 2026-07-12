const DEV_URL = import.meta.env.VITE_API_URL_DEV as string | undefined;
const PROD_URL = import.meta.env.VITE_API_URL_PROD as string | undefined;

export const API_URL = import.meta.env.DEV
  ? DEV_URL || "/api/v1"
  : PROD_URL || "/api/v1";
