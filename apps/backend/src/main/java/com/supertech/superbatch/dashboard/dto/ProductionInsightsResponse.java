package com.supertech.superbatch.dashboard.dto;

import lombok.Builder;

@Builder
public record ProductionInsightsResponse(
        Period period,
        Insights insights) {

    @Builder
    public record Period(
            int days,
            String startDate,
            String endDate) {
    }

    @Builder
    public record Insights(
            AverageBatchCycleTime averageBatchCycleTime,
            PercentageMetric batchSuccessRate,
            PercentageMetric processTimeEfficiency,
            PercentageMetric materialConsumptionAccuracy) {
    }

    @Builder
    public record AverageBatchCycleTime(
            double valueMinutes,
            double changePercent,
            double[] trend) {
    }

    @Builder
    public record PercentageMetric(
            double valuePercent,
            double changePercent,
            double[] trend) {
    }
}