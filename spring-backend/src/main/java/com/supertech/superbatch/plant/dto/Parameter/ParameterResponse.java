package com.supertech.superbatch.plant.dto.Parameter;

import com.supertech.superbatch.plant.dto.UOM.UomResponse;

public record ParameterResponse(
        Long id,
        String code,
        String name,
        UomResponse uom,
        Boolean active) {
}