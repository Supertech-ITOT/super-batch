package com.supertech.superbatch.sample_check.check_parameter.dto;

import lombok.Builder;

@Builder
public record CheckParameterAudit(
        Long id,
        String name,
        String product,
        String type,
        Double min,
        Double max,
        String options) {

}
