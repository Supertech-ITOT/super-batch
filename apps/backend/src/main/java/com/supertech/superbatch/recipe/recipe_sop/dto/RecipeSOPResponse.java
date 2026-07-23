package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialResponse;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterResponse;

import lombok.Builder;

@Builder
public record RecipeSOPResponse(
        Long id,
        Long recipeId,
        Integer stepNo,
        String message,
        Double stdTime,
        Long transitionId,
        String transitionName,
        Long actionId,
        String actionName,
        RecipeSOPEquipmentResponse fromEquipment,
        RecipeSOPEquipmentResponse toEquipment,
        List<RecipeSOPMaterialResponse> materials,
        List<RecipeSOPParameterResponse> parameters) {

}
