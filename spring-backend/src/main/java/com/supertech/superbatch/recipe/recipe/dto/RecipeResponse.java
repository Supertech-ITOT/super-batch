package com.supertech.superbatch.recipe.recipe.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.recipe.recipe.enums.RecipeStatus;

import lombok.Builder;

@Builder
public record RecipeResponse(
                Long id,
                String name,
                String description,
                RecipeStatus status,
                Integer batchSize,
                MaterialRecipeResponse materialRecipeResponse,
                UnitRecipeResponse unitRecipeResponse,
                UserRecipeResponse userRecipeResponse,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
}