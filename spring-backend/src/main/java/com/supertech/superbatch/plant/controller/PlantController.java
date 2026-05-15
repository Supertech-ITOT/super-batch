package com.supertech.superbatch.plant.controller;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Plant.CreatePlantRequest;
import com.supertech.superbatch.plant.dto.Plant.UpdatePlantRequest;
import com.supertech.superbatch.plant.entity.Plant;
import com.supertech.superbatch.plant.service.PlantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlantController {
    private final PlantService plantService;

    @PostMapping
    public ApiResponse<Plant> create(@Valid @RequestBody CreatePlantRequest request) {
        Plant plant = plantService.create(request);
        return new ApiResponse<>(true, "Plant created successfully", plant);
    }

    @GetMapping
    public ApiResponse<List<Plant>> getAll() {
        List<Plant> plants = plantService.getAll();
        return new ApiResponse<>(true, "All Plants fetched successfully", plants);
    }

    @GetMapping("/{id}")
    public ApiResponse<Plant> getById(@PathVariable Long id) {
        Plant plant = plantService.getById(id);
        return new ApiResponse<>(true, "Plant fetched successfully", plant);
    }

    @PutMapping("/{id}")
    public ApiResponse<Plant> update(@PathVariable Long id, @Valid @RequestBody UpdatePlantRequest request) {
        Plant plant = plantService.update(id, request);
        return new ApiResponse<>(true, "Plant updated successfully", plant);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        plantService.delete(id);
        return new ApiResponse<>(true, "Plant deleted successfully", null);
    }
}