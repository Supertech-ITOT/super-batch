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

export const getUser = (): LoginResponse | null => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
};