package com.supertech.superbatch.scheduler.control_recipe.dto;

import lombok.Builder;

@Builder
public record UserControlRecipeResponse(
        Long id,
        String name,
        String email,
        String role) {

}
