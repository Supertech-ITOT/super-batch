package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;

public interface ParameterService {

    List<ParameterResponse> getAll();

    ParameterResponse getById(Long id);
}
