package com.supertech.superbatch.plant.dto.Parameter;

import com.supertech.superbatch.common.enums.UomType;

public record ParameterResponse(
        Long id,
        String code,
        String name,
        UomType uom,
        Boolean active) {
}