package com.supertech.superbatch.plant.dto.Parameter;

import com.supertech.superbatch.common.enums.UomType;

import jakarta.validation.constraints.*;

public record CreateParameterRequest(
        @NotNull(message = "Id is required") @Positive(message = "Id must be greater than 0") Long id,
        @NotBlank(message = "Parameter code is required") @Size(min = 2, max = 50, message = "Parameter code must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9_-]+$", message = "Parameter code may contain only uppercase letters, numbers, underscores and hyphens") String code,
        @NotBlank(message = "Parameter name is required") @Size(min = 2, max = 100, message = "Parameter name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Parameter name contains invalid characters") String name,
        @NotNull(message = "UOM is required") UomType uom,
        @NotNull(message = "Status is required") Boolean active) {
}
