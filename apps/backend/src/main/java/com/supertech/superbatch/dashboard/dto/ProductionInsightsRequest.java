package com.supertech.superbatch.dashboard.dto;

import com.supertech.superbatch.dashboard.enums.InsightPeriod;

public record ProductionInsightsRequest(
        InsightPeriod period) {
}