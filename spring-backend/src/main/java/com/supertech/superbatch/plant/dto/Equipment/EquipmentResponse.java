package com.supertech.superbatch.plant.dto.Equipment;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.plant.dto.Unit.UnitSummaryResponse;
import lombok.Builder;

@Builder
public record EquipmentResponse(
        Long id,
        String name,
        String code,
        String description,
        List<UnitSummaryResponse> units,
        Integer capacity,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
