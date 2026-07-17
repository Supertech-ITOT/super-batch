package com.supertech.superbatch.recipe.recipe.dto;

import com.supertech.superbatch.plant.common.dto.UomResponse;

import lombok.Builder;

@Builder
public record UnitRecipeResponse(
                Long id,
                String name,
                String code,
                UomResponse batchSizeUom) {

}
