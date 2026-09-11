package com.supertech.superbatch.sample_check.check_Parameter.dto;

import com.supertech.superbatch.sample_check.check_Parameter.entity.CheckParameter;

import lombok.Builder;

@Builder
public record CheckParameterOptionsResponse(
        Long id,
        CheckParameter checkParameter,
        String value,
        boolean isAllowed) {

}
