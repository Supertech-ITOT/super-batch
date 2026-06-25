package com.supertech.superbatch.recipe.recipe_header.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.recipe.recipe_header.enums.RecipeHeaderStatus;

import lombok.Builder;

@Builder
public record RecipeHeaderResponse(
        Long id,
        String name,
        String description,
        RecipeHeaderStatus status,
        Integer batchSize,
        MaterialRecipeHeaderResponse materialRecipeHeaderResponse,
        UnitRecipeHeaderResponse unitRecipeHeaderResponse,
        UserRecipeHeaderResponse userRecipeHeaderResponse,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}