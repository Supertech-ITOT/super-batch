package com.supertech.superbatch.plant.material.service;

import java.util.List;

import com.supertech.superbatch.plant.material.dto.CreateMaterialRequest;
import com.supertech.superbatch.plant.material.dto.MaterialResponse;
import com.supertech.superbatch.plant.material.dto.UpdateMaterialRequest;

public interface MaterialService {
    void create(CreateMaterialRequest request);

    List<MaterialResponse> getAll();

    MaterialResponse getById(Long id);

    void update(Long id, UpdateMaterialRequest request);

    void delete(Long id);
}
