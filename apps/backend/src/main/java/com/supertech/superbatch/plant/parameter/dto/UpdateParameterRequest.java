package com.supertech.superbatch.plant.parameter.dto;

import com.supertech.superbatch.common.enums.UomType;

import jakarta.validation.constraints.*;

public record UpdateParameterRequest(
        @NotBlank(message = "Parameter name is required") @Size(min = 2, max = 100, message = "Parameter name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Parameter name contains invalid characters") String name,
        @NotNull(message = "UOM is required") UomType uom) {
}
