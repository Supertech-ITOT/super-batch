package com.supertech.superbatch.dashboard.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;
import com.supertech.superbatch.dashboard.dto.BatchThroughputResponse;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;
import com.supertech.superbatch.dashboard.dto.ScheduledBatchResponse;
import com.supertech.superbatch.dashboard.enums.InsightPeriod;
import com.supertech.superbatch.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<BatchStatusDashboardResponse>> getBatchStatusDashboard() {
        BatchStatusDashboardResponse res = dashboardService.getBatchStatus();
        return ResponseEntity.ok(ApiResponse.success("Batch Status fetched successfully.", res));
    }

    @GetMapping("/active-batches")
    public ResponseEntity<ApiResponse<List<ActiveBatchesResponse>>> getActiveBatches() {
        List<ActiveBatchesResponse> res = dashboardService.getActiveBatches();
        return ResponseEntity.ok(ApiResponse.success("Active batches fetched successfully.", res));
    }

    @GetMapping("/scheduled-batches")
    public ResponseEntity<ApiResponse<List<ScheduledBatchResponse>>> getScheduledBatches() {
        List<ScheduledBatchResponse> res = dashboardService.getScheduledBatches();
        return ResponseEntity.ok(ApiResponse.success("Scheduled batches fetched successfully.", res));
    }

    @GetMapping("/production-insight")
    public ResponseEntity<ApiResponse<ProductionInsightsResponse>> getProductionInsights(
            @RequestParam(defaultValue = "SEVEN_DAYS") InsightPeriod period) {
        ProductionInsightsResponse res = dashboardService.getProductionInsights(period);
        return ResponseEntity.ok(ApiResponse.success("Production Insight fetched successfully.", res));
    }

    @GetMapping("/batch-throughput")
    public ResponseEntity<ApiResponse<BatchThroughputResponse>> getBatchThroughput(
            @RequestParam(defaultValue = "SEVEN_DAYS") InsightPeriod period) {
        BatchThroughputResponse res = dashboardService.getBatchThroughput(period);
        return ResponseEntity.ok(ApiResponse.success("Batch Throughput fetched successfully.", res));
    }
}
