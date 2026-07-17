package com.supertech.superbatch.plant.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.plant.dto.CreatePlantRequest;
import com.supertech.superbatch.plant.plant.dto.PlantResponse;
import com.supertech.superbatch.plant.plant.dto.UpdatePlantRequest;

public interface PlantService {

    void create(CreatePlantRequest request);

    List<PlantResponse> getAll();

    PlantResponse getById(Long id);

    void update(Long id, UpdatePlantRequest request);

    void delete(Long id);

}