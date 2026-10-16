package com.supertech.superbatch.batch.batch.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supertech.superbatch.batch.batch.dto.BatchAbortResponse;
import com.supertech.superbatch.batch.batch.dto.BatchInfoResponse;
import com.supertech.superbatch.batch.batch.dto.BatchProgressResponse;
import com.supertech.superbatch.batch.batch.dto.BatchResponse;
import com.supertech.superbatch.batch.batch.dto.BatchSOPResponse;
import com.supertech.superbatch.batch.batch.dto.BatchStepRemarkRequest;
import com.supertech.superbatch.batch.batch.dto.RecipeInfoResponse;
import com.supertech.superbatch.batch.batch.dto.StepChangeRequest;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.service.BatchExecutionService;
import com.supertech.superbatch.batch.batch.service.BatchService;
import com.supertech.superbatch.common.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batches")
@RequiredArgsConstructor
public class BatchController {
    private final BatchService batchService;
    private final BatchExecutionService batchExecutionService;

    @GetMapping("/{batchNo}")
    public ResponseEntity<ApiResponse<BatchResponse>> getByBatchNo(@PathVariable String batchNo) {
        BatchResponse batch = batchService.getByBatchNo(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch fetched successfully", batch));
    }

    @PostMapping("/{batchNo}/start")
    public ResponseEntity<ApiResponse<Void>> start(@PathVariable String batchNo) {
        batchExecutionService.start(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch started successfully", null));
    }

    @PostMapping("/{batchNo}/pause")
    public ResponseEntity<ApiResponse<Void>> pause(
            @PathVariable String batchNo,
            @RequestBody BatchStepRemarkRequest request) {

        batchExecutionService.pause(batchNo, request.stepNo(), request.remark());
        return ResponseEntity.ok(ApiResponse.success("Batch paused successfully", null));
    }

    @PostMapping("/{batchNo}/resume/{stepNo}")
    public ResponseEntity<ApiResponse<Void>> resume(
            @PathVariable String batchNo,
            @PathVariable Integer stepNo) {

        batchExecutionService.resume(batchNo, stepNo);
        return ResponseEntity.ok(ApiResponse.success("Batch resumed successfully", null));
    }

    @PostMapping("/{batchNo}/abort")
    public ResponseEntity<ApiResponse<Void>> abort(
            @PathVariable String batchNo,
            @Valid @RequestBody BatchStepRemarkRequest request) {

        batchExecutionService.abort(batchNo, request.stepNo(), request.remark());
        return ResponseEntity.ok(ApiResponse.success("Batch aborted successfully", null));
    }

    @PostMapping("/{batchNo}/remarks")
    public ResponseEntity<ApiResponse<Void>> remark(
            @PathVariable String batchNo,
            @Valid @RequestBody BatchStepRemarkRequest request) {

        batchExecutionService.remark(batchNo, request.stepNo(), request.remark());
        return ResponseEntity.ok(ApiResponse.success("Batch remark added successfully", null));
    }

    @GetMapping("/{batchNo}/recipe-info")
    public ResponseEntity<ApiResponse<RecipeInfoResponse>> getRecipeInfoByBatchNo(
            @PathVariable String batchNo) {
        RecipeInfoResponse recipeInfo = batchService.getRecipeInfoByBatchNo(batchNo);
        return ResponseEntity.ok(
                ApiResponse.success("Recipe information fetched successfully", recipeInfo));
    }

    @GetMapping("/{batchNo}/steps/{stepNo}")
    public ResponseEntity<ApiResponse<?>> getStepInfoByBatchNoAndStepNo(@PathVariable String batchNo,
            @PathVariable Integer stepNo) {
        BatchSOPResponse res = batchService.getStepInfoByBatchNoAndStepNo(batchNo, stepNo);
        return ResponseEntity.ok(ApiResponse.success("Step information fetched successfully", res));
    }

    @GetMapping("/batch-nos")
    public ResponseEntity<ApiResponse<List<String>>> getBatchNos(
            @RequestParam String unitCode,
            @RequestParam BatchStatus status) {
        List<String> batchNos = batchService.getBatchNos(unitCode, status);
        return ResponseEntity.ok(ApiResponse.success("Batch number fetched successfully", batchNos));
    }

    @PostMapping("/{batchNo}/download")
    public ResponseEntity<ApiResponse<Void>> download(@PathVariable String batchNo) {
        batchExecutionService.download(batchNo);
        return ResponseEntity.ok(ApiResponse.success("Batch downloaded successfully", null));
    }

    @PostMapping("/{batchNo}/step-change")
    public ResponseEntity<ApiResponse<Void>> onStepChange(
            @PathVariable String batchNo,
            @Valid @RequestBody StepChangeRequest request) {
        batchExecutionService.onStepChange(batchNo, request);
        return ResponseEntity.ok(ApiResponse.success("Step changed successfully", null));
    }

    @GetMapping("/{batchId}/abort-details")
    public ResponseEntity<ApiResponse<BatchAbortResponse>> getAbortDetails(@PathVariable Long batchId) {
        BatchAbortResponse res = batchService.getAbortDetails(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch abort details fetched successfully", res));
    }

    @GetMapping("/{batchId}/info")
    public ResponseEntity<ApiResponse<BatchInfoResponse>> getBatchInfo(@PathVariable Long batchId) {
        BatchInfoResponse res = batchService.getBatchInfoById(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch info fetched successfully", res));
    }

    @GetMapping("/{batchId}/progress")
    public ResponseEntity<ApiResponse<BatchProgressResponse>> getBatchProgress(@PathVariable Long batchId) {
        BatchProgressResponse res = batchService.getBatchProgressById(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch Progress fetched successfully", res));
    }

    @GetMapping("/{batchId}/current-step-info")
    public ResponseEntity<ApiResponse<BatchSOPResponse>> getCurrentStepInfo(@PathVariable Long batchId) {
        BatchSOPResponse res = batchService.getCurrentStepInfoById(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch SOP info fetched successfully", res));
    }

    @GetMapping("/{batchId}/all-steps-info")
    public ResponseEntity<ApiResponse<BatchResponse>> getAllStepById(@PathVariable Long batchId) {
        BatchResponse res = batchService.getById(batchId);
        return ResponseEntity.ok(ApiResponse.success("Batch All SOP info fetched successfully", res));
    }

}