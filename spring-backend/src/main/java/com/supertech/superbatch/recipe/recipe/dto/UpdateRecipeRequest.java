package com.supertech.superbatch.recipe.recipe.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;

public record UpdateRecipeRequest(
                Long id,
                String message,
                Double stdTime,
                Long transitionId,
                Long actionId,
                List<RecipeMaterialRequest> materials,
                List<RecipeParameterRequest> parameters) {
}
