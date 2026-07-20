package com.supertech.superbatch.scheduler.controlrecipe_sop.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterResponse;
import com.supertech.superbatch.scheduler.controlrecipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.controlrecipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.controlrecipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.controlrecipe_sop.entity.ControlRecipeSOP;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlRecipeSOPMapper {

        public ControlRecipeSOPResponse toResponse(ControlRecipeSOP controlRecipeSOP,
                        List<ControlRecipeSOPMaterialResponse> materials,
                        List<ControlRecipeSOPParameterResponse> parameters) {
                return ControlRecipeSOPResponse.builder()
                                .id(controlRecipeSOP.getId())
                                .controlRecipeId(controlRecipeSOP.getControlRecipe().getId())
                                .stepNo(controlRecipeSOP.getStepNo())
                                .stdTime(controlRecipeSOP.getStdTime())
                                .message(controlRecipeSOP.getMessage())
                                .transitionId(controlRecipeSOP.getTransition().getId())
                                .transitionName(controlRecipeSOP.getTransition().getName())
                                .actionId(controlRecipeSOP.getAction().getId())
                                .actionName(controlRecipeSOP.getAction().getName())
                                .fromEquipmentId(controlRecipeSOP.getFromEquipment() != null
                                                ? controlRecipeSOP.getFromEquipment().getId()
                                                : null)
                                .fromEquipmentName(controlRecipeSOP.getFromEquipment() != null
                                                ? controlRecipeSOP.getFromEquipment().getName()
                                                : null)
                                .toEquipmentId(controlRecipeSOP.getToEquipment().getId())
                                .toEquipmentName(controlRecipeSOP.getToEquipment().getName())
                                .materials(materials)
                                .parameters(parameters)
                                .build();
        }

        public ControlRecipeSOP toEntity(CreateControlRecipeSOPRequest request, Integer stepNo,
                        ControlRecipe controlRecipe,
                        Action action, Transition transition, Equipment fromEquipment, Equipment toEquipment) {
                return ControlRecipeSOP.builder()
                                .controlRecipe(controlRecipe)
                                .stepNo(stepNo)
                                .message(request.message())
                                .stdTime(request.stdTime())
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }

        public void updateEntity(UpdateControlRecipeSOPRequest request,
                        ControlRecipeSOP controlRecipeSOP, Action action,
                        Transition transition,
                        Equipment fromEquipment, Equipment toEquipment) {
                controlRecipeSOP.setAction(action);
                controlRecipeSOP.setTransition(transition);
                controlRecipeSOP.setMessage(request.message());
                controlRecipeSOP.setStdTime(request.stdTime());
                controlRecipeSOP.setFromEquipment(fromEquipment);
                controlRecipeSOP.setToEquipment(toEquipment);
        }

}
