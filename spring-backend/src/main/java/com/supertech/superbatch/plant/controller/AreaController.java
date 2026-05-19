package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Area.CreateAreaRequest;
import com.supertech.superbatch.plant.dto.Area.UpdateAreaRequest;
import com.supertech.superbatch.plant.entity.Area;
import com.supertech.superbatch.plant.service.AreaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/areas")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AreaController {
    private final AreaService areaService;

    @PostMapping
    public ResponseEntity<ApiResponse<Area>> create(@Valid @RequestBody CreateAreaRequest request) {
        Area area = areaService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Area created successfully", area));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Area>>> getAll() {
        List<Area> areas = areaService.getAll();
        return ResponseEntity.ok(
                ApiResponse.success("All Areas fetched successfully", areas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Area>> getById(@PathVariable Long id) {
        Area area = areaService.getById(id);
        return ResponseEntity.ok(
                ApiResponse.success("Area fetched successfully", area));
    }

    @GetMapping("/by-plant/{plantId}")
    public ResponseEntity<ApiResponse<List<Area>>> getByPlantId(@PathVariable Long plantId) {
        List<Area> areas = areaService.getByPlantId(plantId);
        return ResponseEntity.ok(
                ApiResponse.success("Areas fetched successfully", areas));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Area>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateAreaRequest request) {
        Area area = areaService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Area updated successfully", area));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        areaService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Area deleted successfully", null));
    }
}
