export const queryKeys = {
    recipes: ["recipes"] as const,
    recipe: (id: number) => ["recipes", id] as const,

    recipeSOPs: ["recipe-sops"] as const,
    recipeSOP: (id: number) => ["recipe-sops", id] as const,
    recipeSOPsByRecipe: (id: number) => ["recipe-sops", "recipes", id] as const,
    recipeSOPsSummaryByRecipe:(id:number) =>["recipe-sops","recipes",id,"summary"] as const,
}