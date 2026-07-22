package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper.ControlRecipeSOPParameterMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.repository.ControlRecipeSOPParameterRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.service.ControlRecipeSOPParameterService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ControlRecipeSOPParameterServiceImpl implements ControlRecipeSOPParameterService {
    private final ControlRecipeSOPParameterRepository controlRecipeSOPParameterRepository;
    private final ParameterRepository parameterRepository;
    private final ControlRecipeSOPParameterMapper controlRecipeSOPParameterMapper;

    @Override
    public void create(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPParameterRequest> parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return;
        }
        List<ControlRecipeSOPParameter> controlRecipeSOPParameters = parameters.stream()
                .map(request -> {
                    Parameter parameter = parameterRepository.findById(request.parameterId())
                            .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
                    return controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP, parameter, request);
                })
                .toList();
        controlRecipeSOPParameterRepository.saveAll(controlRecipeSOPParameters);
    }

    @Override
    public void update(ControlRecipeSOP controlRecipeSOP, List<ControlRecipeSOPParameterRequest> parameters) {
        deleteByControlRecipeSOP(controlRecipeSOP);
        create(controlRecipeSOP, parameters);
    }

    @Override
    public void deleteByControlRecipeSOP(ControlRecipeSOP controlRecipeSOP) {
        controlRecipeSOPParameterRepository.deleteAllByControlRecipeSOP(controlRecipeSOP);
    }

}
