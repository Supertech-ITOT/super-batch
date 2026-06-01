package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Action.ActionResponse;

public interface ActionService {

    List<ActionResponse> getAll();

    ActionResponse getById(Long id);

}
