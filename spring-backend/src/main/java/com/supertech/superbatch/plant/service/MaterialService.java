package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Material.CreateMaterialRequest;
import com.supertech.superbatch.plant.dto.Material.MaterialResponse;
import com.supertech.superbatch.plant.dto.Material.UpdateMaterialRequest;

public interface MaterialService {
    void create(CreateMaterialRequest request);

    List<MaterialResponse> getAll();

    MaterialResponse getById(Long id);

    void update(Long id, UpdateMaterialRequest request);

    void delete(Long id);
}
