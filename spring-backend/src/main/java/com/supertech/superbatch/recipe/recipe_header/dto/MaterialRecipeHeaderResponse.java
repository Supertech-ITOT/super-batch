package com.supertech.superbatch.recipe.recipe_header.dto;

import lombok.Builder;

@Builder
public record MaterialRecipeHeaderResponse(
                Long id,
                String name,
                String code) {

}
