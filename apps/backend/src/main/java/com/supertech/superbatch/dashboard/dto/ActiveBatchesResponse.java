package com.supertech.superbatch.dashboard.dto;

import java.time.LocalDateTime;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import lombok.Builder;

@Builder
public record ActiveBatchesResponse(
        String batchNo,
        String product,
        String unit,
        LocalDateTime startedAt,
        Double cycleTime,
        Double stdTime,
        BatchStatus status,
        Integer progress

) {

}
