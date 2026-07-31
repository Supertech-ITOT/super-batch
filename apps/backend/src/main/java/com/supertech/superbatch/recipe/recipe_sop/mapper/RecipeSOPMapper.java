package com.supertech.superbatch.recipe.recipe_sop.mapper;

import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.material.entity.Material;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPAudit;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPEquipmentResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_material.mapper.RecipeSOPMaterialMapper;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterRequest;
import com.supertech.superbatch.recipe.recipe_sop_parameter.entity.RecipeSOPParameter;
import com.supertech.superbatch.recipe.recipe_sop_parameter.mapper.RecipeSOPParameterMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RecipeSOPMapper {
    private final RecipeSOPMaterialMapper recipeSOPMaterialMapper;
    private final RecipeSOPParameterMapper recipeSOPParameterMapper;

    public RecipeSOPResponse toResponse(RecipeSOP recipeSOP, Set<RecipeSOPMaterial> materials,
            Set<RecipeSOPParameter> parameters) {
        return RecipeSOPResponse.builder()
                .id(recipeSOP.getId())
                .recipeId(recipeSOP.getRecipe().getId())
                .stepNo(recipeSOP.getStepNo())
                .stdTime(recipeSOP.getStdTime())
                .message(recipeSOP.getMessage())
                .transitionId(recipeSOP.getTransition().getId())
                .transitionName(recipeSOP.getTransition().getName())
                .actionId(recipeSOP.getAction().getId())
                .actionName(recipeSOP.getAction().getName())
                .fromEquipment(toResponse(recipeSOP.getFromEquipment()))
                .toEquipment(toResponse(recipeSOP.getToEquipment()))
                .materials(recipeSOPMaterialMapper.toResponseList(materials))
                .parameters(recipeSOPParameterMapper.toResponseList(parameters))
                .build();
    }

    public RecipeSOP toEntity(CreateRecipeSOPRequest request, Integer stepNo, Recipe recipe, Action action,
            Transition transition, Equipment fromEquipment, Equipment toEquipment,
            Map<Long, Material> materialMap,
            Map<Long, Parameter> parameterMap) {

        RecipeSOP recipeSOP = RecipeSOP.builder()
                .recipe(recipe)
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
            for (RecipeSOPMaterialRequest rm : request.materials()) {
                Material material = materialMap.get(rm.materialId());
                if (material == null) {
                    throw new ResourceNotFoundException("Material not found.");
                }
                recipeSOP.getMaterials().add(recipeSOPMaterialMapper.toEntity(recipeSOP, material, rm));
            }
        }

        // build parameters
        if (request.parameters() != null) {
            for (RecipeSOPParameterRequest rp : request.parameters()) {
                Parameter parameter = parameterMap.get(rp.parameterId());
                if (parameter == null) {
                    throw new ResourceNotFoundException("Parameter not found.");
                }
                recipeSOP.getParameters().add(recipeSOPParameterMapper.toEntity(recipeSOP, parameter, rp));
            }
        }

        return recipeSOP;
    }

    public void updateEntity(UpdateRecipeSOPRequest request, RecipeSOP recipeSOP, Action action, Transition transition,
            Equipment fromEquipment, Equipment toEquipment, Map<Long, Material> materialMap,
            Map<Long, Parameter> parameterMap) {
        recipeSOP.setAction(action);
        recipeSOP.setTransition(transition);
        recipeSOP.setMessage(request.message());
        recipeSOP.setStdTime(request.stdTime());
        recipeSOP.setFromEquipment(fromEquipment);
        recipeSOP.setToEquipment(toEquipment);

        recipeSOP.getMaterials().clear();
        recipeSOP.getParameters().clear();

        // build materials
        if (request.materials() != null) {
            for (RecipeSOPMaterialRequest rm : request.materials()) {
                Material material = materialMap.get(rm.materialId());
                if (material == null) {
                    throw new ResourceNotFoundException("Material not found.");
                }
                recipeSOP.getMaterials().add(recipeSOPMaterialMapper.toEntity(recipeSOP, material, rm));
            }
        }

        // build parameters
        if (request.parameters() != null) {
            for (RecipeSOPParameterRequest rp : request.parameters()) {
                Parameter parameter = parameterMap.get(rp.parameterId());
                if (parameter == null) {
                    throw new ResourceNotFoundException("Parameter not found.");
                }
                recipeSOP.getParameters().add(recipeSOPParameterMapper.toEntity(recipeSOP, parameter, rp));
            }
        }
    }

    public RecipeSOPAudit copy(RecipeSOP recipeSOP) {
        return RecipeSOPAudit.builder()
                .id(recipeSOP.getId())
                .stepNo(recipeSOP.getStepNo())
                .stdTime(recipeSOP.getStdTime())
                .recipe(recipeSOP.getRecipe().getName())
                .transition(recipeSOP.getTransition().getName())
                .action(recipeSOP.getAction().getName())
                .message(recipeSOP.getMessage())
                .fromEquipment(recipeSOP.getFromEquipment() != null ? recipeSOP.getFromEquipment().getName() : null)
                .toEquipment(recipeSOP.getToEquipment() != null ? recipeSOP.getToEquipment().getName() : null)
                .materials(recipeSOP.getMaterials().stream().map(recipeSOPMaterialMapper::copy).toList())
                .parameters(recipeSOP.getParameters().stream().map(recipeSOPParameterMapper::copy).toList())
                .build();
    }

    private RecipeSOPEquipmentResponse toResponse(Equipment equipment) {
        if (equipment == null) {
            return null;
        }
        return RecipeSOPEquipmentResponse.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .code(equipment.getCode())
                .build();
    }
}
