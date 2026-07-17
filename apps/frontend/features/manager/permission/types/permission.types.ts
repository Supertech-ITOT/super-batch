export interface PermissionRequest {
    moduleId: number;
    canRead: boolean;
    canWrite: boolean;
}

export interface PermissionResponse {
    moduleId: number;
    moduleName: string;
    canRead: boolean;
    canWrite: boolean;
}