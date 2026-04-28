import type { RoleType } from "shared/types/RoleType";

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: RoleType;
  created_at: string;
}
