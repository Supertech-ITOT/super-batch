export interface UserResponse {
    id: number,
    name: string,
    email: string,
    enabled: boolean,
    roleId: number,
    roleName: string,
    createdById: number,
    createdByName: string,
    lastLoginAt: string,
    createdAt: string,
    updatedAt: string
}

export interface UserRequest {
    name: string,
    email: string,
    password: string,
    roleId: number,
    enabled: boolean
}