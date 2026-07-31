package com.supertech.superbatch.scheduler.control_recipe_sop.helper;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlRecipeSOPLookupService {
    private final MaterialRepository materialRepository;
    private final ParameterRepository parameterRepository;

    public Map<Long, Material> getMaterialMap(List<ControlRecipeSOPMaterialRequest> materials) {
        if (materials == null || materials.isEmpty()) {
            return Map.of();
        }

        return materialRepository.findAllById(
                materials.stream()
                        .map(ControlRecipeSOPMaterialRequest::materialId)
                        .toList())
                .stream()
                .collect(Collectors.toMap(Material::getId, Function.identity()));
    }

    public Map<Long, Parameter> getParameterMap(List<ControlRecipeSOPParameterRequest> parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return Map.of();
        }

        return parameterRepository.findAllById(
                parameters.stream()
                        .map(ControlRecipeSOPParameterRequest::parameterId)
                        .toList())
                .stream()
                .collect(Collectors.toMap(Parameter::getId, Function.identity()));
    }
}