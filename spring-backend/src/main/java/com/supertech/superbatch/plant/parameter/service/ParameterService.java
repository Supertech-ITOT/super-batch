package com.supertech.superbatch.plant.parameter.service;

import java.util.List;

import com.supertech.superbatch.plant.parameter.dto.CreateParameterRequest;
import com.supertech.superbatch.plant.parameter.dto.ParameterResponse;
import com.supertech.superbatch.plant.parameter.dto.UpdateParameterRequest;

public interface ParameterService {

    void create(CreateParameterRequest request);

    void update(Long id, UpdateParameterRequest request);

    void delete(Long id);

    List<ParameterResponse> getAll();

    ParameterResponse getById(Long id);
}
