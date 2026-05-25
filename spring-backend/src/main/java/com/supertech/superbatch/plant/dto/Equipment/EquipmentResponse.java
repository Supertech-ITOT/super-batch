package com.supertech.superbatch.plant.dto.Equipment;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.enums.EquipmentType;

public record EquipmentResponse(
                Long id,
                String name,
                String description,
                StatusType status,
                String tagName,
                UomType uom,
                String unitName,
                Long unitId,
                EquipmentType equipmentType,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {

}
