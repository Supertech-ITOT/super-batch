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
import com.supertech.superbatch.dashboard.helper.DashboardHelper;
import com.supertech.superbatch.dashboard.mapper.DashboardMapper;
import com.supertech.superbatch.dashboard.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {
    private final BatchRepository batchRepository;
    private final DashboardMapper dashboardMapper;
    private final DashboardHelper dashboardHelper;

    @Override
    public BatchStatusDashboardResponse getBatchStatus() {

        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        Map<BatchStatus, Long> todayCounts = toStatusCountMap(batchRepository.countByStatus(start, end));
        Map<BatchStatus, Long> yesterdayCounts = toStatusCountMap(
                batchRepository.countByStatus(start.minusDays(1), start));

        List<BatchStatusCardResponse> statuses = Arrays.stream(BatchStatus.values())
                .map(status -> {
                    long count = todayCounts.getOrDefault(status, 0L);
                    Long comparison = calculateComparison(
                            status,
                            todayCounts,
                            yesterdayCounts);
                    return createStatusCard(status, count, comparison);
                })
                .toList();

        long total = statuses.stream().mapToLong(BatchStatusCardResponse::count).sum();

        return dashboardMapper.toDashboard(total, statuses);
    }

    private Map<BatchStatus, Long> toStatusCountMap(List<Object[]> results) {
        return results.stream()
                .collect(Collectors.toMap(row -> (BatchStatus) row[0], row -> (Long) row[1]));
    }

    private Long calculateComparison(
            BatchStatus status,
            Map<BatchStatus, Long> todayCounts,
            Map<BatchStatus, Long> yesterdayCounts) {

        long today = todayCounts.getOrDefault(status, 0L);
        long yesterday = yesterdayCounts.getOrDefault(status, 0L);

        return today - yesterday;
    }

    private BatchStatusCardResponse createStatusCard(BatchStatus status, long count, Long comparison) {
        return switch (status) {
            case TRANSFERRED ->
                dashboardMapper.toStatusCard(status, count, comparison);

            case READY ->
                dashboardMapper.toStatusCard(status, count, comparison);

            case IN_PROGRESS ->
                dashboardMapper.toStatusCard(status, count, comparison);

            case PAUSED ->
                dashboardMapper.toStatusCard(status, count, comparison);

            case COMPLETED ->
                dashboardMapper.toStatusCard(status, count, comparison);

            case ABORTED ->
                dashboardMapper.toStatusCard(status, count, comparison);
        };
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
                            batch.getBatchNo(),
                            batch.getMasterRecipe().getMaterial().getCode(),
                            batch.getUnit().getName(),
                            startedAt,
                            cycleTime,
                            stdTime,
                            batch.getStatus(),
                            progress);
                })
                .toList();
    }
}
