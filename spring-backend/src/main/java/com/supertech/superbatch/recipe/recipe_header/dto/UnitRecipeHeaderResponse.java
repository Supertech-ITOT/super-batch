package com.supertech.superbatch.recipe.recipe_header.dto;

import com.supertech.superbatch.plant.common.dto.UomResponse;

import lombok.Builder;

@Builder
public record UnitRecipeHeaderResponse(
        Long id,
        String name,
        String code,
        UomResponse batchSizeUom) {

}
