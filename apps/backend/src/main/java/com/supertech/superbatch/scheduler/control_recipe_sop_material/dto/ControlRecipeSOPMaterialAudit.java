package com.supertech.superbatch.scheduler.control_recipe_sop_material.dto;

import lombok.Builder;

@Builder
public record ControlRecipeSOPMaterialAudit(
                Long id,
                String name,
                Double stdQty) {

}