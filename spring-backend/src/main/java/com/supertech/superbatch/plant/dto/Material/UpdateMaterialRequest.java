package com.supertech.superbatch.plant.dto.Material;

import com.supertech.superbatch.common.enums.UomType;
import com.supertech.superbatch.plant.enums.MaterialType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateMaterialRequest(

        @NotBlank(message = "Material name is required") @Size(min = 2, max = 100, message = "Material name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Material name contains invalid characters") String name,

        @NotBlank(message = "Material code is required") @Size(min = 2, max = 50, message = "Material code must be between 2 and 50 characters") @Pattern(regexp = "^[A-Z0-9_-]+$", message = "Material code may contain only uppercase letters, numbers, underscores and hyphens") String code,

        @NotNull(message = "Material type is required") MaterialType materialType,

        @NotNull(message = "UOM is required") UomType uom,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description) {
}
