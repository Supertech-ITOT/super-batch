package com.supertech.superbatch.recipe.recipe_sop_parameter.dto;

import lombok.Builder;

@Builder
public record RecipeSOPParameterResponse(
        Long id,
        Long parameterId,
        String parameterName,
        Double stdValue) {
}