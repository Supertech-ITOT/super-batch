package com.supertech.superbatch.plant.dto.Equipment;

import com.supertech.superbatch.plant.enums.EquipmentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateEquipmentRequest(
                @NotBlank(message = "Equipment name is required") String name,
                @NotNull(message = "Equipment type is required") EquipmentType equipmentType,
                @NotNull(message = "Unit id is required") Long unitId) {
}
