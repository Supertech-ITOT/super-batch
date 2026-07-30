package com.supertech.superbatch.recipe.recipe_sop_parameter.dto;

import lombok.Builder;

@Builder
public record RecipeSOPParameterAudit(
        Long id,
        String name,
        Double stdValue) {

}
