package com.supertech.superbatch.plant.dto.Transition;

import jakarta.validation.constraints.*;

public record UpdateTransitionRequest(
                @NotNull(message = "Id is required") @Positive(message = "Id must be greater than 0") Long id,
                @NotBlank(message = "Transition code is required") @Size(min = 2, max = 50, message = "Transition code must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9_-]+$", message = "Transition code may contain only uppercase letters, numbers, underscores and hyphens") String code,
                @NotBlank(message = "Transition name is required") @Size(min = 2, max = 100, message = "Transition name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Transition name contains invalid characters") String name,
                @NotNull(message = "Status is required") Boolean active) {
}