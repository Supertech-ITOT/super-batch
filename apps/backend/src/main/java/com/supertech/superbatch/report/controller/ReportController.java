package com.supertech.superbatch.report.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.report.dto.BatchSopResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse;
import com.supertech.superbatch.report.dto.ParameterValueResponse;
import com.supertech.superbatch.report.dto.QualityCheckResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import com.supertech.superbatch.report.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/batches/search")
    public ResponseEntity<ApiResponse<Page<BatchesResponse>>> getBatches(
            @RequestBody ReportFilterRequest request) {
        Page<BatchesResponse> res = reportService.getBatches(request);
        return ResponseEntity.ok(ApiResponse.success("Batches fetched successfully", res));
    }

    @GetMapping("/batches/{id}")
    public ResponseEntity<ApiResponse<BatchesResponse>> getBatchInfoById(@PathVariable Long id) {
        BatchesResponse res = reportService.getBatchInfoById(id);
        return ResponseEntity.ok(ApiResponse.success("Batch fetched successfully", res));
    }

    @GetMapping("/batches/{id}/sops")
    public ResponseEntity<ApiResponse<List<BatchSopResponse>>> getBatchSopByBatchId(@PathVariable Long id) {
        List<BatchSopResponse> res = reportService.getBatchSopByBatchId(id);
        return ResponseEntity.ok(ApiResponse.success("Batch sop fetched successfully", res));
    }

    @GetMapping("/batches/{id}/material-quantity")
    public ResponseEntity<ApiResponse<MaterialQuantityResponse>> getMaterialQuantityByBatchId(@PathVariable Long id) {
        MaterialQuantityResponse res = reportService.getMaterialQuantityByBatchId(id);
        return ResponseEntity.ok(ApiResponse.success("Material Qty fetched successfully", res));
    }

    @GetMapping("/batches/{id}/parameter-value")
    public ResponseEntity<ApiResponse<ParameterValueResponse>> getParameterValueByBatchId(@PathVariable Long id) {
        ParameterValueResponse res = reportService.getParameterValueByBatchId(id);
        return ResponseEntity.ok(ApiResponse.success("Parameter Value fetched successfully", res));
    }

    @GetMapping("/batches/{id}/quality-check")
    public ResponseEntity<ApiResponse<QualityCheckResponse>> getQualityCheckByBatchId(@PathVariable Long id) {
        QualityCheckResponse res = reportService.getQualityCheckByBatchId(id);
        return ResponseEntity.ok(ApiResponse.success("Quality Check fetched successfully", res));
    }

}
