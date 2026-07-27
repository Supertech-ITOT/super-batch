package com.supertech.superbatch.plant.equipment.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record EquipmentAudit(
        Long id,
        String name,
        String code,
        String description,
        String equipmentType,
        Integer capacity,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

}
