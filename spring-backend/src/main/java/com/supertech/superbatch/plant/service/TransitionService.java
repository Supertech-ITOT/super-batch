package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Transition.CreateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.UpdateTransitionRequest;
import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;

public interface TransitionService {

    void create(CreateTransitionRequest request);

    void update(Long id, UpdateTransitionRequest request);

    void delete(Long id);

    List<TransitionResponse> getAll();

    TransitionResponse getById(Long id);

}