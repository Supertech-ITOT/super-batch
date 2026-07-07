package com.supertech.superbatch.recipe.recipe_parameter.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.parameter.repository.ParameterRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterResponse;
import com.supertech.superbatch.recipe.recipe_parameter.entity.RecipeParameter;
import com.supertech.superbatch.recipe.recipe_parameter.mapper.RecipeParameterMapper;
import com.supertech.superbatch.recipe.recipe_parameter.repository.RecipeParameterRepository;
import com.supertech.superbatch.recipe.recipe_parameter.service.RecipeParameterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeParameterServiceImpl implements RecipeParameterService {
    private final RecipeParameterRepository recipeParameterRepository;
    private final ParameterRepository parameterRepository;
    private final RecipeParameterMapper recipeParameterMapper;

    @Override
    public List<RecipeParameterResponse> getAllByRecipe(Recipe recipe) {
        List<RecipeParameter> recipeParameters = recipeParameterRepository.findAllByRecipe(recipe);
        return recipeParameterMapper.toResponseList(recipeParameters);
    }

    @Override
    public void create(Recipe recipe, List<RecipeParameterRequest> parameters) {
        if (parameters == null || parameters.isEmpty()) {
            return;
        }
        List<RecipeParameter> recipeParameters = parameters.stream()
                .map(request -> {
                    Parameter parameter = parameterRepository.findById(request.parameterId())
                            .orElseThrow(() -> new ResourceNotFoundException("Parameter not found."));
                    return recipeParameterMapper.toEntity(recipe, parameter, request);
                })
                .toList();
        recipeParameterRepository.saveAll(recipeParameters);
    }

    @Override
    public void update(Recipe recipe, List<RecipeParameterRequest> parameters) {
        deleteByRecipe(recipe);
        create(recipe, parameters);
    }

    @Override
    public void deleteByRecipe(Recipe recipe) {
        recipeParameterRepository.deleteAllByRecipe(recipe);
    }
}