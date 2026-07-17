package com.supertech.superbatch.plant.common.service;

import java.util.List;

import com.supertech.superbatch.plant.common.dto.PlantHierarchyResponse;


public interface PlantHierarchyService {
    List<PlantHierarchyResponse> getHierarchy();
}
