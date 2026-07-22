package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;

@Component
public class ControlRecipeSOPParameterMapper {

    public ControlRecipeSOPParameterResponse toResponse(ControlRecipeSOPParameter controlRecipeSOPParameter) {
        return ControlRecipeSOPParameterResponse.builder()
                .id(controlRecipeSOPParameter.getId())
                .parameterId(controlRecipeSOPParameter.getParameter().getId())
                .parameterName(controlRecipeSOPParameter.getParameter().getName())
                .stdValue(controlRecipeSOPParameter.getStdValue())
                .build();
    }

    public List<ControlRecipeSOPParameterResponse> toResponseList(
            Set<ControlRecipeSOPParameter> controlRecipeSOPParameters) {
        return controlRecipeSOPParameters.stream().map(this::toResponse).toList();
    }

    public ControlRecipeSOPParameter toEntity(ControlRecipeSOP controlRecipeSOP, Parameter parameter,
            ControlRecipeSOPParameterRequest request) {
        return ControlRecipeSOPParameter.builder()
                .controlRecipeSOP(controlRecipeSOP)
                .parameter(parameter)
                .stdValue(request.stdValue())
                .build();
    }

    public ControlRecipeSOPParameter toEntity(ControlRecipeSOP controlRecipeSOP,
            RecipeSOPParameter recipeSOPParameter) {
        return ControlRecipeSOPParameter.builder()
                .controlRecipeSOP(controlRecipeSOP)
                .parameter(recipeSOPParameter.getParameter())
                .stdValue(recipeSOPParameter.getStdValue())
                .build();
    }

}
