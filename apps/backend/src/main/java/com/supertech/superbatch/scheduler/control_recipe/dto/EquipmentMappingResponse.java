package com.supertech.superbatch.scheduler.control_recipe.dto;

import lombok.Builder;

@Builder
public record EquipmentMappingResponse(
        Long equipmentId,
        String equipmentName,
        Long mappedEquipmentId,
        Boolean autoMapped) {
}