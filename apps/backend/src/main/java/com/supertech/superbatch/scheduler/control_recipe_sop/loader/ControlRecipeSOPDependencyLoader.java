package com.supertech.superbatch.scheduler.control_recipe_sop.loader;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.action.repository.ActionRepository;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.equipment.repository.EquipmentRepository;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.repository.TransitionRepository;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPDependencies;
import com.supertech.superbatch.scheduler.control_recipe_sop.dto.ControlRecipeSOPDependencyRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop.validation.ControlRecipeSOPValidator;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlRecipeSOPDependencyLoader {
        private final ActionRepository actionRepository;
        private final EquipmentRepository equipmentRepository;
        private final TransitionRepository transitionRepository;
        private final ControlRecipeSOPValidator controlRecipeSOPValidator;

        public ControlRecipeSOPDependencies loadInsertDependencies(
                        ControlRecipeSOPDependencyRequest request,
                        ControlRecipe controlRecipe,
                        Long controlRecipeSOPId) {

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

                controlRecipeSOPValidator.validateEquipment(
                                transition,
                                fromEquipment,
                                toEquipment,
                                controlRecipe.getUnit().getId());

                controlRecipeSOPValidator.validateMaterial(
                                controlRecipe.getId(),
                                controlRecipeSOPId,
                                transition,
                                request.materials(),
                                controlRecipe.getBatchSize());

                return ControlRecipeSOPDependencies.builder()
                                .action(action)
                                .transition(transition)
                                .fromEquipment(fromEquipment)
                                .toEquipment(toEquipment)
                                .build();
        }
}