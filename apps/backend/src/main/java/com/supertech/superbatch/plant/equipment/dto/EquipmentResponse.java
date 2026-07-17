package com.supertech.superbatch.plant.equipment.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.plant.unit.dto.UnitSummaryResponse;

import lombok.Builder;

@Builder
public record EquipmentResponse(
        Long id,
        String name,
        String code,
        String description,
        List<UnitSummaryResponse> units,
        Long creatorUnitId,
        String creatorUnitName,
        Integer capacity,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
