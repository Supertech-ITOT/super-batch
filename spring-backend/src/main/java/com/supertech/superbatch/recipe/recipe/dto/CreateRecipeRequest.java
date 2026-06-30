package com.supertech.superbatch.recipe.recipe.dto;

import java.util.List;

public record CreateRecipeRequest(
                Long recipeHeaderId,
                String message,
                Double stdTime,
                Long transitionId,
                Long actionId,
                List<RecipeMaterialRequest> materials,
                List<RecipeParameterRequest> parameters) {
}
