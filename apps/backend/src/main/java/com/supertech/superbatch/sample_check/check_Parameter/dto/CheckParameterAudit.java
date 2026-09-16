package com.supertech.superbatch.sample_check.check_Parameter.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record CheckParameterAudit(
                Long id,
                String name,
                String product,
                String type,
                Double min,
                Double max,
                List<CheckParameterOptionAudit> options) {

}
