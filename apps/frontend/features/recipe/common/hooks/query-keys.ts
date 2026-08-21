export const queryKeys = {
    recipes: ["recipes"] as const,
    recipe: (id: number) => ["recipes", id] as const,

    recipeSOPs: ["recipe-sops"] as const,
    recipeSOP: (id: number) => ["recipe-sops", id] as const,
    recipeSOPsByRecipe: (recipeId: number) => ["recipe-sops", "recipes", recipeId] as const,
    recipeSOPsSummaryByRecipe: (recipeId: number) => ["recipe-sops", "recipes", recipeId, "summary"] as const,
}