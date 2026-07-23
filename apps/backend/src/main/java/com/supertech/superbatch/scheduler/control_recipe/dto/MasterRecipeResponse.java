package com.supertech.superbatch.scheduler.control_recipe.dto;

import lombok.Builder;

@Builder
public record MasterRecipeResponse(
                Long id,
                String name,
                String product,
                String description,
                UnitControlRecipeResponse unit) {

}
