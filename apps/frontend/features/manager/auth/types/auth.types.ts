import { PermissionResponse } from "../../permission/types/permission.types";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  userId: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  passwordChangeRequired: boolean;
  permissions: PermissionResponse[];
  systemAccount: boolean;
}
