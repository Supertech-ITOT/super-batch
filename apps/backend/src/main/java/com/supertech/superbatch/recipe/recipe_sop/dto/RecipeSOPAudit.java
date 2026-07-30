package com.supertech.superbatch.recipe.recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.recipe.recipe_sop_material.dto.RecipeSOPMaterialAudit;
import com.supertech.superbatch.recipe.recipe_sop_parameter.dto.RecipeSOPParameterAudit;

import lombok.Builder;

@Builder
public record RecipeSOPAudit(
                Long id,
                Integer stepNo,
                Double stdTime,
                String recipe,
                String transition,
                String action,
                String message,
                String fromEquipment,
                String toEquipment,
                List<RecipeSOPMaterialAudit> materials,
                List<RecipeSOPParameterAudit> parameters

) {

}
