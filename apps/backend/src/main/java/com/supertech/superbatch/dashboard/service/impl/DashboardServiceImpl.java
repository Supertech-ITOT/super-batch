package com.supertech.superbatch.dashboard.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.enums.BatchStatus;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.dashboard.dto.ActiveBatchesResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusCardResponse;
import com.supertech.superbatch.dashboard.dto.BatchStatusDashboardResponse;
import com.supertech.superbatch.dashboard.dto.BatchThroughputResponse;
import com.supertech.superbatch.dashboard.dto.ProductionInsightsResponse;
import com.supertech.superbatch.dashboard.dto.ScheduledBatchResponse;
import com.supertech.superbatch.dashboard.enums.InsightPeriod;
import com.supertech.superbatch.dashboard.helper.BatchCycleTimeCalculator;
import com.supertech.superbatch.dashboard.helper.BatchSuccessRateCalculator;
import com.supertech.superbatch.dashboard.helper.DashboardHelper;
import com.supertech.superbatch.dashboard.helper.MaterialAccuracyCalculator;
import com.supertech.superbatch.dashboard.helper.ProcessEfficiencyCalculator;
import com.supertech.superbatch.dashboard.mapper.DashboardMapper;
import com.supertech.superbatch.dashboard.service.DashboardService;
import com.supertech.superbatch.manager.module.enums.ModuleType;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;
import com.supertech.superbatch.scheduler.control_recipe.repository.ControlRecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@RequiresPermission(ModuleType.DASHBOARD)
public class DashboardServiceImpl implements DashboardService {
        private final BatchRepository batchRepository;
        private final DashboardMapper dashboardMapper;
        private final DashboardHelper dashboardHelper;
        private final BatchCycleTimeCalculator batchCycleTimeCalculator;
        private final BatchSuccessRateCalculator batchSuccessRateCalculator;
        private final MaterialAccuracyCalculator materialAccuracyCalculator;
        private final ProcessEfficiencyCalculator processEfficiencyCalculator;
        private final ControlRecipeRepository controlRecipeRepository;

        @Override
        public BatchStatusDashboardResponse getBatchStatus() {
                Map<BatchStatus, Long> counts = batchRepository.countByStatus()
                                .stream()
                                .collect(Collectors.toMap(row -> (BatchStatus) row[0], row -> (Long) row[1]));

                List<BatchStatusCardResponse> statuses = Arrays.stream(BatchStatus.values())
                                .map(status -> dashboardMapper.toStatusCard(status, counts.getOrDefault(status, 0L)))
                                .toList();

                long total = statuses.stream().mapToLong(BatchStatusCardResponse::count).sum();
                return dashboardMapper.toDashboard(total, statuses);
        }

        @Override
        public List<ActiveBatchesResponse> getActiveBatches() {

                List<Batch> batches = batchRepository.findByStatusInOrderByStartDateTimeAsc(
                                List.of(BatchStatus.IN_PROGRESS, BatchStatus.PAUSED));

                return batches.stream()
                                .map(batch -> {
                                        LocalDateTime startedAt = batch.getStartDateTime();
                                        Double cycleTime = dashboardHelper.calculateCycleTime(startedAt);
                                        Double stdTime = dashboardHelper.calculateStandardTime(batch.getSops());
                                        Integer progress = dashboardHelper.calculateProgress(batch.getStartDateTime(),
                                                        batch.getEndDateTime(), stdTime);
                                        return dashboardMapper.toActiveBatchResponse(
                                                        batch.getId(),
                                                        batch.getBatchNo(),
                                                        batch.getMasterRecipe().getMaterial().getCode(),
                                                        batch.getUnit().getCode(),
                                                        startedAt,
                                                        cycleTime,
                                                        stdTime,
                                                        batch.getStatus(),
                                                        progress);
                                })
                                .toList();
        }

        @Override
        public List<ScheduledBatchResponse> getScheduledBatches() {

                List<ControlRecipe> controlRecipes = controlRecipeRepository
                                .findByStatusAndScheduledAtAfterOrderByScheduledAtAsc(
                                                ControlRecipeStatus.SCHEDULED,
                                                LocalDateTime.now());

                return controlRecipes.stream()
                                .map(controlRecipe -> {
                                        Double batchSize = controlRecipe.getBatchSize().doubleValue();
                                        return dashboardMapper.toScheduledBatchResponse(
                                                        controlRecipe.getBatchNo(),
                                                        batchSize,
                                                        controlRecipe.getRecipe().getMaterial().getCode(),
                                                        controlRecipe.getUnit().getCode(),
                                                        controlRecipe.getScheduledAt());
                                })
                                .toList();
        }

        @Override
        public ProductionInsightsResponse getProductionInsights(InsightPeriod period) {
                int days = period.getDays();

                // Current
                LocalDate currentEndDate = LocalDate.now();
                LocalDate currentStartDate = currentEndDate.minusDays(days - 1);
                LocalDateTime currentStartDateTime = currentStartDate.atStartOfDay();
                LocalDateTime currentEndDateTime = currentEndDate.plusDays(1).atStartOfDay();
                List<Batch> currentBatches = batchRepository
                                .findByStartDateTimeGreaterThanEqualAndStartDateTimeLessThan(
                                                currentStartDateTime, currentEndDateTime);

                // Previous
                LocalDate previousEndDate = currentStartDate.minusDays(1);
                LocalDate previousStartDate = previousEndDate.minusDays(days - 1);
                LocalDateTime previousStartDateTime = previousStartDate.atStartOfDay();
                LocalDateTime previousEndDateTime = currentStartDate.atStartOfDay();
                List<Batch> previousBatches = batchRepository
                                .findByStartDateTimeGreaterThanEqualAndStartDateTimeLessThan(
                                                previousStartDateTime, previousEndDateTime);

                ProductionInsightsResponse.AverageBatchCycleTime cycleTime = batchCycleTimeCalculator
                                .calculateAverageBatchCycleTime(currentBatches, previousBatches, currentStartDate,
                                                currentEndDate);
                ProductionInsightsResponse.PercentageMetric successRate = batchSuccessRateCalculator
                                .calculateBatchSuccessRate(currentBatches, previousBatches, currentStartDate,
                                                currentEndDate);
                ProductionInsightsResponse.PercentageMetric processEfficiency = processEfficiencyCalculator
                                .calculateProcessTimeEfficiency(currentBatches, previousBatches, currentStartDate,
                                                currentEndDate);
                ProductionInsightsResponse.PercentageMetric materialAccuracy = materialAccuracyCalculator
                                .calculateMaterialConsumptionAccuracy(
                                                currentBatches, previousBatches, currentStartDate, currentEndDate);

                return dashboardMapper.toResponse(days, currentStartDate, currentEndDate, cycleTime, successRate,
                                processEfficiency,
                                materialAccuracy);
        }

        @Override
        public BatchThroughputResponse getBatchThroughput(InsightPeriod period) {
                int days = period.getDays();
                LocalDate endDate = LocalDate.now();
                LocalDate startDate = endDate.minusDays(days - 1);
                List<Batch> batches = batchRepository.findByStartDateTimeGreaterThanEqualAndStartDateTimeLessThan(
                                startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay());
                return dashboardMapper.toBatchThroughputResponse(days, startDate, endDate, batches);
        }

}
