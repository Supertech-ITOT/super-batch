package com.supertech.superbatch.scheduler.controlrecipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateControlRecipeSOPRequest(
                @NotNull(message = "Control Recipe is required.") Long controlRecipeId,
                @NotBlank(message = "Message is required.") String message,
                @NotNull(message = "Standard time is required.") Double stdTime,
                @NotNull(message = "Transition is required.") Long transitionId,
                @NotNull(message = "Action is required.") Long actionId,
                Long fromEquipmentId,
                @NotNull(message = "To Equipment is required.") Long toEquipmentId,
                List<ControlRecipeSOPMaterialRequest> materials,
                List<ControlRecipeSOPParameterRequest> parameters) {

}
