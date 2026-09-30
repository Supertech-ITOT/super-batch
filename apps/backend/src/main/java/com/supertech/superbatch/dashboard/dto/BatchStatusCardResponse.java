package com.supertech.superbatch.dashboard.dto;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

import lombok.Builder;

@Builder
public record BatchStatusCardResponse(
        BatchStatus status,
        long count,
        Long comparison) {
}