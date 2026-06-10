package com.supertech.superbatch.plant.service.Impl;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.dto.Parameter.CreateParameterRequest;
import com.supertech.superbatch.plant.dto.Parameter.UpdateParameterRequest;
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
        return parameterRepository.findAll(Sort.by(Sort.Direction.ASC, "id")).stream().map(parameterMapper::toResponse)
                .toList();
    }

    @Override
    public ParameterResponse getById(Long id) {
        ParameterMaster parameter = parameterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
        return parameterMapper.toResponse(parameter);
    }

    @Override
    public void create(CreateParameterRequest request) {
        if (parameterRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Parameter id already exists");
        }
        if (parameterRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Parameter name already exists");
        }
        if (parameterRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Parameter code already exists");
        }
        ParameterMaster parameterMaster = parameterMapper.toEntity(request);
        parameterRepository.save(parameterMaster);
    }

    @Override
    public void update(Long id, UpdateParameterRequest request) {
        ParameterMaster parameterMaster = parameterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found"));
        if (!parameterMaster.getId().equals(request.id())
                && parameterRepository.existsById(request.id())) {
            throw new DuplicateResourceException("Parameter id already exists");
        }
        if (parameterRepository.existsByNameIgnoreCase(request.name())
                && !parameterMaster.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Parameter name already exists");
        }

        if (parameterRepository.existsByCodeIgnoreCase(request.code())
                && !parameterMaster.getCode().equalsIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Parameter code already exists");
        }
        parameterMapper.updateEntity(parameterMaster, request);
        parameterRepository.save(parameterMaster);
    }

    @Override
    public void delete(Long id) {
        ParameterMaster parameterMaster = parameterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
        parameterRepository.delete(parameterMaster);
    }

}
