package com.supertech.superbatch.recipe.recipe.dto;

import lombok.Builder;

@Builder
public record RecipeAudit(
        Long id,
        String name,
        String description,
        String status,
        Integer batchSize,
        String material,
        String unit,
        String createdBy

) {

}
