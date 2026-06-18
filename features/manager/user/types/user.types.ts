export interface UserResponse {
    id: number,
    name: string,
    email: string,
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
}

export interface UpdateUserRequest {
    name: string,
    email: string,
    roleId: number,
}