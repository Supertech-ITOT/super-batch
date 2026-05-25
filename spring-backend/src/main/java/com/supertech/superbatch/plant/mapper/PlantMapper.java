package com.supertech.superbatch.plant.mapper;

import com.supertech.superbatch.plant.dto.Plant.PlantResponse;
import com.supertech.superbatch.plant.entity.Plant;

public class PlantMapper {

        public PlantResponse toResponse(Plant plant) {

                int totalArea = plant.getAreas() != null
                                ? plant.getAreas().size()
                                : 0;

                int totalUnit = plant.getAreas() != null
                                ? plant.getAreas().stream()
                                                .mapToInt(area -> area.getUnits() != null
                                                                ? area.getUnits().size()
                                                                : 0)
                                                .sum()
                                : 0;

                int totalEquipment = plant.getAreas() != null
                                ? plant.getAreas().stream()
                                                .flatMap(area -> area.getUnits().stream())
                                                .mapToInt(unit -> unit.getEquipments() != null
                                                                ? unit.getEquipments().size()
                                                                : 0)
                                                .sum()
                                : 0;

                return new PlantResponse(
                                plant.getId(),
                                plant.getName(),
                                plant.getDescription(),
                                plant.getLocation(),
                                plant.getStatus(),
                                plant.getPlantType(),
                                totalArea,
                                totalUnit,
                                totalEquipment,
                                plant.getCreatedAt(),
                                plant.getUpdatedAt());
        }
}