package com.supertech.superbatch.plant.plant.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record PlantAudit(
        Long id,
        String name,
        String description,
        String location,
        String plantType,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}