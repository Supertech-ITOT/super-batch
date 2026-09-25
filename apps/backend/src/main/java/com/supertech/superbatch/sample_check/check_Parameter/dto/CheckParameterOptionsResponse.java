package com.supertech.superbatch.sample_check.check_parameter.dto;

import lombok.Builder;

@Builder
public record CheckParameterOptionsResponse(
                Long id,
                String value,
                boolean isAllowed) {

}
