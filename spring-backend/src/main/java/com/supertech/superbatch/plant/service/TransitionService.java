package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Transition.TransitionResponse;

public interface TransitionService {
    List<TransitionResponse> getAll();

    TransitionResponse getById(Long id);

}