package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<Equipment>> create(@Valid @RequestBody CreateEquipmentRequest request) {
        Equipment equipment = equipmentService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment created successfully", equipment));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Equipment>>> getAll() {
        List<Equipment> equipments = equipmentService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("All Equipments fetched successfully", equipments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Equipment>> getById(@PathVariable Long id) {
        Equipment equipment = equipmentService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment fetched successfully", equipment));
    }

    @GetMapping("/by-unit/{unitId}")
    public ResponseEntity<ApiResponse<List<Equipment>>> getByPlantId(@PathVariable Long unitId) {
        List<Equipment> equipments = equipmentService.getByUnitId(unitId);
        return ResponseEntity.ok(
                ApiResponse.success("Equipments fetched successfully", equipments));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Equipment>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateEquipmentRequest request) {
        Equipment equipment = equipmentService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment updated successfully", equipment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        equipmentService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment deleted successfully", null));
    }
}
