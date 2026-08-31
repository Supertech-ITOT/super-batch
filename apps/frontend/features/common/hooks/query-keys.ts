import { BatchAuditSearchRequest } from "@/features/audit/types/audit.types";
import { RecipeStatus } from "@/features/recipe/recipe/types/recipe.types";

export const queryKeys = {
  plants: {
    all: ["plants"] as const,
    list: () => ["plants", "list"] as const,
    detail: (id: number) => ["plants", "detail", id] as const,
  },

  areas: {
    all: ["areas"] as const,
    list: () => ["areas", "list"] as const,
    detail: (id: number) => ["areas", "detail", id] as const,
    byPlant: (plantId: number) => ["areas", "plant", plantId] as const,
  },

  units: {
    all: ["units"] as const,
    list: () => ["units", "list"] as const,
    detail: (id: number) => ["units", "detail", id] as const,
    byArea: (areaId: number) => ["units", "area", areaId] as const,
  },

  equipments: {
    all: ["equipments"] as const,
    list: () => ["equipments", "list"] as const,
    detail: (id: number) => ["equipments", "detail", id] as const,
    byUnit: (unitId: number) => ["equipments", "unit", unitId] as const,
  },

  materials: {
    all: ["materials"] as const,
    list: () => ["materials", "list"] as const,
    detail: (id: number) => ["materials", "detail", id] as const,
  },

  parameters: {
    all: ["parameters"] as const,
    list: () => ["parameters", "list"] as const,
    detail: (id: number) => ["parameters", "detail", id] as const,
  },

  actions: {
    all: ["actions"] as const,
    list: () => ["actions", "list"] as const,
    detail: (id: number) => ["actions", "detail", id] as const,
  },

  transitions: {
    all: ["transitions"] as const,
    list: () => ["transitions", "list"] as const,
    detail: (id: number) => ["transitions", "detail", id] as const,
  },

  messages: {
    all: ["messages"] as const,
    list: () => ["messages", "list"] as const,
    detail: (id: number) => ["messages", "detail", id] as const,
  },

  plantHierarchy: {
    all: ["plant-hierarchy"] as const,
  },

  modules: {
    all: ["modules"] as const,
  },

  permissions: {
    all: ["permissions"] as const,
  },

  roles: {
    all: ["roles"] as const,
    list: () => ["roles", "list"] as const,
    detail: (id: number) => ["roles", "detail", id] as const,
  },

  users: {
    all: ["users"] as const,
    list: () => ["users", "list"] as const,
    detail: (id: number) => ["users", "detail", id] as const,
    current: () => ["users", "me"] as const,
  },

  recipes: {
    all: ["recipes"] as const,
    list: () => ["recipes", "list"] as const,
    detail: (id: number) => ["recipes", "detail", id] as const,
    byMaterialAndStatus: (materialId: number, status: RecipeStatus) => ["recipes", "by-material-and-status", materialId, status] as const,
  },

  recipeSOPs: {
    all: ["recipe-sops"] as const,
    list: () => ["recipe-sops", "list"] as const,
    detail: (id: number) => ["recipe-sops", "detail", id] as const,
    byRecipe: (recipeId: number) =>
      ["recipe-sops", "recipe", recipeId] as const,
    summaryByRecipe: (recipeId: number) =>
      ["recipe-sops", "recipe", recipeId, "summary"] as const,
  },

  controlRecipes: {
    all: ["control-recipes"] as const,
    list: () => ["control-recipes", "list"] as const,
    detail: (id: number) => ["control-recipes", "detail", id] as const,
    equipmentMapping: (recipeId: number, unitId: number) =>
      ["control-recipes", "equipment-mapping", recipeId, unitId] as const,
  },

  controlRecipeSOPs: {
    all: ["control-recipe-sops"] as const,
    list: () => ["control-recipe-sops", "list"] as const,
    detail: (id: number) => ["control-recipe-sops", "detail", id] as const,

    byControlRecipe: (recipeId: number) =>
      ["control-recipe-sops", "control-recipe", recipeId] as const,

    summaryByControlRecipe: (recipeId: number) =>
      ["control-recipe-sops", "control-recipe", recipeId, "summary"] as const,
  },

  license: {
    all: ["license"] as const,
  },

  setups: {
    all: ["setups"] as const,
  },

  applications: {
    all: ["applications"] as const,
  },

  audits: {
    all: ["audits"] as const,
    lists: () => ["audits", "list"] as const,
    list: (request: BatchAuditSearchRequest) =>
      ["audits", "list", request] as const,
    detail: (id: number) => ["audits", "detail", id] as const,
  },
} as const;
