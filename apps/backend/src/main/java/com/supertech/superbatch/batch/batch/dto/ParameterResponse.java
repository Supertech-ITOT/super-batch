package com.supertech.superbatch.batch.batch.dto;

import lombok.Builder;

@Builder
public record ParameterResponse(
        Long id,
        Long parameterId,
        String parameterName,
        Double stdValue) {
}