package com.supertech.superbatch.plant.action.dto;

import jakarta.validation.constraints.*;

public record UpdateActionRequest(
        @NotBlank(message = "Action name is required") @Size(min = 2, max = 100, message = "Action name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Action name contains invalid characters") String name

) {

}
