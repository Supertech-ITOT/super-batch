package com.supertech.superbatch.plant.dto.Plant;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.StatusType;

public record PlantResponse(
        Long id,
        String name,
        String description,
        String location,
        StatusType status,
        String plantType,
        Integer totalArea,
        Integer totalUnit,
        Integer totalEquipment,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}