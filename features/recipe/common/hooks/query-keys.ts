export const queryKeys = {
    recipes: ["recipes"] as const,
    recipe: (id: number) => ["recipe", id] as const,

    recipeSOPs: ["recipe-sops"] as const,
    recipeSop: (id: number) => ["recipe-sops", id] as const,
    recipeSOPsByRecipe: (id: number) => ["recipe-sops", "recipe", id] as const,
}