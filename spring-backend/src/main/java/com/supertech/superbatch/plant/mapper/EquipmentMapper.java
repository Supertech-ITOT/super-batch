package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.EquipmentResponse;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Unit;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EquipmentMapper {
    public EquipmentResponse toResponse(Equipment equipment) {
        return new EquipmentResponse(
                equipment.getId(),
                equipment.getName(),
                equipment.getCode(),
                equipment.getDescription(),
                equipment.getUnit().getName(),
                equipment.getUnit().getId(),
                equipment.getCapacity(),
                equipment.getCreatedAt(),
                equipment.getUpdatedAt()

        );
    }

    public Equipment toEntity(CreateEquipmentRequest request, Unit unit) {

        return Equipment.builder()
                .name(request.name())
                .description(request.description())
                .code(request.code())
                .capacity(request.capacity())
                .unit(unit)
                .build();
    }

    public void updateEntity(Equipment equipment, UpdateEquipmentRequest request, Unit unit) {
        equipment.setName(request.name());
        equipment.setDescription(request.description());
        equipment.setCode(request.code());
        equipment.setCapacity(request.capacity());
        equipment.setUnit(unit);
    }
}
