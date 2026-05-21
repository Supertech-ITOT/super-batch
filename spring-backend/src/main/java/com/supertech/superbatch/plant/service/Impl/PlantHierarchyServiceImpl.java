package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.plant.dto.PlantHierarchy.PlantHierarchyResponse;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.entity.Plant;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.service.PlantHierarchyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlantHierarchyServiceImpl implements PlantHierarchyService {
        private final PlantRepository plantRepository;

        @Override
        public List<PlantHierarchyResponse> getHierarchy() {

                List<Plant> plants = plantRepository.findAllHierarchy();

                return plants.stream().map(this::mapPlant).toList();
        }

        private PlantHierarchyResponse mapPlant(Plant plant) {

                return new PlantHierarchyResponse(
                                plant.getId().toString(),
                                plant.getName(),
                                "plant",
                                plant.getAreas() == null
                                                ? List.of()
                                                : plant.getAreas()
                                                                .stream()
                                                                .map(this::mapArea)
                                                                .toList());
        }

        private PlantHierarchyResponse mapArea(Area area) {
                return new PlantHierarchyResponse(
                                area.getId().toString(),
                                area.getName(),
                                "area",
                                area.getUnits() == null
                                                ? List.of()
                                                : area.getUnits()
                                                                .stream()
                                                                .map(this::mapUnit)
                                                                .toList());
        }

        private PlantHierarchyResponse mapUnit(Unit unit) {
                return new PlantHierarchyResponse(
                                unit.getId().toString(),
                                unit.getName(),
                                "unit",
                                unit.getEquipments() == null
                                                ? List.of()
                                                : unit.getEquipments()
                                                                .stream()
                                                                .map(this::mapEquipment)
                                                                .toList());
        }

        private PlantHierarchyResponse mapEquipment(Equipment equipment) {
                return new PlantHierarchyResponse(
                                equipment.getId().toString(),
                                equipment.getName(),
                                "equipment",
                                List.of());
        }

}
