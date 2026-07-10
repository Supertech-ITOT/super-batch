package com.supertech.superbatch.plant.message.dto;

import lombok.Builder;

@Builder
public record MessageResponse(
                Long id,
                String name) {

}
