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

   @PostMapping("/{batchId}")
public ResponseEntity<ApiResponse<Void>> create(
        @PathVariable Long batchId,
        @Valid @RequestBody BatchCheckRequest request) {
    batchCheckService.create(request,batchId);
    return ResponseEntity.ok(ApiResponse.success("Batch check added successfully", null)
    );
}

    @GetMapping("/{batchId}")
    public ResponseEntity<ApiResponse<List<BatchCheckResponse>>> getById(
             @PathVariable Long batchId) {
        List<BatchCheckResponse> batchChecks = batchCheckService.getById(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch checks fetched successfully", batchChecks));
    }
}