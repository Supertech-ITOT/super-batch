package com.supertech.superbatch.plant.controller;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Plant.CreatePlantRequest;
import com.supertech.superbatch.plant.dto.Plant.UpdatePlantRequest;
import com.supertech.superbatch.plant.entity.Plant;
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
    public ResponseEntity<ApiResponse<Plant>> create(@Valid @RequestBody CreatePlantRequest request) {
        Plant plant = plantService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Plant created successfully", plant));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Plant>>> getAll() {
        List<Plant> plants = plantService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("All Plants fetched successfully", plants));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Plant>> getById(@PathVariable Long id) {
        Plant plant = plantService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Plant fetched successfully", plant));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Plant>> update(@PathVariable Long id,
            @Valid @RequestBody UpdatePlantRequest request) {
        Plant plant = plantService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Plant updated successfully", plant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        plantService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Plant deleted successfully", null));
    }
}