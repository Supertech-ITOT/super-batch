package com.supertech.superbatch.plant.dto.Area;

import com.supertech.superbatch.plant.enums.EquipmentType;

public record EquipmentResponse(
        Long id,
        String name,
        Long unitId,
        EquipmentType equipmentType) {

}
