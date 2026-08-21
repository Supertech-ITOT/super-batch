package com.supertech.superbatch.scheduler.control_recipe.dto;

import lombok.Builder;

@Builder
public record UnitControlRecipeResponse(
        Long id,
        String name,
        String code,
        Integer capacity) {

}