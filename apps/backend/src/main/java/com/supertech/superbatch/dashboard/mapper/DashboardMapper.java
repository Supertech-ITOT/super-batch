package com.supertech.superbatch.dashboard.mapper;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Component;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusCardResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;
import com.supertech.superbatch.dashboard.dto.ScheduledBatchResponse;

@Component
public class DashboardMapper {

        public BatchStatusCardResponse toStatusCard(BatchStatus status, long count) {
                return BatchStatusCardResponse
                                .builder()
                                .status(status)
                                .count(count)
                                .build();
        }

        public BatchStatusDashboardResponse toDashboard(long totalBatches, List<BatchStatusCardResponse> statuses) {
                return BatchStatusDashboardResponse
                                .builder()
                                .totalBatches(totalBatches)
                                .statuses(statuses)
                                .build();
        }

        public ActiveBatchesResponse toActiveBatchResponse(Long batchId, String batchNo, String product, String unit,
                        LocalDateTime startedAt, Double cycleTime, Double stdTime, BatchStatus status,
                        Integer progress) {
                return ActiveBatchesResponse
                                .builder()
                                .batchId(batchId)
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

        public ScheduledBatchResponse toScheduledBatchResponse(
                        String batchNo,
                        Double batchSize,
                        String product,
                        String unit,
                        LocalDateTime scheduledAt) {

                return ScheduledBatchResponse.builder()
                                .batchNo(batchNo)
                                .batchSize(batchSize)
                                .product(product)
                                .unit(unit)
                                .scheduledAt(scheduledAt != null
                                                ? scheduledAt.toString()
                                                : null)
                                .build();
        }
}
