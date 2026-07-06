package com.supertech.superbatch.recipe.recipe_parameter.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterRequest;
import com.supertech.superbatch.recipe.recipe_parameter.dto.RecipeParameterResponse;
import com.supertech.superbatch.recipe.recipe_parameter.entity.RecipeParameter;

@Component
public class RecipeParameterMapper {

    public RecipeParameterResponse toResponse(RecipeParameter recipeParameter) {
        return RecipeParameterResponse.builder()
                .id(recipeParameter.getId())
                .parameterId(recipeParameter.getParameter().getId())
                .parameterName(recipeParameter.getParameter().getName())
                .stdValue(recipeParameter.getStdValue())
                .build();
    }

    public List<RecipeParameterResponse> toResponseList(List<RecipeParameter> recipeParameters) {
        return recipeParameters.stream().map(this::toResponse).toList();
    }

    public RecipeParameter toEntity(Recipe recipe, Parameter parameter, RecipeParameterRequest request) {
        return RecipeParameter.builder()
                .recipe(recipe)
                .parameter(parameter)
                .stdValue(request.stdValue())
                .build();
    }
}