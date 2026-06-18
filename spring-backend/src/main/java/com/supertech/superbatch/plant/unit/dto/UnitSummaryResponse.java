package com.supertech.superbatch.plant.unit.dto;

import lombok.Builder;

@Builder
public record UnitSummaryResponse(
                Long id,
                String name) {
}