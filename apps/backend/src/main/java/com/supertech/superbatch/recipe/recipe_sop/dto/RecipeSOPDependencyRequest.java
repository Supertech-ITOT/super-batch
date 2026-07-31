package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialRequest;

public interface RecipeSOPDependencyRequest {
    Long actionId();

    Long transitionId();

    Long fromEquipmentId();

    Long toEquipmentId();

    List<RecipeSOPMaterialRequest> materials();
}