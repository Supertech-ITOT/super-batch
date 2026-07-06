export const queryKeys = {
    recipeHeaders: ["recipe-headers"] as const,
    recipeHeader: (id: number) => ["recipe-headers", id] as const,

    recipes: ["recipes"] as const,
    recipe: (id:number) => ["recipes",id] as const,
}