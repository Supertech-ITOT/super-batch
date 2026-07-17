package com.supertech.superbatch.scheduler.control_recipe.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.*;

public record UpdateControlRecipeRequest(
                @NotNull(message = "Batch number is required") @Positive(message = "Batch number must be greater than 0") Integer batchNo,

                @NotNull(message = "Batch size is required") @Positive(message = "Batch size must be greater than 0") Integer batchSize,

                @FutureOrPresent(message = "Scheduled time cannot be in the past") LocalDateTime scheduledAt) {

}
