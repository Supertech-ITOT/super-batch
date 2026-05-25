package com.supertech.superbatch.plant.mapper;

import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.entity.Unit;

public class UnitMapper {
    public UnitResponse toResponse(Unit unit) {
        int totalEquipment = unit.getEquipments() != null
                ? unit.getEquipments().size()
                : 0;
        return new UnitResponse(
                unit.getId(),
                unit.getName(),
                unit.getCode(),
                unit.getDescription(),
                unit.getStatus(),
                unit.getArea().getId(),
                unit.getArea().getName(),
                unit.getUnitType(),
                totalEquipment,
                unit.getCreatedAt(),
                unit.getUpdatedAt());
    }
}
