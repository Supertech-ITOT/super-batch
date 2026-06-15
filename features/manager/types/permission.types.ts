import { ModuleType } from "./module.types";

export interface PermissionResponse {
    module: ModuleType;
    canRead: boolean;
    canWrite: boolean;
}