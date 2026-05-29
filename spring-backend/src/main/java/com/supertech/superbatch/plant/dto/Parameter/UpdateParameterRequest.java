package com.supertech.superbatch.plant.dto.Parameter;

import com.supertech.superbatch.common.enums.UomType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateParameterRequest(
        @NotBlank(message = "Parameter name is required") @Size(min = 2, max = 100, message = "Parameter name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Parameter name contains invalid characters") String name,

        @NotBlank(message = "Parameter code is required") @Size(min = 2, max = 50, message = "Parameter code must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9_-]+$", message = "Parameter code may contain only uppercase letters, numbers, underscores and hyphens") String code,

        @NotNull(message = "UOM is required") UomType uom,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description) {

}
