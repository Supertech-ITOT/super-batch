package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeParameterRequest;

public record CreateRecipeSOPRequest(
        Long recipeHeaderId,
        String message,
        Double stdTime,
        Long transitionId,
        Long actionId,
        Long fromEquipmentId,
        Long toEquipmentId,
        List<RecipeMaterialRequest> materials,
        List<RecipeParameterRequest> parameters) {
}
