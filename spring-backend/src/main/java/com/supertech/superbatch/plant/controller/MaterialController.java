package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Material.CreateMaterialRequest;
import com.supertech.superbatch.plant.dto.Material.MaterialResponse;
import com.supertech.superbatch.plant.dto.Material.UpdateMaterialRequest;
import com.supertech.superbatch.plant.service.MaterialService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MaterialController {
    private final MaterialService materialService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateMaterialRequest request) {
        materialService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Material created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MaterialResponse>>> getAll() {
        List<MaterialResponse> areas = materialService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Materials fetched successfully", areas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MaterialResponse>> getById(
            @PathVariable Long id) {
        MaterialResponse area = materialService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Material fetched successfully", area));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateMaterialRequest request) {
        materialService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Material updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        materialService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Material deleted successfully", null));
    }
}
