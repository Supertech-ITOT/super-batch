package com.supertech.superbatch.recipe.recipe.dto;

import lombok.Builder;

@Builder
public record MaterialRecipeResponse(
                Long id,
                String name,
                String code) {

}
