package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Equipment.CreateEquipmentRequest;
import com.supertech.superbatch.plant.dto.Equipment.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.entity.Equipment;
import com.supertech.superbatch.plant.service.EquipmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/equipments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EquipmentController {
    private final EquipmentService equipmentService;

    @PostMapping
    public ApiResponse<Equipment> create(@Valid @RequestBody CreateEquipmentRequest request) {
        Equipment equipment = equipmentService.create(request);
        return new ApiResponse<>(true, "Equipment created successfully", equipment);
    }

    @GetMapping
    public ApiResponse<List<Equipment>> getAll() {
        List<Equipment> equipments = equipmentService.getAll();
        return new ApiResponse<>(true, "All Equipments fetched successfully", equipments);
    }

    @GetMapping("/{id}")
    public ApiResponse<Equipment> getById(@PathVariable Long id) {
        Equipment equipment = equipmentService.getById(id);
        return new ApiResponse<>(true, "Equipment fetched successfully", equipment);
    }

    @GetMapping("/by-unit/{unitId}")
    public ApiResponse<List<Equipment>> getByPlantId(@PathVariable Long unitId) {
        List<Equipment> equipments = equipmentService.getByUnitId(unitId);
        return new ApiResponse<>(true, "Equipments fetched successfully", equipments);
    }

    @PutMapping("/{id}")
    public ApiResponse<Equipment> update(@PathVariable Long id, @Valid @RequestBody UpdateEquipmentRequest request) {
        Equipment equipment = equipmentService.update(id, request);
        return new ApiResponse<>(true, "Equipment updated successfully", equipment);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        equipmentService.delete(id);
        return new ApiResponse<>(true, "Equipment deleted successfully", null);
    }
}
