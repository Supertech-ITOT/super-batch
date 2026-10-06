package com.supertech.superbatch.dashboard.service;

import java.util.List;

import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;
import com.supertech.superbatch.dashboard.dto.ScheduledBatchResponse;
import com.supertech.superbatch.dashboard.enums.InsightPeriod;

public interface DashboardService {
    BatchStatusDashboardResponse getBatchStatus();

    List<ActiveBatchesResponse> getActiveBatches();

    List<ScheduledBatchResponse> getScheduledBatches();

    ProductionInsightsResponse getProductionInsights(InsightPeriod period);

}
