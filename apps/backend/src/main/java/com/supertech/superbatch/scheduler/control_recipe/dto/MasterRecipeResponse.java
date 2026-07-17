package com.supertech.superbatch.scheduler.control_recipe.dto;

import com.supertech.superbatch.plant.common.dto.UomResponse;

import lombok.Builder;

@Builder
public record MasterRecipeResponse(
        Long id,
        String name,
        String product,
        String description,
        String unit,
        UomResponse batchSizeUom) {

}
