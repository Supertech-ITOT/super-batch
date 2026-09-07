package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record RecipeInfoResponse(
        String recipeName,
        String recipeDescription,
        String shiftIncharge,
        Integer batchSize,
        LocalDateTime scheduledAt,

        String materialCode,
        String materialName,
        String materialDescription,

        String unitCode,
        String unitName,

        String createdBy) {
}