package com.supertech.superbatch.plant.dto.Material;

import java.time.LocalDateTime;

import com.supertech.superbatch.plant.dto.UOM.UomResponse;
import com.supertech.superbatch.plant.enums.MaterialType;

public record MaterialResponse(
        Long id,
        String code,
        String name,
        MaterialType materialType,
        UomResponse uom,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}