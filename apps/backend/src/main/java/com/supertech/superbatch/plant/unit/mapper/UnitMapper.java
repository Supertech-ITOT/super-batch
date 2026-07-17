package com.supertech.superbatch.plant.unit.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.common.mapper.UomMapper;
import com.supertech.superbatch.plant.unit.dto.CreateUnitRequest;
import com.supertech.superbatch.plant.unit.dto.UnitResponse;
import com.supertech.superbatch.plant.unit.dto.UnitSummaryResponse;
import com.supertech.superbatch.plant.unit.dto.UpdateUnitRequest;
import com.supertech.superbatch.plant.unit.entity.Unit;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UnitMapper {
        private final UomMapper uomMapper;

        public UnitResponse toResponse(Unit unit) {

                int totalEquipment = unit.getEquipments() != null
                                ? unit.getEquipments().size()
                                : 0;

                return UnitResponse.builder()
                                .id(unit.getId())
                                .name(unit.getName())
                                .code(unit.getCode())
                                .description(unit.getDescription())
                                .areaId(unit.getArea().getId())
                                .areaName(unit.getArea().getName())
                                .capacity(unit.getCapacity())
                                .batchSizeUom(uomMapper.toResponse(unit.getBatchSizeUom()))
                                .totalEquipment(totalEquipment)
                                .createdAt(unit.getCreatedAt())
                                .updatedAt(unit.getUpdatedAt())
                                .build();
        }

        public Unit toEntity(CreateUnitRequest request, Area area) {
                return Unit.builder()
                                .name(request.name())
                                .code(request.code())
                                .description(request.description())
                                .capacity(request.capacity())
                                .batchSizeUom(request.batchSizeUom())
                                .area(area)
                                .build();
        }

        public void updateEntity(Unit unit, UpdateUnitRequest request, Area area) {
                unit.setName(request.name());
                unit.setCode(request.code());
                unit.setDescription(request.description());
                unit.setCapacity(request.capacity());
                unit.setBatchSizeUom(request.batchSizeUom());
                unit.setArea(area);
        }

        public UnitSummaryResponse toUnitSummaryResponse(Unit unit) {
                return UnitSummaryResponse.builder()
                                .id(unit.getId())
                                .name(unit.getName())
                                .build();
        }
}
