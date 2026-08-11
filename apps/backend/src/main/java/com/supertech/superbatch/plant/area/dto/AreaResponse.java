package com.supertech.superbatch.plant.area.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record AreaResponse(
        Long id,
        String name,
        Long plantId,
        String plantName,
        String description,
        Integer totalUnit,
        Integer totalEquipment,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

}
