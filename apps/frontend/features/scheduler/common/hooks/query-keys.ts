export const queryKeys = {
    controlRecipes: ["control-recipes"] as const,
    controlRecipe: (id: number) => ["control-recipes", id] as const,

    controlRecipeSOPs: ["control-recipe-sops"] as const,
    controlRecipeSOP: (id: number) => ["control-recipe-sops", id] as const,
    controlRecipeSOPsByControlRecipe: (id: number) => ["control-recipe-sops", "control-recipes", id] as const,
    controlRecipeSOPsSummaryByControlRecipe:(id:number) =>["control-recipe-sops","control-recipes",id,"summary"] as const,
}