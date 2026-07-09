package com.supertech.superbatch.plant.equipment.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentResponse;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.enums.EquipmentType;
import com.supertech.superbatch.plant.unit.entity.Unit;
import com.supertech.superbatch.plant.unit.mapper.UnitMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EquipmentMapper {
    private final UnitMapper unitMapper;

    public EquipmentResponse toResponse(Equipment equipment) {
        return EquipmentResponse.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .code(equipment.getCode())
                .description(equipment.getDescription())
                .capacity(equipment.getCapacity())
                .units(equipment.getUnits()
                        .stream()
                        .map(unitMapper::toUnitSummaryResponse)
                        .toList())
                .createdAt(equipment.getCreatedAt())
                .updatedAt(equipment.getUpdatedAt())
                .build();
    }

    public Equipment toEntity(CreateEquipmentRequest request, Unit unit, EquipmentType equipmentType) {
        Equipment equipment = Equipment.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .capacity(request.capacity())
                .equipmentType(equipmentType)
                .creatorUnit(equipmentType == EquipmentType.MAIN_EQUIPMENT ? unit : null)
                .build();

        equipment.getUnits().add(unit);

        return equipment;
    }

    public void updateEntity(Equipment equipment, UpdateEquipmentRequest request) {
        equipment.setName(request.name());
        equipment.setDescription(request.description());
        equipment.setCode(request.code());
        equipment.setCapacity(request.capacity());
    }
}
