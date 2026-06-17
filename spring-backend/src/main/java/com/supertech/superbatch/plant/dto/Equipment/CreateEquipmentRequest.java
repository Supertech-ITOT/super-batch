package com.supertech.superbatch.plant.dto.Equipment;

import com.supertech.superbatch.plant.enums.EquipmentType;

import jakarta.validation.constraints.*;

public record CreateEquipmentRequest(

        @NotBlank(message = "Equipment name is required") @Size(min = 2, max = 100, message = "Equipment name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Equipment name contains invalid characters") String name,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description,

        @NotBlank(message = "Equipment tagName is required") @Size(min = 2, max = 30, message = "Equipment tagName must be between 2 and 30 characters") @Pattern(regexp = "^[A-Z0-9\\-_]+$", message = "Unit code must contain only uppercase letters, numbers, hyphen, or underscore") String tagName,

        @NotNull(message = "Unit id is required") Long unitId,

        @NotNull(message = "Equipment type is required") EquipmentType equipmentType

) {
}