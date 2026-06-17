package com.supertech.superbatch.plant.dto.UnitConnection;

import com.supertech.superbatch.plant.enums.ConnectionType;

import lombok.Builder;

@Builder
public record UnitConnectionResponse(

        Long id,

        Long sourceUnitId,
        String sourceUnitName,

        Long destinationUnitId,
        String destinationUnitName,

        ConnectionType connectionType

) {
}
