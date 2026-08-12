package com.supertech.superbatch.plant.parameter.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.plant.parameter.dto.CreateParameterRequest;
import com.supertech.superbatch.plant.parameter.dto.ParameterResponse;
import com.supertech.superbatch.plant.parameter.dto.UpdateParameterRequest;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.mapper.ParameterMapper;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.plant.parameter.service.ParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ParameterServiceImpl implements ParameterService {
    private final ParameterRepository parameterRepository;
    private final ParameterMapper parameterMapper;
    private final UserRepository userRepository;

    @Override
    public List<ParameterResponse> getAll() {
        return parameterRepository.findAllByDeletedFalse(Sort.by(Sort.Direction.ASC, "id")).stream()
                .map(parameterMapper::toResponse)
                .toList();
    }

    @Override
    public ParameterResponse getById(Long id) {
        Parameter parameter = parameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
        return parameterMapper.toResponse(parameter);
    }

    @Override
    @Transactional
    public void create(CreateParameterRequest request) {

        if (parameterRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())) {
            throw new DuplicateResourceException("Parameter name already exists");
        }

        Parameter parameter = parameterMapper.toEntity(request);
        parameterRepository.save(parameter);
    }

    @Override
    @Transactional
    public void update(Long id, UpdateParameterRequest request) {
        Parameter parameter = parameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found"));

        if (parameterRepository.existsByNameIgnoreCaseAndDeletedFalse(request.name())
                && !parameter.getName().equalsIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Parameter name already exists");
        }

        parameterMapper.updateEntity(parameter, request);
        parameterRepository.save(parameter);
    }

    @Override
    @Transactional
    public void delete(Long id, Long currentUserId) {
        Parameter parameter = parameterRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
        User deletedBy = userRepository.findByIdAndDeletedFalse(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found."));
        parameter.setDeleted(true);
        parameter.setDeletedAt(LocalDateTime.now());
        parameter.setDeletedBy(deletedBy);
    }

}
