export const queryKeys = {
    recipeHeaders: ["recipe-headers"] as const,
    recipeHeader: (id: number) => ["recipe-headers", id] as const
}