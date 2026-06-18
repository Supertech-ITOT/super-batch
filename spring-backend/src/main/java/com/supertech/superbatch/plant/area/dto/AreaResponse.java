package com.supertech.superbatch.plant.area.dto;

import java.time.LocalDateTime;

public record AreaResponse(
                Long id,
                String name,
                Long plantId,
                String plantName,
                String description,
                String areaType,
                Integer totalUnit,
                Integer totalEquipment,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {

}
