package com.supertech.superbatch.plant.mapper;

import com.supertech.superbatch.plant.dto.Equipment.EquipmentResponse;
import com.supertech.superbatch.plant.entity.Equipment;

public class EquipmentMapper {
    public EquipmentResponse toResponse(Equipment equipment) {
        return new EquipmentResponse(
                equipment.getId(),
                equipment.getName(),
                equipment.getDescription(),
                equipment.getStatus(),
                equipment.getTagName(),
                equipment.getUom(),
                equipment.getUnit().getName(),
                equipment.getUnit().getId(),
                equipment.getEquipmentType(),
                equipment.getCreatedAt(),
                equipment.getUpdatedAt()

        );
    }
}
