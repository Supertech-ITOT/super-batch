package com.supertech.superbatch.plant.area.dto;

import lombok.Builder;

@Builder
public record AreaAudit(
        Long id,
        String name,
        String description,
        String areaType) {
}