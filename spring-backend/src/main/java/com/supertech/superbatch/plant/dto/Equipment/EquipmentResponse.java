package com.supertech.superbatch.plant.dto.Equipment;

import java.time.LocalDateTime;

public record EquipmentResponse(
                Long id,
                String name,
                String code,
                String description,
                String unitName,
                Long unitId,
                Integer capacity,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {

}
