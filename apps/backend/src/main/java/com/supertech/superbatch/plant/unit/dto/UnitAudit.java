package com.supertech.superbatch.plant.unit.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record UnitAudit(
        Long id,
        String name,
        String code,
        String description,
        Integer capacity,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}