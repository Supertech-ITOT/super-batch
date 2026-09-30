package com.supertech.superbatch.dashboard.mapper;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Component;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusCardResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;

@Component
public class DashboardMapper {

        public BatchStatusCardResponse toStatusCard(BatchStatus status, long count,
                        Long comparison) {
                return BatchStatusCardResponse
                                .builder()
                                .status(status)
                                .count(count)
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

        public ActiveBatchesResponse toActiveBatchResponse(String batchNo, String product, String unit,
                        LocalDateTime startedAt, Double cycleTime, Double stdTime, BatchStatus status,
                        Integer progress) {
                return ActiveBatchesResponse
                                .builder()
                                .batchNo(batchNo)
                                .product(product)
                                .unit(unit)
                                .startedAt(startedAt)
                                .cycleTime(cycleTime)
                                .stdTime(stdTime)
                                .status(status)
                                .progress(progress)
                                .build();

        }
}
