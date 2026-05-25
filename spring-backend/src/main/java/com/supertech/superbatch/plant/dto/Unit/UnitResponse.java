package com.supertech.superbatch.plant.dto.Unit;

import java.time.LocalDateTime;

public record UnitResponse(
        Long id,
        String name,
        String code,
        String description,
        String status,
        Long areaId,
        String areaName,
        String unitType,
        Integer totalEquipment,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

}
