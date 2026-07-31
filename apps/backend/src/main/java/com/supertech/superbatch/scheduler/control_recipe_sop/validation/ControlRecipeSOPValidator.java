package com.supertech.superbatch.scheduler.control_recipe_sop.validation;

import java.util.List;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;
import com.supertech.superbatch.plant.transition.enums.TransitionType;
import com.supertech.superbatch.scheduler.control_recipe.entity.ControlRecipe;
import com.supertech.superbatch.scheduler.control_recipe.enums.ControlRecipeStatus;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;
import com.supertech.superbatch.scheduler.control_recipe_sop_material.repository.ControlRecipeSOPMaterialRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControlRecipeSOPValidator {
    private final ControlRecipeSOPMaterialRepository controlRecipeSOPMaterialRepository;

    public void validateEquipment(Transition transition, Equipment fromEquipment, Equipment toEquipment,
            Long unitId) {
        if (fromEquipment != null) {
            if (fromEquipment.getId().equals(toEquipment.getId())) {
                throw new BadRequestException("From Equipment and To Equipment cannot be same.");
            }

        }
        if (fromEquipment == null
                && transition.getName().equals(TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName())) {
            throw new BadRequestException("From Equipment is required in Auto Material Charge transition.");
        }
        if (!transition.getName().equals(TransitionType.TRANSFER.getDisplayName())
                && (toEquipment.getCreatorUnit() == null
                        || toEquipment.getCreatorUnit().getId() != unitId)) {
            throw new BadRequestException(
                    "To Equipment must be recipe main equipment in selected transition.");
        }
        if (transition.getName().equals(TransitionType.TRANSFER.getDisplayName())
                && (fromEquipment == null || fromEquipment.getCreatorUnit() == null
                        || fromEquipment.getCreatorUnit().getId() != unitId)) {
            throw new BadRequestException(
                    "From Equipment must be recipe main equipment in Transfer transition.");
        }

    }

    public void validateMaterial(Long recipeId, Long recipeSOPId, Transition transition,
            List<ControlRecipeSOPMaterialRequest> materials,
            Integer batchSize) {

        materials = materials == null ? List.of() : materials;

        if (TransitionType.AUTO_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                && materials.size() != 1) {
            throw new BadRequestException("Auto material charging step must contain exactly one material.");
        }

        if (TransitionType.MANUAL_MATERIAL_CHARGE.getDisplayName().equals(transition.getName())
                && materials.isEmpty()) {
            throw new BadRequestException(
                    "Manual material charging step must contain at least one material.");
        }

        double requestedQty = materials.stream().mapToDouble(ControlRecipeSOPMaterialRequest::stdQty).sum();
        double existingQty = controlRecipeSOPMaterialRepository.getTotalMaterialQtyByControlRecipeId(recipeId);

        if (recipeSOPId != null) {
            existingQty -= controlRecipeSOPMaterialRepository
                    .getTotalMaterialQtyByControlRecipeSOPId(recipeSOPId);
        }

        double finalQty = existingQty + requestedQty;

        if (finalQty > batchSize) {
            throw new BadRequestException(String.format(
                    "Total material quantity (%.2f kg) exceeds recipe batch size (%d kg).",
                    finalQty, batchSize));
        }

    }

    public void validateEditable(ControlRecipe controlRecipe) {
        if (controlRecipe.getStatus() == ControlRecipeStatus.TRANSFERRED) {
            throw new BadRequestException("Transferred batch cannot be created / edited / deleted.");
        }
    }
}
