package com.supertech.superbatch.recipe.recipe.dto;

import lombok.Builder;

@Builder
public record UserRecipeResponse(
        Long id,
        String name,
        String email) {

}
