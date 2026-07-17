package com.supertech.superbatch.plant.equipment.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.equipment.dto.AssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.CreateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.EquipmentResponse;
import com.supertech.superbatch.plant.equipment.dto.UnAssignEquipmentRequest;
import com.supertech.superbatch.plant.equipment.dto.UpdateEquipmentRequest;
import com.supertech.superbatch.plant.equipment.service.EquipmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/equipments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EquipmentController {
    private final EquipmentService equipmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateEquipmentRequest request) {
        equipmentService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EquipmentResponse>>> getAll() {
        List<EquipmentResponse> equipments = equipmentService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("All Equipments fetched successfully", equipments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EquipmentResponse>> getById(@PathVariable Long id) {
        EquipmentResponse equipment = equipmentService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment fetched successfully", equipment));
    }

    @GetMapping("/by-unit/{unitId}")
    public ResponseEntity<ApiResponse<List<EquipmentResponse>>> getByUnitId(@PathVariable Long unitId) {
        List<EquipmentResponse> equipments = equipmentService.getByUnitId(unitId);
        return ResponseEntity.ok(
                ApiResponse.success("Equipments fetched successfully", equipments));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEquipmentRequest request) {
        equipmentService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Equipment updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        equipmentService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Equipment deleted successfully", null));
    }

    @PostMapping("/assign")
    public ResponseEntity<ApiResponse<Void>> assign(
            @Valid @RequestBody AssignEquipmentRequest request) {

        equipmentService.assign(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Equipment assigned successfully",
                        null));
    }

    @PostMapping("/unassign")
    public ResponseEntity<ApiResponse<Void>> unassign(
            @Valid @RequestBody UnAssignEquipmentRequest request) {

        equipmentService.unassign(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Equipment unassigned successfully",
                        null));
    }
}
