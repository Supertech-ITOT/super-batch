package com.supertech.superbatch.recipe.recipe_parameter.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;
import com.supertech.superbatch.recipe.recipe_parameter.entity.RecipeParameter;

@Component
public class RecipeParameterMapper {
    public RecipeParameter toEntity(Recipe recipe, Parameter parameter, RecipeParameterRequest request) {
        return RecipeParameter.builder()
                .recipe(recipe)
                .parameter(parameter)
                .stdValue(request.stdValue())
                .build();
    }
}