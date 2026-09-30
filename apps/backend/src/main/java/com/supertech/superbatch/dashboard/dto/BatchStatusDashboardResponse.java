package com.supertech.superbatch.dashboard.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record BatchStatusDashboardResponse(
                long totalBatches,
                List<BatchStatusCardResponse> statuses) {
}
