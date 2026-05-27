package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Unit;

@Component
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
                unit.getStatus().name(),
                unit.getArea().getId(),
                unit.getArea().getName(),
                unit.getUnitType().name(),
                totalEquipment,
                unit.getCreatedAt(),
                unit.getUpdatedAt());
    }

    public Unit toEntity(CreateUnitRequest request, Area area) {
        return Unit.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .status(request.status())
                .unitType(request.unitType())
                .area(area)
                .build();
    }

    public void updateEntity(Unit unit, UpdateUnitRequest request, Area area) {
        unit.setName(request.name());
        unit.setCode(request.code());
        unit.setDescription(request.description());
        unit.setStatus(request.status());
        unit.setUnitType(request.unitType());
        unit.setArea(area);
    }
}
