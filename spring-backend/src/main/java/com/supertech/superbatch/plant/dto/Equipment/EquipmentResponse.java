package com.supertech.superbatch.plant.dto.Equipment;

import java.time.LocalDateTime;

import com.supertech.superbatch.plant.enums.EquipmentType;

public record EquipmentResponse(
                Long id,
                String name,
                String tagName,
                String description,
                String unitName,
                Long unitId,
                EquipmentType equipmentType,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {

}
