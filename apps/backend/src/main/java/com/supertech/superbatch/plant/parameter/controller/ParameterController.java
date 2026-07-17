package com.supertech.superbatch.plant.parameter.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.parameter.dto.CreateParameterRequest;
import com.supertech.superbatch.plant.parameter.dto.ParameterResponse;
import com.supertech.superbatch.plant.parameter.dto.UpdateParameterRequest;
import com.supertech.superbatch.plant.parameter.service.ParameterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parameters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ParameterController {
    private final ParameterService parameterService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ParameterResponse>>> getAll() {
        List<ParameterResponse> parameters = parameterService.getAll();
        return ResponseEntity.ok(ApiResponse.success("All Parameters fetched successfully", parameters));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ParameterResponse>> getById(
            @PathVariable Long id) {
        ParameterResponse parameter = parameterService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Parameter fetched successfully", parameter));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateParameterRequest request) {
        parameterService.create(request);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateParameterRequest request) {
        parameterService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        parameterService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Parameter deleted successfully", null));
    }
}
