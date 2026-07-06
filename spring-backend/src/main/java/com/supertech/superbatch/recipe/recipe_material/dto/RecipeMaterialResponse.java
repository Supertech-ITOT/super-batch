package com.supertech.superbatch.recipe.recipe_material.dto;

import lombok.Builder;

@Builder
public record RecipeMaterialResponse(
                Long id,
                Long materialId,
                String materialName,
                Double stdQty) {

}
