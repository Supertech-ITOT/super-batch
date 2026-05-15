package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Unit.CreateUnitRequest;
import com.supertech.superbatch.plant.dto.Unit.UpdateUnitRequest;
import com.supertech.superbatch.plant.entity.Unit;
import com.supertech.superbatch.plant.service.UnitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/units")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UnitController {
    private final UnitService unitService;

    @PostMapping
    public ApiResponse<Unit> create(@Valid @RequestBody CreateUnitRequest request) {
        Unit unit = unitService.create(request);
        return new ApiResponse<>(true, "Unit created successfully", unit);
    }

    @GetMapping
    public ApiResponse<List<Unit>> getAll() {
        List<Unit> units = unitService.getAll();
        return new ApiResponse<>(true, "All Units fetched successfully", units);
    }

    @GetMapping("/{id}")
    public ApiResponse<Unit> getById(@PathVariable Long id) {
        Unit unit = unitService.getById(id);
        return new ApiResponse<>(true, "Unit fetched successfully", unit);
    }

    @GetMapping("/by-area/{areaId}")
    public ApiResponse<List<Unit>> getByPlantId(@PathVariable Long areaId) {
        List<Unit> units = unitService.getByAreaId(areaId);
        return new ApiResponse<>(true, "Units fetched successfully", units);
    }

    @PutMapping("/{id}")
    public ApiResponse<Unit> update(@PathVariable Long id, @Valid @RequestBody UpdateUnitRequest request) {
        Unit unit = unitService.update(id, request);
        return new ApiResponse<>(true, "Unit updated successfully", unit);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        unitService.delete(id);
        return new ApiResponse<>(true, "Unit deleted successfully", null);
    }
}
