package com.supertech.superbatch.plant.dto.Unit;

import java.time.LocalDateTime;

import com.supertech.superbatch.plant.dto.UOM.UomResponse;

import lombok.Builder;

@Builder
public record UnitResponse(
                Long id,
                String name,
                String code,
                String description,
                Long areaId,
                String areaName,
                Integer capacity,
                UomResponse batchSizeUom,
                Integer totalEquipment,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {

}
