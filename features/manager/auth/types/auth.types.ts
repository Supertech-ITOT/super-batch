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
    try {
        if (typeof window === "undefined") return null;

        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};