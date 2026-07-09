package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeParameterResponse;

import lombok.Builder;

@Builder
public record RecipeSOPResponse(
                Long id,
                Long recipeHeaderId,
                Integer stepNo,
                String message,
                Double stdTime,
                Long transitionId,
                String transitionName,
                Long actionId,
                String actionName,
                Long fromEquipmentId,
                String fromEquipmentName,
                Long toEquipmentId,
                String toEquipmentName,
                List<RecipeMaterialResponse> materials,
                List<RecipeParameterResponse> parameters) {

}
