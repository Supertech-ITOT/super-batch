package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record ParameterValueResponse(
        Long id,
        String batchNo,
        List<ParameterValueStatisticsData> statsData,
        List<ParameterValueData> data

) {

    @Builder
    public record ParameterValueStatisticsData(
            Long parameterId,
            String parameterName,
            String label,
            Double value,
            Boolean highlight,
            String unit) {
    }

    @Builder
    public record ParameterValueData(
            Long parameterId,
            String parameterName,
            Integer stepNo,
            LocalDateTime dateTime,
            Double stdVal,
            Double actVal,
            Double deviation,
            Double deviationPercent) {
    }

}
