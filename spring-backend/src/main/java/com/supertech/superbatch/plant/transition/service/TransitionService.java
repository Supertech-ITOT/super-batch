package com.supertech.superbatch.plant.transition.service;

import java.util.List;

import com.supertech.superbatch.plant.transition.dto.CreateTransitionRequest;
import com.supertech.superbatch.plant.transition.dto.TransitionResponse;
import com.supertech.superbatch.plant.transition.dto.UpdateTransitionRequest;

public interface TransitionService {

    void create(CreateTransitionRequest request);

    void update(Long id, UpdateTransitionRequest request);

    void delete(Long id);

    List<TransitionResponse> getAll();

    TransitionResponse getById(Long id);

}