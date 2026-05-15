package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Area.CreateAreaRequest;
import com.supertech.superbatch.plant.dto.Area.UpdateAreaRequest;
import com.supertech.superbatch.plant.entity.Area;

public interface AreaService {
    Area create(CreateAreaRequest request);

    List<Area> getAll();

    Area getById(Long id);

    List<Area> getByPlantId(Long plantId);

    Area update(Long id, UpdateAreaRequest request);

    void delete(Long id);
}
