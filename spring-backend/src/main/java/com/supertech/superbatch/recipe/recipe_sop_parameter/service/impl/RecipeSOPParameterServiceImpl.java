package com.supertech.superbatch.recipe.recipe_sop_parameter.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterResponse;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;
import com.supertech.superbatch.recipe.recipe_sop_parameter.mapper.RecipeSOPParameterMapper;
import com.supertech.superbatch.recipe.recipe_sop_parameter.repository.RecipeSOPParameterRepository;
import com.supertech.superbatch.recipe.recipe_sop_parameter.service.RecipeSOPParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeSOPParameterServiceImpl implements RecipeSOPParameterService {
    private final RecipeSOPParameterRepository recipeSOPParameterRepository;
    private final ParameterRepository parameterRepository;
    private final RecipeSOPParameterMapper recipeSOPParameterMapper;

    @Override
    public List<RecipeSOPParameterResponse> getAllByRecipe(RecipeSOP recipeSOP) {
        List<RecipeSOPParameter> recipeSOPParameters = recipeSOPParameterRepository.findAllByRecipeSOP(recipeSOP);
        return recipeSOPParameterMapper.toResponseList(recipeSOPParameters);
    }

    @Override
    public void create(RecipeSOP recipeSOP, List<RecipeSOPParameterRequest> parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return;
        }
        List<RecipeSOPParameter> recipeSOPParameters = parameters.stream()
                .map(request -> {
                    Parameter parameter = parameterRepository.findById(request.parameterId())
                            .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
                    return recipeSOPParameterMapper.toEntity(recipeSOP, parameter, request);
                })
                .toList();
        recipeSOPParameterRepository.saveAll(recipeSOPParameters);
    }

    @Override
    public void update(RecipeSOP recipeSOP, List<RecipeSOPParameterRequest> parameters) {
        deleteByRecipeSOP(recipeSOP);
        create(recipeSOP, parameters);
    }

    @Override
    public void deleteByRecipeSOP(RecipeSOP recipeSOP) {
        recipeSOPParameterRepository.deleteAllByRecipeSOP(recipeSOP);
    }
}