package com.supertech.superbatch.scheduler.control_recipe.dto;

import com.supertech.superbatch.plant.common.dto.UomResponse;

import lombok.Builder;

@Builder
public record UnitControlRecipeResponse(
                Long id,
                String name,
                Integer capacity,
                UomResponse batchSizeUom) {

}