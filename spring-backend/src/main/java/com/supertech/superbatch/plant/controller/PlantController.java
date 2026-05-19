package com.supertech.superbatch.plant.controller;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Plant.CreatePlantRequest;
import com.supertech.superbatch.plant.dto.Plant.PlantResponse;
import com.supertech.superbatch.plant.dto.Plant.UpdatePlantRequest;
import com.supertech.superbatch.plant.service.PlantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlantController {
    private final PlantService plantService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreatePlantRequest request) {
        plantService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Plant created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlantResponse>>> getAll() {
        List<PlantResponse> plants = plantService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Plants fetched successfully", plants));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlantResponse>> getById(@PathVariable Long id) {
        PlantResponse plant = plantService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Plant fetched successfully", plant));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdatePlantRequest request) {
        plantService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Plant updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        plantService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Plant deleted successfully", null));
    }
}