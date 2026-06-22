export const queryKeys = {
    recipes: ["recipes"] as const,
    recipe: (id: number) => ["recipes", id] as const
}