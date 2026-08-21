export const queryKeys = {
    controlRecipes: ["control-recipes"] as const,
    controlRecipe: (id: number) => ["control-recipes", id] as const,
    controlRecipeEquipmentMapping: (recipeId: number, unitId: number) => ["control-recipes", "equipment-mapping", recipeId, unitId] as const,

    controlRecipeSOPs: ["control-recipe-sops"] as const,
    controlRecipeSOP: (id: number) => ["control-recipe-sops", id] as const,
    controlRecipeSOPsByControlRecipe: (recipeId: number) => ["control-recipe-sops", "control-recipes", recipeId] as const,
    controlRecipeSOPsSummaryByControlRecipe: (recipeId: number) => ["control-recipe-sops", "control-recipes", recipeId, "summary"] as const,
}