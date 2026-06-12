package com.supertech.superbatch.plant.dto.Transition;

import jakarta.validation.constraints.*;

public record CreateTransitionRequest(
        @NotBlank(message = "Transition name is required") @Size(min = 2, max = 100, message = "Transition name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Transition name contains invalid characters") String name) {

}
