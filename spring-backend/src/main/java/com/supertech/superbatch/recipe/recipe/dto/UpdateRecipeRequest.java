package com.supertech.superbatch.recipe.recipe.dto;

import com.supertech.superbatch.recipe.recipe.enums.RecipeStatus;

import jakarta.validation.constraints.*;

public record UpdateRecipeRequest(
                @NotBlank(message = "Recipe name is required") @Size(max = 100, message = "Recipe name cannot exceed 100 characters") String name,

                @NotBlank(message = "Description is required") @Size(max = 255, message = "Description cannot exceed 255 characters") String description,

                @NotNull(message = "Batch size is required") @Positive(message = "Batch size must be greater than 0") Integer batchSize,

                @NotNull(message = "Material is required") Long materialId,

                @NotNull(message = "Unit is required") Long unitId,

                @NotNull(message = "Status is required") RecipeStatus status) {

}
