package com.supertech.superbatch.scheduler.control_recipe_sop.mapper;

import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.entity.ControlRecipeSOPParameter;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.mapper.ControlRecipeSOPParameterMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlRecipeSOPMapper {
        private final ControlRecipeSOPMaterialMapper controlRecipeSOPMaterialMapper;
        private final ControlRecipeSOPParameterMapper controlRecipeSOPParameterMapper;

        public ControlRecipeSOPResponse toResponse(ControlRecipeSOP controlRecipeSOP,
                        Set<ControlRecipeSOPMaterial> materials,
                        Set<ControlRecipeSOPParameter> parameters) {
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
                                .materials(controlRecipeSOPMaterialMapper.toResponseList(materials))
                                .parameters(controlRecipeSOPParameterMapper.toResponseList(parameters))
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

        public ControlRecipeSOP toEntity(RecipeSOP recipeSOP, ControlRecipe controlRecipe) {
                return ControlRecipeSOP.builder()
                                .controlRecipe(controlRecipe)
                                .stepNo(recipeSOP.getStepNo())
                                .message(recipeSOP.getMessage())
                                .stdTime(recipeSOP.getStdTime())
                                .action(recipeSOP.getAction())
                                .transition(recipeSOP.getTransition())
                                .fromEquipment(recipeSOP.getFromEquipment())
                                .toEquipment(recipeSOP.getToEquipment())
                                .build();
        }

}
