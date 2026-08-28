package com.supertech.superbatch.plant.message.dto;

import lombok.Builder;

@Builder
public record MessageAudit(
                Long id,
                String name) {

}
