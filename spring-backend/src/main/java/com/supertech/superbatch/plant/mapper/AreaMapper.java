package com.supertech.superbatch.plant.mapper;

import com.supertech.superbatch.plant.dto.Area.AreaResponse;
import com.supertech.superbatch.plant.entity.Area;

public class AreaMapper {

        public AreaResponse toResponse(Area area) {

                int totalUnit = area.getUnits() != null
                                ? area.getUnits().size()
                                : 0;

                int totalEquipment = area.getUnits() != null
                                ? area.getUnits().stream()
                                                .mapToInt(unit -> unit.getEquipments() != null
                                                                ? unit.getEquipments().size()
                                                                : 0)
                                                .sum()
                                : 0;

                return new AreaResponse(
                                area.getId(),
                                area.getName(),
                                area.getPlant().getId(),
                                area.getPlant().getName(),
                                area.getDescription(),
                                area.getStatus(),
                                area.getAreaType(),
                                totalUnit,
                                totalEquipment,
                                area.getCreatedAt(),
                                area.getUpdatedAt());
        }
}