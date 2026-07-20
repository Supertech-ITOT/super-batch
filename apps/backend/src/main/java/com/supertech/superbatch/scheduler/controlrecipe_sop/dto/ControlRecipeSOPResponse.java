package com.supertech.superbatch.scheduler.controlrecipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterResponse;

import lombok.Builder;

@Builder
public record ControlRecipeSOPResponse(
                Long id,
                Long controlRecipeId,
                Integer stepNo,
                String message,
                Double stdTime,
                Long transitionId,
                String transitionName,
                Long actionId,
                String actionName,
                Long fromEquipmentId,
                String fromEquipmentName,
                Long toEquipmentId,
                String toEquipmentName,
                List<ControlRecipeSOPMaterialResponse> materials,
                List<ControlRecipeSOPParameterResponse> parameters) {

}
