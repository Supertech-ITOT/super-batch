package com.supertech.superbatch.plant.dto.Action;

import jakarta.validation.constraints.*;

public record UpdateActionRequest(
                @NotNull(message = "Id is required") @Positive(message = "Id must be greater than 0") Long id,
                @NotBlank(message = "Action code is required") @Size(min = 2, max = 50, message = "Action code must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9_-]+$", message = "Action code may contain only uppercase letters, numbers, underscores and hyphens") String code,
                @NotBlank(message = "Action name is required") @Size(min = 2, max = 100, message = "Action name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Action name contains invalid characters") String name,
                @NotNull(message = "Status is required") Boolean active

) {

}
