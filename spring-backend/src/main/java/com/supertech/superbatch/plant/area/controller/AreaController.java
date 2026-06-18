package com.supertech.superbatch.plant.area.controller;

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
import com.supertech.superbatch.plant.area.dto.AreaResponse;
import com.supertech.superbatch.plant.area.dto.CreateAreaRequest;
import com.supertech.superbatch.plant.area.dto.UpdateAreaRequest;
import com.supertech.superbatch.plant.area.service.AreaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/areas")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AreaController {
    private final AreaService areaService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateAreaRequest request) {
        areaService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Area created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AreaResponse>>> getAll() {
        List<AreaResponse> areas = areaService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Areas fetched successfully", areas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AreaResponse>> getById(
            @PathVariable Long id) {
        AreaResponse area = areaService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Area fetched successfully", area));
    }

    @GetMapping("/by-plant/{plantId}")
    public ResponseEntity<ApiResponse<List<AreaResponse>>> getByPlantId(
            @PathVariable Long plantId) {
        List<AreaResponse> areas = areaService.getByPlantId(plantId);
        return ResponseEntity.ok(ApiResponse.success("Areas fetched successfully", areas));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateAreaRequest request) {
        areaService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Area updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        areaService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Area deleted successfully", null));
    }
}
