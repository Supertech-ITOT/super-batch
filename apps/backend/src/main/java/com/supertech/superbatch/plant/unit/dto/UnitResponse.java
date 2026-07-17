package com.supertech.superbatch.plant.unit.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.plant.common.dto.UomResponse;

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
