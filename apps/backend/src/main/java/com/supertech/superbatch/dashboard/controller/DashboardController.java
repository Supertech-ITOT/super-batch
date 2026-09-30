package com.supertech.superbatch.dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;
import com.supertech.superbatch.dashboard.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<BatchStatusDashboardResponse>> getBatchStatusDashboard() {
        BatchStatusDashboardResponse res = dashboardService.getBatchStatusDashboard();
        return ResponseEntity.ok(ApiResponse.success("Batch Status fetched successfully.", res));
    }
}
