package com.supertech.superbatch.scheduler.control_recipe_sop.mapper;

import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPAudit;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPEquipmentResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPResponse;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.CreateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.UpdateControlRecipeSOPRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.entity.ControlRecipeSOP;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.entity.ControlRecipeSOPMaterial;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.mapper.ControlRecipeSOPMaterialMapper;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterRequest;
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
                                .fromEquipment(toResponse(controlRecipeSOP.getFromEquipment()))
                                .toEquipment(toResponse(controlRecipeSOP.getToEquipment()))
                                .materials(controlRecipeSOPMaterialMapper.toResponseList(materials))
                                .parameters(controlRecipeSOPParameterMapper.toResponseList(parameters))
                                .build();
        }

        public ControlRecipeSOP toEntity(CreateControlRecipeSOPRequest request, Integer stepNo,
                        ControlRecipe controlRecipe,
                        Action action, Transition transition, Equipment fromEquipment, Equipment toEquipment,
                        Map<Long, Material> materialMap,
                        Map<Long, Parameter> parameterMap) {
                ControlRecipeSOP controlRecipeSOP = ControlRecipeSOP.builder()
                                .controlRecipe(controlRecipe)
                                .stepNo(stepNo)
                                .message(request.message())
                                .stdTime(request.stdTime())
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();

                // build materials
                if (request.materials() != null) {
                        for (ControlRecipeSOPMaterialRequest rm : request.materials()) {
                                Material material = materialMap.get(rm.materialId());
                                if (material == null) {
                                        throw new ResourceNotFoundException("Material not found.");
                                }
                                controlRecipeSOP.getMaterials().add(controlRecipeSOPMaterialMapper
                                                .toEntity(controlRecipeSOP, material, rm));
                        }
                }

                // build parameters
                if (request.parameters() != null) {
                        for (ControlRecipeSOPParameterRequest rp : request.parameters()) {
                                Parameter parameter = parameterMap.get(rp.parameterId());
                                if (parameter == null) {
                                        throw new ResourceNotFoundException("Parameter not found.");
                                }
                                controlRecipeSOP.getParameters()
                                                .add(controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP,
                                                                parameter, rp));
                        }
                }
                return controlRecipeSOP;
        }

        public void updateEntity(UpdateControlRecipeSOPRequest request,
                        ControlRecipeSOP controlRecipeSOP, Action action,
                        Transition transition,
                        Equipment fromEquipment, Equipment toEquipment,
                        Map<Long, Material> materialMap,
                        Map<Long, Parameter> parameterMap) {

                controlRecipeSOP.setAction(action);
                controlRecipeSOP.setTransition(transition);
                controlRecipeSOP.setMessage(request.message());
                controlRecipeSOP.setStdTime(request.stdTime());
                controlRecipeSOP.setFromEquipment(fromEquipment);
                controlRecipeSOP.setToEquipment(toEquipment);

                controlRecipeSOP.getMaterials().clear();
                controlRecipeSOP.getParameters().clear();

                // build materials
                if (request.materials() != null) {
                        for (ControlRecipeSOPMaterialRequest rm : request.materials()) {
                                Material material = materialMap.get(rm.materialId());
                                if (material == null) {
                                        throw new ResourceNotFoundException("Material not found.");
                                }
                                controlRecipeSOP.getMaterials().add(controlRecipeSOPMaterialMapper
                                                .toEntity(controlRecipeSOP, material, rm));
                        }
                }

                // build parameters
                if (request.parameters() != null) {
                        for (ControlRecipeSOPParameterRequest rp : request.parameters()) {
                                Parameter parameter = parameterMap.get(rp.parameterId());
                                if (parameter == null) {
                                        throw new ResourceNotFoundException("Parameter not found.");
                                }
                                controlRecipeSOP.getParameters()
                                                .add(controlRecipeSOPParameterMapper.toEntity(controlRecipeSOP,
                                                                parameter, rp));
                        }
                }
        }

        public ControlRecipeSOP toEntity(RecipeSOP recipeSOP, ControlRecipe controlRecipe,
                        Map<Long, Long> equipmentMapping, Map<Long, Equipment> equipments) {

                Equipment fromEquipment = recipeSOP.getFromEquipment();
                if (!equipmentMapping.isEmpty() && recipeSOP.getFromEquipment() != null) {
                        fromEquipment = equipments
                                        .get(equipmentMapping.get(recipeSOP.getFromEquipment().getId()));
                }

                Equipment toEquipment = recipeSOP.getToEquipment();
                if (!equipmentMapping.isEmpty() && recipeSOP.getToEquipment() != null) {
                        toEquipment = equipments.get(equipmentMapping.get(recipeSOP.getToEquipment().getId()));
                }

                ControlRecipeSOP controlRecipeSOP = ControlRecipeSOP.builder()
                                .controlRecipe(controlRecipe)
                                .stepNo(recipeSOP.getStepNo())
                                .message(recipeSOP.getMessage())
                                .stdTime(recipeSOP.getStdTime())
                                .action(recipeSOP.getAction())
                                .transition(recipeSOP.getTransition())
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();

                return controlRecipeSOP;
        }

        private ControlRecipeSOPEquipmentResponse toResponse(Equipment equipment) {
                if (equipment == null) {
                        return null;
                }
                return ControlRecipeSOPEquipmentResponse.builder()
                                .id(equipment.getId())
                                .name(equipment.getName())
                                .code(equipment.getCode())
                                .build();
        }

        public ControlRecipeSOPAudit copy(ControlRecipeSOP controlRecipeSOP) {
                return ControlRecipeSOPAudit.builder()
                                .id(controlRecipeSOP.getId())
                                .stepNo(controlRecipeSOP.getStepNo())
                                .stdTime(controlRecipeSOP.getStdTime())
                                .controlRecipe(controlRecipeSOP.getControlRecipe().getName())
                                .transition(controlRecipeSOP.getTransition().getName())
                                .action(controlRecipeSOP.getAction().getName())
                                .message(controlRecipeSOP.getMessage())
                                .fromEquipment(controlRecipeSOP.getFromEquipment() != null
                                                ? controlRecipeSOP.getFromEquipment().getName()
                                                : null)
                                .toEquipment(controlRecipeSOP.getToEquipment() != null
                                                ? controlRecipeSOP.getToEquipment().getName()
                                                : null)
                                .materials(controlRecipeSOP.getMaterials().stream()
                                                .map(controlRecipeSOPMaterialMapper::copy).toList())
                                .parameters(controlRecipeSOP.getParameters().stream()
                                                .map(controlRecipeSOPParameterMapper::copy).toList())
                                .build();
        }

}
