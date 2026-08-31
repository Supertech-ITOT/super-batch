package com.supertech.superbatch.scheduler.control_recipe.dto;

import com.supertech.superbatch.plant.unit.enums.RecipeQuantityType;

import lombok.Builder;

@Builder
public record UnitControlRecipeResponse(
                Long id,
                String name,
                String code,
                RecipeQuantityType recipeQuantityType,
                Integer capacity) {

}