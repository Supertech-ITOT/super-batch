package com.supertech.superbatch.plant.message.dto;

import lombok.Builder;

@Builder
public record MessagesResponse(
                Long id,
                String name) {

}
