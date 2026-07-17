import { PermissionRequest, PermissionResponse } from "../../permission/types/permission.types"

export interface RoleResponse {
    id: number,
    name: string,
    description: string,
    permissions: PermissionResponse[],
    createdAt: string,
    updatedAt: string
}

export interface RoleRequest {
    name: string,
    description: string
}

export interface RoleCreateRequest {
    name: string,
    description: string,
    permissions: PermissionRequest[]
}
export interface RoleUpdateRequest {
    name: string,
    description: string,
    permissions: PermissionRequest[]
}