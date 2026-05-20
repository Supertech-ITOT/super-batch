package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Area.AreaResponse;
import com.supertech.superbatch.plant.dto.Area.CreateAreaRequest;
import com.supertech.superbatch.plant.dto.Area.UpdateAreaRequest;

public interface AreaService {
    void create(CreateAreaRequest request);

    List<AreaResponse> getAll();

    AreaResponse getById(Long id);

    List<AreaResponse> getByPlantId(Long plantId);

    void update(Long id, UpdateAreaRequest request);

    void delete(Long id);
}
