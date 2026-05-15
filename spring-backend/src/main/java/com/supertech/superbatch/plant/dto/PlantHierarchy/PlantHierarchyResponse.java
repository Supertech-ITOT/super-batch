package com.supertech.superbatch.plant.dto.PlantHierarchy;

import java.util.List;

public record PlantHierarchyResponse(
        String id,
        String name,
        String type,
        List<PlantHierarchyResponse> children) {
}