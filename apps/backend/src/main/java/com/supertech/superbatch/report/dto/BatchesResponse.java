package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.batch.batch.enums.BatchStatus;

import lombok.Builder;

@Builder
public record BatchesResponse(
        Long id,
        String batchNo,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        UnitResponse unit,
        ProductResponse product,
        String masterRecipeName,
        String controlRecipeName,
        String shiftIncharge,
        Integer standardTime,
        Integer actualTime,
        Integer varianceTime,
        Integer standardSize,
        Double actualSize,
        Double varianceSize,
        Integer totalSteps,
        Integer completedSteps,
        Double completionPercentage,
        BatchStatus status

) {

    @Builder
    public record UnitResponse(
            Long id,
            String name,
            String code) {
    }

    @Builder
    public record ProductResponse(
            Long id,
            String name,
            String code) {
    }
}