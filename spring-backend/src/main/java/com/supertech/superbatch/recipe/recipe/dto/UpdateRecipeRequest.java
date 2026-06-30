package com.supertech.superbatch.recipe.recipe.dto;

import java.util.List;

public record UpdateRecipeRequest(
        Long recipeHeaderId,
        Integer stepNo,
        String message,
        Double stdTime,
        Long transitionId,
        Long actionId,
        List<RecipeMaterialRequest> materials,
        List<RecipeParameterRequest> parameters) {
}
