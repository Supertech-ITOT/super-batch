package com.supertech.superbatch.plant.area.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.area.dto.AreaAudit;
import com.supertech.superbatch.plant.area.dto.AreaResponse;
import com.supertech.superbatch.plant.area.dto.CreateAreaRequest;
import com.supertech.superbatch.plant.area.dto.UpdateAreaRequest;
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.plant.entity.Plant;

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
                                totalUnit,
                                totalEquipment,
                                area.getCreatedAt(),
                                area.getUpdatedAt());
        }

        public Area toEntity(CreateAreaRequest request, Plant plant) {
                return Area.builder()
                                .name(request.name())
                                .description(request.description())
                                .plant(plant)
                                .build();
        }

        public void updateEntity(Area area, UpdateAreaRequest request, Plant plant) {
                area.setName(request.name());
                area.setDescription(request.description());
                area.setPlant(plant);
        }

        public AreaAudit copy(Area area) {
                if (area == null) {
                        return null;
                }
                return AreaAudit.builder()
                                .id(area.getId())
                                .name(area.getName())
                                .description(area.getDescription())
                                .build();
        }
}