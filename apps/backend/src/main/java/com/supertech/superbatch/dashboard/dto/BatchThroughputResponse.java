package com.supertech.superbatch.dashboard.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record BatchThroughputResponse(
                Period period,
                List<DailyThroughput> data) {

        @Builder
        public record Period(
                        int days,
                        LocalDate startDate,
                        LocalDate endDate) {
        }

        @Builder
        public record DailyThroughput(
                        LocalDate date,
                        long completed,
                        long aborted) {
        }
}