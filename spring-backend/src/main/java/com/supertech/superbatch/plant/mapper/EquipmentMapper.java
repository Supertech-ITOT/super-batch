package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.util.EnumUtil;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.EquipmentResponse;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Unit;

@Component
public class EquipmentMapper {
    public EquipmentResponse toResponse(Equipment equipment) {
        return new EquipmentResponse(
                equipment.getId(),
                equipment.getName(),
                equipment.getDescription(),
                equipment.getStatus().name(),
                equipment.getTagName(),
                equipment.getUom().getSymbol(),
                equipment.getUnit().getName(),
                equipment.getUnit().getId(),
                EnumUtil.formatLabel(equipment.getEquipmentType().name()),
                equipment.getCreatedAt(),
                equipment.getUpdatedAt()

        );
    }

    public Equipment toEntity(CreateEquipmentRequest request, Unit unit) {

        return Equipment.builder()
                .name(request.name())
                .description(request.description())
                .status(request.status())
                .tagName(request.tagName())
                .uom(request.uom())
                .equipmentType(request.equipmentType())
                .unit(unit)
                .build();
    }

    public void updateEntity(Equipment equipment, UpdateEquipmentRequest request, Unit unit) {
        equipment.setName(request.name());
        equipment.setDescription(request.description());
        equipment.setStatus(request.status());
        equipment.setTagName(request.tagName());
        equipment.setUom(request.uom());
        equipment.setEquipmentType(request.equipmentType());
        equipment.setUnit(unit);
    }
}
