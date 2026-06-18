package com.supertech.superbatch.plant.unit.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.unit.dto.CreateUnitRequest;
import com.supertech.superbatch.plant.unit.dto.UnitResponse;
import com.supertech.superbatch.plant.unit.dto.UpdateUnitRequest;
import com.supertech.superbatch.plant.unit.service.UnitService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/units")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UnitController {
    private final UnitService unitService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateUnitRequest request) {
        unitService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Unit created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UnitResponse>>> getAll() {
        List<UnitResponse> units = unitService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("All Units fetched successfully", units));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UnitResponse>> getById(@PathVariable Long id) {
        UnitResponse unit = unitService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Unit fetched successfully", unit));
    }

    @GetMapping("/by-area/{areaId}")
    public ResponseEntity<ApiResponse<List<UnitResponse>>> getByAreaId(@PathVariable Long areaId) {
        List<UnitResponse> units = unitService.getByAreaId(areaId);
        return ResponseEntity.ok(
                ApiResponse.success("Units fetched successfully", units));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateUnitRequest request) {
        unitService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Unit updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        unitService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Unit deleted successfully", null));
    }

}
