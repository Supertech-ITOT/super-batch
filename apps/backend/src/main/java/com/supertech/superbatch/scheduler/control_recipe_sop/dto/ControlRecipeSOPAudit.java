package com.supertech.superbatch.scheduler.control_recipe_sop.dto;

import java.util.List;

import com.supertech.superbatch.scheduler.control_recipe_sop_material.dto.ControlRecipeSOPMaterialAudit;
import com.supertech.superbatch.scheduler.control_recipe_sop_parameter.dto.ControlRecipeSOPParameterAudit;

import lombok.Builder;

@Builder
public record ControlRecipeSOPAudit(
        Long id,
        Integer stepNo,
        Double stdTime,
        String controlRecipe,
        String transition,
        String action,
        String message,
        String fromEquipment,
        String toEquipment,
        List<ControlRecipeSOPMaterialAudit> materials,
        List<ControlRecipeSOPParameterAudit> parameters

) {

}