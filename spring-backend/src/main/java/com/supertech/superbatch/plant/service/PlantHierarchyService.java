package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.PlantHierarchy.PlantHierarchyResponse;

public interface PlantHierarchyService {
    List<PlantHierarchyResponse> getHierarchy();
}
