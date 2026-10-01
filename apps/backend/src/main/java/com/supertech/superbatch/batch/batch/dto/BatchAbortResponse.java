package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

import lombok.Builder;

@Builder
public record BatchAbortResponse(
        Long batchId,
        String batchNo,
        String masterRecipeName,
        String controlRecipeName,
        String unitName,
        BatchStatus status,
        LocalDateTime startDateTime,
        Integer currentStepNo) {
}