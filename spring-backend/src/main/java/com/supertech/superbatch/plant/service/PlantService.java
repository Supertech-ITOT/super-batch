package com.supertech.superbatch.plant.service;

import com.supertech.superbatch.plant.dto.Plant.CreatePlantRequest;
import com.supertech.superbatch.plant.dto.Plant.UpdatePlantRequest;
import com.supertech.superbatch.plant.entity.Plant;

import java.util.List;

public interface PlantService {

    Plant create(CreatePlantRequest request);

    List<Plant> getAll();

    Plant getById(Long id);

    Plant update(Long id, UpdatePlantRequest request);

    void delete(Long id);

}