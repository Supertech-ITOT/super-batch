package com.supertech.superbatch.dashboard.helper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchSuccessRateCalculator {
        private final DashboardHelper dashboardHelper;

        public ProductionInsightsResponse.PercentageMetric calculateBatchSuccessRate(List<Batch> currentBatches,
                        List<Batch> previousBatches, LocalDate startDate, LocalDate endDate) {

                double currentValue = calculateSuccessRate(currentBatches);
                double previousValue = calculateSuccessRate(previousBatches);
                double changePercent = dashboardHelper.calculateChangePercent(currentValue, previousValue);
                double[] trend = calculateTrend(currentBatches, startDate, endDate);

                return ProductionInsightsResponse.PercentageMetric.builder()
                                .valuePercent(dashboardHelper.roundToTwoDecimals(currentValue))
                                .changePercent(changePercent)
                                .trend(Arrays.stream(trend).map(dashboardHelper::roundToTwoDecimals).toArray())
                                .build();
        }

        private double calculateSuccessRate(List<Batch> batches) {
                long completed = batches.stream()
                                .filter(batch -> batch.getStatus() == BatchStatus.COMPLETED)
                                .count();
                long finished = batches.stream()
                                .filter(batch -> batch.getStatus() == BatchStatus.COMPLETED
                                                || batch.getStatus() == BatchStatus.ABORTED)
                                .count();
                return finished == 0 ? 0 : ((double) completed / finished) * 100;
        }

        private double[] calculateTrend(List<Batch> batches, LocalDate startDate, LocalDate endDate) {
                return startDate.datesUntil(endDate.plusDays(1))
                                .mapToDouble(date -> {
                                        LocalDateTime dayStart = date.atStartOfDay();
                                        LocalDateTime dayEnd = date.plusDays(1).atStartOfDay();
                                        List<Batch> dailyBatches = batches.stream()
                                                        .filter(batch -> batch.getStartDateTime() != null
                                                                        && !batch.getStartDateTime().isBefore(dayStart)
                                                                        &&
                                                                        batch.getStartDateTime().isBefore(dayEnd))
                                                        .toList();
                                        return calculateSuccessRate(dailyBatches);
                                }).toArray();
        }
}
