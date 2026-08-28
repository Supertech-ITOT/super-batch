package com.supertech.superbatch.plant.parameter.dto;

import com.supertech.superbatch.common.enums.UomType;

import lombok.Builder;

@Builder
public record ParameterAudit(
        Long id,
        String name,
        UomType uom) {

}
