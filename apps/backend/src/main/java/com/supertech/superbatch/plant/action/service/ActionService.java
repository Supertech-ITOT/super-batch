package com.supertech.superbatch.plant.action.service;

import java.util.List;

import com.supertech.superbatch.plant.action.dto.ActionResponse;
import com.supertech.superbatch.plant.action.dto.CreateActionRequest;
import com.supertech.superbatch.plant.action.dto.UpdateActionRequest;

public interface ActionService {
    void create(CreateActionRequest request);

    void update(Long id, UpdateActionRequest request);

    void delete(Long id);

    List<ActionResponse> getAll();

    ActionResponse getById(Long id);

}
