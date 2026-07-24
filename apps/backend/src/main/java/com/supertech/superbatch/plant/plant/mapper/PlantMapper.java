package com.supertech.superbatch.plant.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.plant.dto.CreatePlantRequest;
import com.supertech.superbatch.plant.plant.dto.PlantResponse;
import com.supertech.superbatch.plant.plant.dto.UpdatePlantRequest;
import com.supertech.superbatch.plant.plant.entity.Plant;

@Component
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
                                plant.getPlantType(),
                                totalArea,
                                totalUnit,
                                totalEquipment,
                                plant.getCreatedAt(),
                                plant.getUpdatedAt());
        }

        public Plant toEntity(CreatePlantRequest request) {
                return Plant.builder()
                                .name(request.name())
                                .description(request.description())
                                .location(request.location())
                                .plantType(request.plantType())
                                .build();
        }

        public void updateEntity(Plant plant, UpdatePlantRequest request) {
                plant.setName(request.name());
                plant.setDescription(request.description());
                plant.setLocation(request.location());
                plant.setPlantType(request.plantType());
        }

        public Plant copy(Plant plant) {
                if (plant == null) {
                        return null;
                }
                return Plant.builder()
                                .id(plant.getId())
                                .name(plant.getName())
                                .description(plant.getDescription())
                                .location(plant.getLocation())
                                .plantType(plant.getPlantType())
                                .createdAt(plant.getCreatedAt())
                                .updatedAt(plant.getUpdatedAt())
                                .build();
        }
}