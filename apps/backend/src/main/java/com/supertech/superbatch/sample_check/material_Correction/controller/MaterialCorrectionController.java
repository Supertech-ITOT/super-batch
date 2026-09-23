package com.supertech.superbatch.sample_check.material_correction.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionRequest;
import com.supertech.superbatch.sample_check.material_correction.dto.MaterialCorrectionResponse;
import com.supertech.superbatch.sample_check.material_correction.service.MaterialCorrectionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/material-corrections")
@RequiredArgsConstructor
public class MaterialCorrectionController {

    private final MaterialCorrectionService materialCorrectionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody MaterialCorrectionRequest request) {
        materialCorrectionService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Material correction created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MaterialCorrectionResponse>>> getByBatchNo(
            @RequestParam String batchNo) {
        List<MaterialCorrectionResponse> corrections = materialCorrectionService.getByBatchNo(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Material corrections fetched successfully", corrections));
    }
}