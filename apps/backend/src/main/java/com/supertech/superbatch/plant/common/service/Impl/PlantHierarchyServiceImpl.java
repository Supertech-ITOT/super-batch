package com.supertech.superbatch.plant.common.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.plant.area.entity.Area;
import com.supertech.superbatch.plant.common.dto.PlantHierarchyResponse;
import com.supertech.superbatch.plant.common.service.PlantHierarchyService;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.plant.entity.Plant;
import com.supertech.superbatch.plant.plant.repository.PlantRepository;
import com.supertech.superbatch.plant.unit.entity.Unit;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequiresPermission(ModuleType.PLANT_MODEL)
@RequiresLicense()
public class PlantHierarchyServiceImpl implements PlantHierarchyService {
        private final PlantRepository plantRepository;

        @Override
        public List<PlantHierarchyResponse> getHierarchy() {

                List<Plant> plants = plantRepository.findAllHierarchy();

                return plants.stream().map(this::mapPlant).toList();
        }

        private PlantHierarchyResponse mapPlant(Plant plant) {

                return new PlantHierarchyResponse(
                                plant.getId(),
                                plant.getName(),
                                "plant",
                                plant.getAreas() == null
                                                ? List.of()
                                                : plant.getAreas()
                                                                .stream()
                                                                .filter(area -> !area.isDeleted())
                                                                .map(this::mapArea)
                                                                .toList());
        }

        private PlantHierarchyResponse mapArea(Area area) {
                return new PlantHierarchyResponse(
                                area.getId(),
                                area.getName(),
                                "area",
                                area.getUnits() == null
                                                ? List.of()
                                                : area.getUnits()
                                                                .stream()
                                                                .filter(unit -> !unit.isDeleted())
                                                                .map(this::mapUnit)
                                                                .toList());
        }

        private PlantHierarchyResponse mapUnit(Unit unit) {
                return new PlantHierarchyResponse(
                                unit.getId(),
                                unit.getName(),
                                "unit",
                                unit.getEquipments() == null
                                                ? List.of()
                                                : unit.getEquipments()
                                                                .stream()
                                                                .filter(equipment -> !equipment.isDeleted())
                                                                .map(this::mapEquipment)
                                                                .toList());
        }

        private PlantHierarchyResponse mapEquipment(Equipment equipment) {
                return new PlantHierarchyResponse(
                                equipment.getId(),
                                equipment.getName(),
                                "equipment",
                                List.of());
        }

}
