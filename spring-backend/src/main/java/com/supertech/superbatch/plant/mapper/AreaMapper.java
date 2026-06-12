package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.Area.AreaResponse;
import com.supertech.superbatch.plant.dto.Area.CreateAreaRequest;
import com.supertech.superbatch.plant.dto.Area.UpdateAreaRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Plant;

@Component
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
                                area.getAreaType(),
                                totalUnit,
                                totalEquipment,
                                area.getCreatedAt(),
                                area.getUpdatedAt());
        }

        public Area toEntity(CreateAreaRequest request, Plant plant) {
                return Area.builder()
                                .name(request.name())
                                .description(request.description())
                                .areaType(request.areaType())
                                .plant(plant)
                                .build();
        }

        public void updateEntity(Area area, UpdateAreaRequest request, Plant plant) {
                area.setName(request.name());
                area.setDescription(request.description());
                area.setAreaType(request.areaType());
                area.setPlant(plant);
        }
}