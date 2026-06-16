package com.supertech.superbatch.plant.dto.UnitConnection;

import com.supertech.superbatch.plant.enums.ConnectionType;

import jakarta.validation.constraints.NotNull;

public record UnitConnectionRequest(

        @NotNull(message = "Source unit is required") Long sourceUnitId,

        @NotNull(message = "Destination unit is required") Long destinationUnitId,

        @NotNull(message = "Connection type is required") ConnectionType connectionType

) {
}