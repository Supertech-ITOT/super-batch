package com.supertech.superbatch.plant.dto.Equipment;

import jakarta.validation.constraints.*;

public record UpdateEquipmentRequest(
        @NotBlank(message = "Equipment name is required") @Size(min = 2, max = 100, message = "Equipment name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Equipment name contains invalid characters") String name,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description,

        @NotBlank(message = "Equipment code is required") @Size(min = 2, max = 30, message = "Equipment code must be between 2 and 30 characters") @Pattern(regexp = "^[A-Z0-9\\-_]+$", message = "Unit code must contain only uppercase letters, numbers, hyphen, or underscore") String code,

        @NotNull(message = "Unit id is required") Long unitId,

        @NotNull(message = "Capacity is required") @Min(value = 1, message = "Capacity must be greater than 0") Integer capacity) {
}