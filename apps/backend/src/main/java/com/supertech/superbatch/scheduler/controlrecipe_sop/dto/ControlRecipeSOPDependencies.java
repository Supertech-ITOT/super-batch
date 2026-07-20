package com.supertech.superbatch.scheduler.controlrecipe_sop.dto;

import com.supertech.superbatch.plant.action.entity.Action;
import com.supertech.superbatch.plant.equipment.entity.Equipment;
import com.supertech.superbatch.plant.transition.entity.Transition;

public record ControlRecipeSOPDependencies(
        Action action,
        Transition transition,
        Equipment fromEquipment,
        Equipment toEquipment

) {

}
