
package com.supertech.superbatch.report.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.security.UserContextService;
import com.supertech.superbatch.report.dto.BatchReportResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import com.supertech.superbatch.report.dto.ReportMetadataResponse;
import com.supertech.superbatch.report.service.ReportExportService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports/export")
@RequiredArgsConstructor
public class ReportExportController {
    private final ReportExportService reportExportService;
    private final UserContextService userContextService;

    @PostMapping("/production-report")
    public ResponseEntity<ApiResponse<List<BatchesResponse>>> generateProductionReport(
            @RequestBody ReportFilterRequest request) {
        List<BatchesResponse> res = reportExportService.generateProductionReport(request);
        return ResponseEntity.ok(ApiResponse.success("Production Report fetched successfully", res));
    }

    @GetMapping("/batch-report/{id}")
    public ResponseEntity<ApiResponse<BatchReportResponse>> generateBatchReport(@PathVariable Long id) {
        BatchReportResponse res = reportExportService.generateBatchReport(id);
        return ResponseEntity.ok(ApiResponse.success("Batch Report fetched successfully", res));
    }

    @GetMapping("/metadata")
    public ResponseEntity<ApiResponse<ReportMetadataResponse>> getMetadata() {
        ReportMetadataResponse res = reportExportService.getMetadata(userContextService.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Report metadata fetched successfully", res));
    }
}
