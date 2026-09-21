package com.supertech.superbatch.sample_check.check_Parameter.dto;

import lombok.Builder;

@Builder
public record CheckParameterOptionAudit(
                Long id,
                String value,
                boolean isAllowed) {

}
