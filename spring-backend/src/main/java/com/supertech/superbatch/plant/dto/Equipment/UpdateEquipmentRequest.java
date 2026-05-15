package com.supertech.superbatch.plant.dto.Equipment;

import com.supertech.superbatch.plant.enums.EquipmentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateEquipmentRequest(
                @NotBlank(message = "Equipment name is required") String name,
                @NotNull(message = "Equipment type is required") EquipmentType equipmentType) {
}