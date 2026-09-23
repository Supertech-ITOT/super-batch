package com.supertech.superbatch.sample_check.batch_check.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckRequest;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResponse;
import com.supertech.superbatch.sample_check.batch_check.service.BatchCheckService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batch-checks")
@RequiredArgsConstructor
public class BatchCheckController {

    private final BatchCheckService batchCheckService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(
            @Valid @RequestBody BatchCheckRequest request) {
        batchCheckService.create(request);
        return ResponseEntity.ok(ApiResponse.success("Batch check created successfully", null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BatchCheckResponse>>> getByBatchNo(
            @RequestParam String batchNo) {
        List<BatchCheckResponse> batchChecks = batchCheckService.getByBatchNo(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch checks fetched successfully", batchChecks));
    }
}