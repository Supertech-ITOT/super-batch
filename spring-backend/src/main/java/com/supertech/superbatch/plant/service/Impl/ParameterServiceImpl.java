package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Parameter.ParameterResponse;
import com.supertech.superbatch.plant.entity.ParameterMaster;
import com.supertech.superbatch.plant.mapper.ParameterMapper;
import com.supertech.superbatch.plant.repository.ParameterRepository;
import com.supertech.superbatch.plant.service.ParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParameterServiceImpl implements ParameterService {
    private final ParameterRepository parameterRepository;
    private final ParameterMapper parameterMapper;

    @Override
    public List<ParameterResponse> getAll() {
        return parameterRepository.findAll().stream().map(parameterMapper::toResponse).toList();
    }

    @Override
    public ParameterResponse getById(Long id) {
        ParameterMaster parameter = parameterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
        return parameterMapper.toResponse(parameter);
    }

}
