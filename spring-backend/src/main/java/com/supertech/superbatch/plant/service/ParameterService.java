package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;

public interface ParameterService {
    void create(CreateParameterRequest request);

    List<ParameterResponse> getAll();

    ParameterResponse getById(Long id);

    void update(Long id, UpdateParameterRequest request);

    void delete(Long id);
}
