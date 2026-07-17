package com.supertech.superbatch.scheduler.control_recipe.dto;

import java.time.LocalDateTime;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateControlRecipeRequest(

        @NotNull(message = "Batch number is required") @Positive(message = "Batch number must be greater than 0") Integer batchNo,

        @NotNull(message = "Batch size is required") @Positive(message = "Batch size must be greater than 0") Integer batchSize,

        @FutureOrPresent(message = "Scheduled time cannot be in the past") LocalDateTime scheduledAt,

        @NotNull(message = "Recipe is required") @Positive(message = "Recipe ID must be greater than 0") Integer recipeId

) {
}