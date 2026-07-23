package com.supertech.superbatch.recipe.recipe_sop.dto;

import lombok.Builder;

@Builder
public record RecipeSOPEquipmentResponse(
                Long id,
                String name,
                String code) {

}
