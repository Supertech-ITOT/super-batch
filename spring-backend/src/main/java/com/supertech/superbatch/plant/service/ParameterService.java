package com.supertech.superbatch.plant.service;

import java.util.List;

import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;

public interface ParameterService {

    void create(CreateParameterRequest request);

    void update(Long id, UpdateParameterRequest request);

    void delete(Long id);

    List<ParameterResponse> getAll();

    ParameterResponse getById(Long id);
}
