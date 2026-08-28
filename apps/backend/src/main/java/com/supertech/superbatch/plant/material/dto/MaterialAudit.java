package com.supertech.superbatch.plant.material.dto;

import com.supertech.superbatch.plant.material.enums.MaterialType;

import lombok.Builder;

@Builder
public record MaterialAudit(
        Long id,
        String name,
        String code,
        MaterialType materialType,
        String description

) {

}
