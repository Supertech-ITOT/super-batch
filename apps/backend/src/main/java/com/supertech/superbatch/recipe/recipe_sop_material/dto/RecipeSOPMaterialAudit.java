package com.supertech.superbatch.recipe.recipe_sop_material.dto;

import lombok.Builder;

@Builder
public record RecipeSOPMaterialAudit(
                String name,
                Double stdQty) {

}
