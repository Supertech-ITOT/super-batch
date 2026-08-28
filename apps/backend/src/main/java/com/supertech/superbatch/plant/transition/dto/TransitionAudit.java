package com.supertech.superbatch.plant.transition.dto;

import lombok.Builder;

@Builder
public record TransitionAudit(
                Long id,
                String name) {

}
