package com.supertech.superbatch.plant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionRequest;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionResponse;
import com.supertech.superbatch.plant.service.UnitConnectionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/unit-connections")
@RequiredArgsConstructor
@Validated
public class UnitConnectionController {

    private final UnitConnectionService unitConnectionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody UnitConnectionRequest request) {

        unitConnectionService.create(request);

        return ResponseEntity.ok(
                ApiResponse.success("Unit connection created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long id,
            @Valid @RequestBody UnitConnectionRequest request) {

        unitConnectionService.update(id, request);

        return ResponseEntity.ok(
                ApiResponse.success("Unit connection updated successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UnitConnectionResponse>> getById(@PathVariable Long id) {
        return ResponseEntity
                .ok(ApiResponse.success("Unit connection fetched successfully", unitConnectionService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UnitConnectionResponse>>> getAll() {
        return ResponseEntity
                .ok(ApiResponse.success("Unit connections fetched successfully", unitConnectionService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        unitConnectionService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.success("Unit connection deleted successfully", null));
    }
}