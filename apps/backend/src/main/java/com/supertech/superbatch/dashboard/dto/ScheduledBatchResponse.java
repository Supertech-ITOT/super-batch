package com.supertech.superbatch.dashboard.dto;

import lombok.Builder;

@Builder
public record ScheduledBatchResponse(
        String batchNo,
        Double batchSize,
        String product,
        String unit,
        String scheduledAt) {

}
