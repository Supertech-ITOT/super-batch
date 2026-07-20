package com.supertech.superbatch.recipe.recipe_sop_material.dto;

import lombok.Builder;

@Builder
public record RecipeSOPMaterialResponse(
        Long id,
        Long materialId,
        String materialName,
        Double stdQty) {

}
