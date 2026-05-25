package com.supertech.superbatch.plant.dto.Plant;

import java.time.LocalDateTime;

public record PlantResponse(
                Long id,
                String name,
                String description,
                String location,
                String status,
                String plantType,
                Integer totalArea,
                Integer totalUnit,
                Integer totalEquipment,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
}