package com.supertech.superbatch.dashboard.service;

import java.util.List;

import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;

public interface DashboardService {
    BatchStatusDashboardResponse getBatchStatus();

    List<ActiveBatchesResponse> getActiveBatches();

}
