package com.supertech.superbatch.plant.dto.Unit;

import java.time.LocalDateTime;

import com.supertech.superbatch.common.enums.StatusType;
import com.supertech.superbatch.plant.enums.UnitType;

public record UnitResponse(
                Long id,
                String name,
                String code,
                String description,
                StatusType status,
                Long areaId,
                String areaName,
                UnitType unitType,
                Integer totalEquipment,
                LocalDateTime createdAt,
                LocalDateTime updatedAt

) {

}
