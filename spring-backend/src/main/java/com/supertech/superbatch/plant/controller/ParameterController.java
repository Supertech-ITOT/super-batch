package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
import com.supertech.superbatch.plant.service.ParameterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parameters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParameterController {
    private final ParameterService materialService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateParameterRequest request) {
        materialService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ParameterResponse>>> getAll() {
        List<ParameterResponse> areas = materialService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Parameters fetched successfully", areas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParameterResponse>> getById(
            @PathVariable Long id) {
        ParameterResponse area = materialService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Parameter fetched successfully", area));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateParameterRequest request) {
        materialService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        materialService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter deleted successfully", null));
    }
}
