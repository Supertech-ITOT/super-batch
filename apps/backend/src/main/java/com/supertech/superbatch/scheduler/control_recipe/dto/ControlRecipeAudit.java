package com.supertech.superbatch.scheduler.control_recipe.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record ControlRecipeAudit(
        Long id,
        String batchNo,
        String name,
        String recipe,
        String unit,
        String status,
        Integer batchSize,
        String createdBy,
        String shiftIncharge,
        LocalDateTime scheduledAt) {

}
