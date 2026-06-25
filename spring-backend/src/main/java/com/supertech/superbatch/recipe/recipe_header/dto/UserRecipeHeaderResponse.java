package com.supertech.superbatch.recipe.recipe_header.dto;

import lombok.Builder;

@Builder
public record UserRecipeHeaderResponse(
                Long id,
                String name,
                String email) {

}
