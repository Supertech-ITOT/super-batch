package com.supertech.superbatch.recipe.recipe.dto;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;

import lombok.Builder;

@Builder
public record RecipeDependencies(
        Action action,
        Transition transition,
        Equipment fromEquipment,
        Equipment toEquipment) {
}
