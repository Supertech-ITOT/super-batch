export interface PermissionRequest {
    moduleId: number;
    access: boolean;
}

export interface PermissionResponse {
    moduleId: number;
    moduleName: string;
    access: boolean;
}