package com.supertech.superbatch.plant.common.dto;

import java.util.List;

public record PlantHierarchyResponse(
        Long id,
        String name,
        String type,
        List<PlantHierarchyResponse> children) {
}