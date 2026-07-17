package com.supertech.superbatch.plant.material.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.plant.material.enums.MaterialType;

public record MaterialResponse(
        Long id,
        String code,
        String name,
        MaterialType materialType,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}