package com.supertech.superbatch.recipe.recipe_sop.loader;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.recipe.recipe.entity.Recipe;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencies;
import com.supertech.superbatch.recipe.recipe_sop.dto.RecipeSOPDependencyRequest;
import com.supertech.superbatch.recipe.recipe_sop.validation.RecipeSOPValidator;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RecipeSOPDependencyLoader {
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final RecipeSOPValidator recipeSOPValidator;

        public RecipeSOPDependencies loadInsertDependencies(RecipeSOPDependencyRequest request, Recipe recipe,
                        Long recipeSOPId) {
                Action action = actionRepository.findById(request.actionId())
                                .orElseThrow(() -> new ResourceNotFoundException("Action not found."));
                Transition transition = transitionRepository.findById(request.transitionId())
                                .orElseThrow(() -> new ResourceNotFoundException("Transition not found."));

                Equipment fromEquipment = null;
                if (request.fromEquipmentId() != null) {
                        fromEquipment = equipmentRepository.findById(request.fromEquipmentId())
                                        .orElseThrow(() -> new ResourceNotFoundException("From Equipment not found."));
                }

                Equipment toEquipment = equipmentRepository.findById(request.toEquipmentId())
                                .orElseThrow(() -> new ResourceNotFoundException("To Equipment not found."));

                recipeSOPValidator.validateEquipment(transition, fromEquipment, toEquipment, recipe.getUnit().getId());
                recipeSOPValidator.validateMaterial(recipe.getId(), recipeSOPId, transition, request.materials(),
                                recipe.getBatchSize(), recipe.getUnit().getRecipeQuantityType());
                return RecipeSOPDependencies.builder().action(action).transition(transition)
                                .fromEquipment(fromEquipment).toEquipment(toEquipment).build();
        }
}