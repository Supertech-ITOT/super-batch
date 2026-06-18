package com.supertech.superbatch.plant.equipment.dto;

import jakarta.validation.constraints.NotNull;

public record AssignEquipmentRequest(

                @NotNull(message = "Unit id is required") Long unitId,
                @NotNull(message = "Equipment id is required") Long equipmentId

) {
}
