package com.supertech.superbatch.plant.dto.Unit;

import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.plant.enums.UnitType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUnitRequest(

        @NotBlank(message = "Unit name is required") @Size(min = 3, max = 100, message = "Unit name must be between 3 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Unit name contains invalid characters") String name,

        @NotBlank(message = "Unit code is required") @Size(min = 2, max = 30, message = "Unit code must be between 2 and 30 characters") @Pattern(regexp = "^[A-Z0-9\\-_]+$", message = "Unit code must contain only uppercase letters, numbers, hyphen, or underscore") String code,

        @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description,

        @NotNull(message = "Status is required") StatusType status,

        @NotNull(message = "Unit type is required") UnitType unitType,

        @NotNull(message = "Area id is required") Long areaId

) {
}