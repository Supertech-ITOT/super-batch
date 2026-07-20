package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto;

public record ControlRecipeSOPParameterResponse(
        Long id,
        Long parameterId,
        String parameterName,
        Double stdValue) {

}
