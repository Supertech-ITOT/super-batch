export const queryKeys = {
    modules: ["modules"] as const,

    permissions: ["permissions"] as const,

    roles: ["roles"] as const,
    role: (id: number) => ["roles", id] as const,

    users: ["users"] as const,
    user: (id: number) => ["users", id] as const,
    currentUser: ["users", "me"] as const,
};

