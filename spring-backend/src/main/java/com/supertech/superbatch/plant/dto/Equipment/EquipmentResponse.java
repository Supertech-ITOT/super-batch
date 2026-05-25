package com.supertech.superbatch.plant.dto.Equipment;

import java.time.LocalDateTime;

public record EquipmentResponse(
                Long id,
                String name,
                String description,
                String status,
                String tagName,
                String uom,
                String unitName,
                Long unitId,
                String equipmentType,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {

}
