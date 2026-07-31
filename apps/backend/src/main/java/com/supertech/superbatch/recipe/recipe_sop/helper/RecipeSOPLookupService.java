package com.supertech.superbatch.recipe.recipe_sop.helper;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.material.repository.MaterialRepository;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RecipeSOPLookupService {
    private final MaterialRepository materialRepository;
    private final ParameterRepository parameterRepository;

    public Map<Long, Material> getMaterialMap(List<RecipeSOPMaterialRequest> materials) {
        if (materials == null || materials.isEmpty()) {
            return Map.of();
        }

        return materialRepository.findAllById(
                materials.stream()
                        .map(RecipeSOPMaterialRequest::materialId)
                        .toList())
                .stream()
                .collect(Collectors.toMap(Material::getId, Function.identity()));
    }

    public Map<Long, Parameter> getParameterMap(List<RecipeSOPParameterRequest> parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return Map.of();
        }

        return parameterRepository.findAllById(
                parameters.stream()
                        .map(RecipeSOPParameterRequest::parameterId)
                        .toList())
                .stream()
                .collect(Collectors.toMap(Parameter::getId, Function.identity()));
    }
}