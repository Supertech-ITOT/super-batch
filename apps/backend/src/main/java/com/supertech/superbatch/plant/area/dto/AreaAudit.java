package com.supertech.superbatch.plant.area.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record AreaAudit(
                Long id,
                String name,
                String description,
                String areaType,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
}