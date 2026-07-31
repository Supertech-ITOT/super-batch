package com.supertech.superbatch.scheduler.control_recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialRequest;

public interface ControlRecipeSOPDependencyRequest {
    Long actionId();

    Long transitionId();

    Long fromEquipmentId();

    Long toEquipmentId();

    List<ControlRecipeSOPMaterialRequest> materials();
}
