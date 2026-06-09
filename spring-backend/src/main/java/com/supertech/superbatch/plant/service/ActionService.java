package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Action.ActionResponse;
import com.supertech.superbatch.plant.dto.Action.CreateActionRequest;
import com.supertech.superbatch.plant.dto.Action.UpdateActionRequest;

public interface ActionService {
    void create(CreateActionRequest request);

    void update(Long id, UpdateActionRequest request);

    void delete(Long id);

    List<ActionResponse> getAll();

    ActionResponse getById(Long id);

}
