package com.supertech.superbatch.dashboard.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.dashboard.dto.BatchStatusCardResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;

@Component
public class DashboardMapper {

        public BatchStatusCardResponse toStatusCard(BatchStatus status, long count, String metric, String metricValue,
                        Long comparison) {
                return BatchStatusCardResponse
                                .builder()
                                .status(status)
                                .count(count)
                                .metric(metric)
                                .metricValue(metricValue)
                                .comparison(comparison)
                                .build();
        }

        public BatchStatusDashboardResponse toDashboard(long totalBatches, List<BatchStatusCardResponse> statuses) {
                return BatchStatusDashboardResponse
                                .builder()
                                .totalBatches(totalBatches)
                                .statuses(statuses)
                                .build();
        }
}
