package com.supertech.superbatch.dashboard.service;

import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;

public interface DashboardService {
    BatchStatusDashboardResponse getBatchStatus();

    ActiveBatchesResponse getActiveBatch();

}
