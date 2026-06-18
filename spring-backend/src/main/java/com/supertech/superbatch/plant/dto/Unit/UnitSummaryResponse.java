package com.supertech.superbatch.plant.dto.Unit;

import lombok.Builder;

@Builder
public record UnitSummaryResponse(
                Long id,
                String name) {
}