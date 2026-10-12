package com.supertech.superbatch.sample_check.check_parameter.dto;

import java.util.List;

import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;

import lombok.Builder;

@Builder
public record CheckParameterResponse(
        Long id,
        String name,
        List<MaterialResponse> product,
        CheckParameterType type,
        Double min,
        Double max,
        List<CheckParameterOptionsResponse> options) {

    public record MaterialResponse(
            Long id,
            String name) {
    }

}
