package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateRecipeSOPRequest(
                @NotNull(message = "Recipe is required.") Long recipeId,
                @NotBlank(message = "Message is required.") String message,
                @NotNull(message = "Standard time is required.") Double stdTime,
                @NotNull(message = "Transition is required.") Long transitionId,
                @NotNull(message = "Action is required.") Long actionId,
                Long fromEquipmentId,
                @NotNull(message = "To Equipment is required.") Long toEquipmentId,
                List<RecipeSOPMaterialRequest> materials,
                List<RecipeSOPParameterRequest> parameters) {
}
