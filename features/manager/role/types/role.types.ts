export interface RoleResponse {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatdeAt: string
}

export interface RoleRequest {
    name: string,
    description: string
}