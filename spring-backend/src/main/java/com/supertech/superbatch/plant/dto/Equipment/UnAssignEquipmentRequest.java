package com.supertech.superbatch.plant.dto.Equipment;

import jakarta.validation.constraints.NotNull;

public record UnAssignEquipmentRequest(

        @NotNull(message = "Unit id is required") Long unitId,
        @NotNull(message = "Equipment id is required") Long equipmentId

) {
}
