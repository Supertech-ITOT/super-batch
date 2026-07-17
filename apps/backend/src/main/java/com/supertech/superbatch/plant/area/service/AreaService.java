package com.supertech.superbatch.plant.area.service;

import java.util.List;

import com.supertech.superbatch.plant.area.dto.AreaResponse;
import com.supertech.superbatch.plant.area.dto.CreateAreaRequest;
import com.supertech.superbatch.plant.area.dto.UpdateAreaRequest;

public interface AreaService {
    void create(CreateAreaRequest request);

    List<AreaResponse> getAll();

    AreaResponse getById(Long id);

    List<AreaResponse> getByPlantId(Long plantId);

    void update(Long id, UpdateAreaRequest request);

    void delete(Long id);
}
