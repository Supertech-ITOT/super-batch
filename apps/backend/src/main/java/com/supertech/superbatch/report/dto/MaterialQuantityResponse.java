package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record MaterialQuantityResponse(
                Long id,
                String batchNo,
                List<MaterialStatisticsData> statsData,
                List<MaterialQuantityChartData> chartData,
                List<MaterialQuantityTableData> tableData) {

        @Builder
        public record MaterialStatisticsData(
                        String label,
                        Double value,
                        Boolean highlight,
                        String unit) {
        }

        @Builder
        public record MaterialQuantityChartData(
                        Long materialId,
                        String materialName,
                        String materialCode,
                        Double stdQty,
                        Double actQty) {
        }

        @Builder
        public record MaterialQuantityTableData(
                        Integer stepNo,
                        Integer loop,
                        LocalDateTime startDateTime,
                        LocalDateTime endDateTime,
                        Long materialId,
                        String materialName,
                        String materialCode,
                        Double stdQty,
                        Double actQty,
                        Double varQty,
                        Double varPct) {
        }
}