package com.supertech.superbatch.plant.dto.Area;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.StatusType;

public record AreaResponse(
                Long id,
                String name,
                Long plantId,
                String plantName,
                String description,
                StatusType status,
                String areaType,
                Integer totalUnit,
                Integer totalEquipment,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {

}
