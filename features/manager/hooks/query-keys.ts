export const queryKeys = {
    permissions: ["permissions"] as const,

    roles: ["roles"] as const,
    role: (id: number) => ["roles", id] as const,

    users: ["users"] as const,
    user: (id: number) => ["users", id] as const,
};

