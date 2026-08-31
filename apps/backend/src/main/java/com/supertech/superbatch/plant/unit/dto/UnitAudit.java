package com.supertech.superbatch.plant.unit.dto;

import com.supertech.superbatch.plant.unit.enums.RecipeQuantityType;

import lombok.Builder;

@Builder
public record UnitAudit(
        Long id,
        String name,
        String code,
        String description,
        RecipeQuantityType recipeQuantityType,
        Integer capacity) {
}