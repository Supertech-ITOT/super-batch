package com.supertech.superbatch.recipe.recipe_sop_material.dto;

import lombok.Builder;

@Builder
public record RecipeSOPMaterialAudit(
        Long id,
        String name,
        Double stdQty) {

}
