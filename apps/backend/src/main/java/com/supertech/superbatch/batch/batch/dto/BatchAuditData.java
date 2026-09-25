package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

import lombok.Builder;

@Builder
public record BatchAuditData(
        Long id,
        String batchNo,
        BatchStatus status,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime) {

}
