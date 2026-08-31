import { queryKeys } from "./query-keys";

export const queryDeps = {
  units: [
    queryKeys.units.all,
    queryKeys.equipments.all,
    queryKeys.plantHierarchy.all,
    queryKeys.recipes.all,
    queryKeys.controlRecipes.all,
    queryKeys.audits.all,
  ],

  areas: [
    queryKeys.areas.all,
    queryKeys.units.all,
    queryKeys.plantHierarchy.all,
    queryKeys.audits.all,
  ],

  plants: [
    queryKeys.plants.all,
    queryKeys.areas.all,
    queryKeys.units.all,
    queryKeys.plantHierarchy.all,
    queryKeys.audits.all,
  ],
  equipments: [
    queryKeys.equipments.all,
    queryKeys.plantHierarchy.all,
    queryKeys.recipes.all,
    queryKeys.audits.all,
    queryKeys.controlRecipes.all,
  ],

  materials: [
    queryKeys.materials.all,
    queryKeys.audits.all,
    queryKeys.recipes.all,
    queryKeys.controlRecipeSOPs.all,
  ],

  parameters: [
    queryKeys.parameters.all,
    queryKeys.audits.all,
    queryKeys.recipeSOPs.all,
    queryKeys.controlRecipes.all,
  ],

  actions: [
    queryKeys.actions.all,
    queryKeys.recipeSOPs.all,
    queryKeys.audits.all,
    queryKeys.controlRecipeSOPs.all,
  ],

  transitions: [
    queryKeys.transitions.all,
    queryKeys.recipeSOPs.all,
    queryKeys.audits.all,
    queryKeys.controlRecipeSOPs.all,
  ],

  messages: [queryKeys.messages.all, queryKeys.audits.all],

  recipes: [
    queryKeys.recipes.all,
    queryKeys.recipeSOPs.all,
    queryKeys.audits.all,
  ],

  recipeSOPs: [
    queryKeys.recipeSOPs.all,
    queryKeys.recipes.all,
    queryKeys.audits.all,
  ],

  controlRecipes: [
    queryKeys.controlRecipes.all,
    queryKeys.controlRecipeSOPs.all,
    queryKeys.audits.all,
  ],

  controlRecipeSOPs: [
    queryKeys.controlRecipeSOPs.all,
    queryKeys.controlRecipes.all,
    queryKeys.audits.all,
  ],

  roles: [queryKeys.roles.all, queryKeys.users.all, queryKeys.audits.all],

  users: [queryKeys.users.all, queryKeys.audits.all],

  license: [queryKeys.license.all, queryKeys.audits.all],

  setups: [queryKeys.setups.all, queryKeys.audits.all],

  applications: [queryKeys.applications.all, queryKeys.audits.all],

  audits: [queryKeys.audits.all],
} as const;

import { QueryClient, QueryKey } from "@tanstack/react-query";

export const invalidateQueries = (
  queryClient: QueryClient,
  queryKeysToInvalidate: readonly QueryKey[],
) => {
  return Promise.all(
    queryKeysToInvalidate.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    ),
  );
};
