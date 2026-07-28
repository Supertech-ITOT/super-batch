package com.supertech.superbatch.recipe.recipe.dto;

import lombok.Builder;

@Builder
public record UnitRecipeResponse(
        Long id,
        String name,
        String code) {

}
