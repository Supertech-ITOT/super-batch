package com.supertech.superbatch.plant.action.dto;

import lombok.Builder;

@Builder
public record ActionAudit(
                Long id,
                String name) {

}
