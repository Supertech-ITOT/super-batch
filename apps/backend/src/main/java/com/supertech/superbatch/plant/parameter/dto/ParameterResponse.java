package com.supertech.superbatch.plant.parameter.dto;

import com.supertech.superbatch.plant.common.dto.UomResponse;

public record ParameterResponse(
        Long id,
        String name,
        UomResponse uom) {
}