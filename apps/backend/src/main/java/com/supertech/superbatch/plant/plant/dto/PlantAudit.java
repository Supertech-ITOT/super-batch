package com.supertech.superbatch.plant.plant.dto;


import lombok.Builder;

@Builder
public record PlantAudit(
        Long id,
        String name,
        String description,
        String location,
        String plantType) {
}