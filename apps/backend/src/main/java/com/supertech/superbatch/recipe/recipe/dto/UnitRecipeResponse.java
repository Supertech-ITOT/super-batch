package com.supertech.superbatch.recipe.recipe.dto;

import com.supertech.superbatch.plant.unit.enums.RecipeQuantityType;

import lombok.Builder;

@Builder
public record UnitRecipeResponse(
        Long id,
        String name,
        String code,
        RecipeQuantityType recipeQuantityType,
        Integer capacity) {

}
