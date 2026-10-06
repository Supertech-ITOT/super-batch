package com.supertech.superbatch.dashboard.helper;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchCycleTimeCalculator {
        private final DashboardHelper dashboardHelper;

        public ProductionInsightsResponse.AverageBatchCycleTime calculateAverageBatchCycleTime(
                        List<Batch> currentBatches,
                        List<Batch> previousBatches, LocalDate startDate, LocalDate endDate) {

                double currentValue = calculateAverageCycleTime(currentBatches);
                double previousValue = calculateAverageCycleTime(previousBatches);
                double changePercent = dashboardHelper.calculateChangePercent(currentValue, previousValue);
                double[] trend = calculateTrend(currentBatches, startDate, endDate);

                return ProductionInsightsResponse.AverageBatchCycleTime.builder()
                                .valueMinutes(currentValue)
                                .changePercent(changePercent)
                                .trend(Arrays.stream(trend).map(dashboardHelper::roundToTwoDecimals).toArray())
                                .build();

        }

        private double calculateAverageCycleTime(List<Batch> batches) {
                return batches.stream()
                                .filter(batch -> batch.getStartDateTime() != null && batch.getEndDateTime() != null)
                                .mapToLong(batch -> Duration.between(batch.getStartDateTime(), batch.getEndDateTime())
                                                .toMinutes())
                                .average()
                                .orElse(0);
        }

        private double[] calculateTrend(List<Batch> batches, LocalDate startDate, LocalDate endDate) {
                return startDate.datesUntil(endDate.plusDays(1)).mapToDouble(date -> {
                        LocalDateTime dayStart = date.atStartOfDay();
                        LocalDateTime dayEnd = date.plusDays(1).atStartOfDay();
                        return batches.stream()
                                        .filter(batch -> batch.getStartDateTime() != null &&
                                                        batch.getEndDateTime() != null &&
                                                        !batch.getStartDateTime().isBefore(dayStart) &&
                                                        batch.getStartDateTime().isBefore(dayEnd))
                                        .mapToLong(batch -> Duration.between(
                                                        batch.getStartDateTime(),
                                                        batch.getEndDateTime())
                                                        .toMinutes())
                                        .average()
                                        .orElse(0);

                }).toArray();
        }
}
