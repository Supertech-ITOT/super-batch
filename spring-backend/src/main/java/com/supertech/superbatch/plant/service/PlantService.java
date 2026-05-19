package com.supertech.superbatch.plant.service;

import com.supertech.superbatch.plant.dto.Plant.CreatePlantRequest;
import com.supertech.superbatch.plant.dto.Plant.PlantResponse;
import com.supertech.superbatch.plant.dto.Plant.UpdatePlantRequest;
import java.util.List;

public interface PlantService {

    void create(CreatePlantRequest request);

    List<PlantResponse> getAll();

    PlantResponse getById(Long id);

    void update(Long id, UpdatePlantRequest request);

    void delete(Long id);

}