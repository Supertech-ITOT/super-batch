package com.supertech.superbatch.recipe.recipe_parameter.dto;

import lombok.Builder;

@Builder
public record RecipeParameterResponse(
        Long id,
        Long parameterId,
        String parameterName,
        Double stdValue) {
}