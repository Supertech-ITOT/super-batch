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
}