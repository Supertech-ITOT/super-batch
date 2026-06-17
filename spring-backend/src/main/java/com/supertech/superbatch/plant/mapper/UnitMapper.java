package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UnitResponse;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Unit;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UnitMapper {
    private final UomMapper uomMapper;

    public UnitResponse toResponse(Unit unit) {
        int totalEquipment = unit.getEquipments() != null
                ? unit.getEquipments().size()
                : 0;
        return new UnitResponse(
                unit.getId(),
                unit.getName(),
                unit.getCode(),
                unit.getDescription(),
                unit.getArea().getId(),
                unit.getArea().getName(),
                unit.getCapacity(),
                uomMapper.toResponse(unit.getBatchSizeUom()),
                unit.getUnitType(),
                totalEquipment,
                unit.getCreatedAt(),
                unit.getUpdatedAt());
    }

    public Unit toEntity(CreateUnitRequest request, Area area) {
        return Unit.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .capacity(request.capacity())
                .batchSizeUom(request.batchSizeUom())
                .area(area)
                .unitType(request.unitType())
                .build();
    }

    public void updateEntity(Unit unit, UpdateUnitRequest request, Area area) {
        unit.setName(request.name());
        unit.setCode(request.code());
        unit.setDescription(request.description());
        unit.setCapacity(request.capacity());
        unit.setBatchSizeUom(request.batchSizeUom());
        unit.setUnitType(request.unitType());
        unit.setArea(area);
    }
}
