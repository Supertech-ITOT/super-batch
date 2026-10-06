package com.supertech.superbatch.dashboard.helper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProcessEfficiencyCalculator {
    private final DashboardHelper dashboardHelper;

    public ProductionInsightsResponse.PercentageMetric calculateProcessTimeEfficiency(List<Batch> currentBatches,
            List<Batch> previousBatches, LocalDate startDate, LocalDate endDate) {

        double currentValue = calculateProcessEfficiency(currentBatches);
        double previousValue = calculateProcessEfficiency(previousBatches);
        double changePercent = dashboardHelper.calculateChangePercent(currentValue, previousValue);
        double[] trend = calculateTrend(currentBatches, startDate, endDate);

        return ProductionInsightsResponse.PercentageMetric.builder()
                .valuePercent(dashboardHelper.roundToTwoDecimals(currentValue))
                .changePercent(changePercent)
                .trend(Arrays.stream(trend).map(dashboardHelper::roundToTwoDecimals).toArray())
                .build();
    }

    private double calculateProcessEfficiency(List<Batch> batches) {

        double standardTime = 0;
        double actualTime = 0;
        for (Batch batch : batches) {
            for (BatchSOP sop : batch.getSops()) {
                if (sop.getStdTime() != null && sop.getActTime() != null) {
                    standardTime += sop.getStdTime();
                    actualTime += sop.getActTime();
                }
            }
        }

        return actualTime == 0
                ? 0
                : (standardTime / actualTime) * 100;
    }

    private double[] calculateTrend(List<Batch> batches, LocalDate startDate, LocalDate endDate) {

        return startDate.datesUntil(endDate.plusDays(1))
                .mapToDouble(date -> {
                    LocalDateTime dayStart = date.atStartOfDay();
                    LocalDateTime dayEnd = date.plusDays(1).atStartOfDay();
                    List<Batch> dailyBatches = batches.stream()
                            .filter(batch -> batch.getStartDateTime() != null &&
                                    !batch.getStartDateTime().isBefore(dayStart) &&
                                    batch.getStartDateTime().isBefore(dayEnd))
                            .toList();

                    return calculateProcessEfficiency(dailyBatches);
                }).toArray();
    }
}
