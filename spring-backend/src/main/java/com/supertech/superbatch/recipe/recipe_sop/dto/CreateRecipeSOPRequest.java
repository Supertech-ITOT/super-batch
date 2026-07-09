package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;

public record CreateRecipeSOPRequest(
        Long recipeId,
        String message,
        Double stdTime,
        Long transitionId,
        Long actionId,
        Long fromEquipmentId,
        Long toEquipmentId,
        List<RecipeSOPMaterialRequest> materials,
        List<RecipeSOPParameterRequest> parameters) {
}
