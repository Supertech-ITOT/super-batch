package com.supertech.superbatch.plant.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionRequest;
import com.supertech.superbatch.plant.dto.UnitConnection.UnitConnectionResponse;
import com.supertech.superbatch.plant.entity.UnitConnection;
import com.supertech.superbatch.plant.service.UnitService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UnitConnectionMapper {
    private final UnitService unitService;

    public UnitConnectionResponse toResponse(UnitConnection entity) {
        return UnitConnectionResponse.builder()
                .id(entity.getId())
                .sourceUnitId(entity.getSourceUnit().getId())
                .sourceUnitName(entity.getSourceUnit().getName())
                .destinationUnitId(entity.getDestinationUnit().getId())
                .destinationUnitName(entity.getDestinationUnit().getName())
                .connectionType(entity.getConnectionType())
                .build();
    }

    public UnitConnection toEntity(UnitConnectionRequest request) {
        return UnitConnection.builder()
                .sourceUnit(unitService.getUnitById(request.sourceUnitId()))
                .destinationUnit(unitService.getUnitById(request.destinationUnitId()))
                .connectionType(request.connectionType())
                .build();
    }

    public void updateEntity(UnitConnection unitConnection, UnitConnectionRequest request) {
        unitConnection.setSourceUnit(unitService.getUnitById(request.sourceUnitId()));
        unitConnection.setDestinationUnit(unitService.getUnitById(request.destinationUnitId()));
        unitConnection.setConnectionType(request.connectionType());
    }
}