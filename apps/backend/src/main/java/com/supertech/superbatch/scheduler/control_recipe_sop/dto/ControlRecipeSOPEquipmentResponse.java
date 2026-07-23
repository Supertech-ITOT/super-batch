package com.supertech.superbatch.scheduler.control_recipe_sop.dto;

import lombok.Builder;

@Builder
public record ControlRecipeSOPEquipmentResponse(
        Long id,
        String name,
        String code) {

}
