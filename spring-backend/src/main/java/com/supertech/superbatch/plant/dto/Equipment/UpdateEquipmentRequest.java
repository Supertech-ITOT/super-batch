package com.supertech.superbatch.plant.dto.Equipment;

import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.enums.EquipmentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateEquipmentRequest(
        @NotBlank(message = "Equipment name is required") @Size(min = 2, max = 100, message = "Equipment name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Equipment name contains invalid characters") String name,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description,

        @NotNull(message = "Status is required") StatusType status,

        @NotBlank(message = "Tag name is required") @Size(min = 2, max = 50, message = "Tag name must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9\\-_]+$", message = "Tag name must contain only uppercase letters, numbers, hyphen, or underscore") String tagName,

        @NotNull(message = "UOM is required") UomType uom,

        @NotNull(message = "Equipment type is required") EquipmentType equipmentType,

        @NotNull(message = "Unit id is required") Long unitId) {
}