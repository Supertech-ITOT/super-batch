package com.supertech.superbatch.plant.dto.Material;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.enums.MaterialType;

public record MaterialResponse(
        Long id,
        String code,
        String name,
        MaterialType materialType,
        UomType uom,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}