package com.supertech.superbatch.recipe.recipe_sop_parameter.mapper;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterResponse;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;

@Component
public class RecipeSOPParameterMapper {

    public RecipeSOPParameterResponse toResponse(RecipeSOPParameter recipeSOPParameter) {
        return RecipeSOPParameterResponse.builder()
                .id(recipeSOPParameter.getId())
                .parameterId(recipeSOPParameter.getParameter().getId())
                .parameterName(recipeSOPParameter.getParameter().getName())
                .stdValue(recipeSOPParameter.getStdValue())
                .build();
    }

    public List<RecipeSOPParameterResponse> toResponseList(Set<RecipeSOPParameter> recipeSOPParameters) {
        return recipeSOPParameters.stream().map(this::toResponse).toList();
    }

    public RecipeSOPParameter toEntity(RecipeSOP recipeSOP, Parameter parameter, RecipeSOPParameterRequest request) {
        return RecipeSOPParameter.builder()
                .recipeSOP(recipeSOP)
                .parameter(parameter)
                .stdValue(request.stdValue())
                .build();
    }
}