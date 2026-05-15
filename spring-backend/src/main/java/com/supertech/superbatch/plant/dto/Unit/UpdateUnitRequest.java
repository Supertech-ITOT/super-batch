package com.supertech.superbatch.plant.dto.Unit;

import com.supertech.superbatch.plant.enums.UnitType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateUnitRequest(
                @NotBlank(message = "Unit name is required") String name,
                @NotNull(message = "Unit type is required") UnitType unitType) {

}
