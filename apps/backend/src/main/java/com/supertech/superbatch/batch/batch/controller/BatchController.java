package com.supertech.superbatch.batch.batch.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.service.BatchService;
import com.supertech.superbatch.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batches")
@RequiredArgsConstructor
public class BatchController {
    private final BatchService batchService;

    @GetMapping("/{batchNo}")
    public ResponseEntity<ApiResponse<BatchResponse>> getByBatchNo(@PathVariable String batchNo) {
        BatchResponse batch = batchService.getByBatchNo(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch fetched successfully", batch));
    }

    @PostMapping("/{batchNo}/start")
    public ResponseEntity<ApiResponse<Void>> start(@PathVariable String batchNo) {
        batchService.start(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch started successfully", null));
    }

    @PostMapping("/{batchNo}/pause")
    public ResponseEntity<ApiResponse<Void>> pause(@PathVariable String batchNo) {
        batchService.pause(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch paused successfully", null));
    }

    @PostMapping("/{batchNo}/resume")
    public ResponseEntity<ApiResponse<Void>> resume(@PathVariable String batchNo) {
        batchService.resume(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch resumed successfully", null));
    }

    @PostMapping("/{batchNo}/abort")
    public ResponseEntity<ApiResponse<Void>> abort(@PathVariable String batchNo) {
        batchService.abort(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch aborted successfully", null));
    }

    @PostMapping("/{batchNo}/steps/{stepNo}/complete")
    public ResponseEntity<ApiResponse<Void>> complete(@PathVariable String batchNo, @PathVariable Integer stepNo) {
        batchService.complete(batchNo, stepNo);
        return ResponseEntity.ok(ApiResponse.success("Batch step completed successfully", null));
    }

    @PostMapping("/{batchNo}/remarks")
    public ResponseEntity<ApiResponse<Void>> remark(@PathVariable String batchNo, @RequestBody String remark) {
        batchService.remark(batchNo, remark);
        return ResponseEntity.ok(ApiResponse.success("Batch remark added successfully", null));
    }

    @GetMapping("/{batchNo}/recipe-info")
    public ResponseEntity<ApiResponse<RecipeInfoResponse>> getRecipeInfoByBatchNo(@PathVariable String batchNo) {
        RecipeInfoResponse recipeInfo = batchService.getRecipeInfoByBatchNo(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Recipe information fetched successfully", recipeInfo));
    }

    @GetMapping("/{batchNo}/steps/{stepNo}/complete")
    public ResponseEntity<ApiResponse<Void>> getStepInfoByBatchNoAndStepNo(@PathVariable String batchNo,
            @PathVariable Integer stepNo) {
        batchService.complete(batchNo, stepNo);
        return ResponseEntity.ok(ApiResponse.success("Step information fetched successfully", null));
    }
}