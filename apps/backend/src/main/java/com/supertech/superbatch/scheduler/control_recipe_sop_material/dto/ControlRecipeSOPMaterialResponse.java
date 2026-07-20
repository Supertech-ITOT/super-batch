package com.supertech.superbatch.scheduler.control_recipe_sop_material.dto;

import lombok.Builder;

@Builder
public record ControlRecipeSOPMaterialResponse(
                Long id,
                Long materialId,
                String materialName,
                Double stdQty

) {

}
