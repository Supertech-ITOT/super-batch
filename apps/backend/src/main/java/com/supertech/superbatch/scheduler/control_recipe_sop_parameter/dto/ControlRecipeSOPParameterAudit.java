package com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto;

import lombok.Builder;

@Builder
public record ControlRecipeSOPParameterAudit(
                Long id,
                String name,
                Double stdValue) {

}
