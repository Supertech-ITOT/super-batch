package com.supertech.superbatch.batch.batch.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record StepResponse(
        Integer stepNo,

        Long criteriaId,
        String criteriaName,

        Long actionId,
        String actionName,

        Long fromEquipmentId,
        String fromEquipmentName,

        Long toEquipmentId,
        String toEquipmentName,

        Double stdTime,

        String message,

        LocalDateTime startDateTime,
        LocalDateTime endDateTime,

        List<MaterialResponse> materials,
        List<ParameterResponse> parameters) {
}