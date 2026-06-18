export interface PermissionRequest {
    roleId: number;
    module: string;
    canRead: boolean;
    canWrite: boolean;
}

export interface PermissionResponse {
    id: number;
    roleId: number;
    roleName: string;
    module: string;
    canRead: boolean;
    canWrite: boolean;
}