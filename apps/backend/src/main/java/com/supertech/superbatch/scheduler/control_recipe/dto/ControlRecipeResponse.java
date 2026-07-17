package com.supertech.superbatch.scheduler.control_recipe.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;

import lombok.Builder;

@Builder
public record ControlRecipeResponse(
        Long id,
        Integer batchNo,
        String name,
        MasterRecipeResponse recipe,
        ControlRecipeStatus status,
        Integer batchSize,
        UserControlRecipeResponse createdBy,
        UserControlRecipeResponse shiftIncharge,
        LocalDateTime sheduledAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}