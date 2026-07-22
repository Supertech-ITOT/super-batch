package com.supertech.superbatch.recipe.recipe_sop.mapper;

import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_sop.dto.CreateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPResponse;
import com.supertech.superbatch.recipe.recipe_sop.dto.UpdateRecipeSOPRequest;
import com.supertech.superbatch.recipe.recipe_sop.entity.RecipeSOP;
import com.supertech.superbatch.recipe.recipe_sop_material.enitiy.RecipeSOPMaterial;
import com.supertech.superbatch.recipe.recipe_sop_material.mapper.RecipeSOPMaterialMapper;
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
                .fromEquipmentId(recipeSOP.getFromEquipment() != null ? recipeSOP.getFromEquipment().getId() : null)
                .fromEquipmentName(recipeSOP.getFromEquipment() != null ? recipeSOP.getFromEquipment().getName() : null)
                .toEquipmentId(recipeSOP.getToEquipment().getId())
                .toEquipmentName(recipeSOP.getToEquipment().getName())
                .materials(recipeSOPMaterialMapper.toResponseList(materials))
                .parameters(recipeSOPParameterMapper.toResponseList(parameters))
                .build();
    }

    public RecipeSOP toEntity(CreateRecipeSOPRequest request, Integer stepNo, Recipe recipe, Action action,
            Transition transition, Equipment fromEquipment, Equipment toEquipment) {
        return RecipeSOP.builder()
                .recipe(recipe)
                .stepNo(stepNo)
                .message(request.message())
                .stdTime(request.stdTime())
                .action(action)
                .transition(transition)
                .fromEquipment(fromEquipment)
                .toEquipment(toEquipment)
                .build();
    }

    public void updateEntity(UpdateRecipeSOPRequest request, RecipeSOP recipeSOP, Action action, Transition transition,
            Equipment fromEquipment, Equipment toEquipment) {
        recipeSOP.setAction(action);
        recipeSOP.setTransition(transition);
        recipeSOP.setMessage(request.message());
        recipeSOP.setStdTime(request.stdTime());
        recipeSOP.setFromEquipment(fromEquipment);
        recipeSOP.setToEquipment(toEquipment);
    }

}
