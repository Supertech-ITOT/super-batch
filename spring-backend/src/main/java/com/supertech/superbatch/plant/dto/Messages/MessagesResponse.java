package com.supertech.superbatch.plant.dto.Messages;

import lombok.Builder;

@Builder
public record MessagesResponse(
                Long id,
                String name) {

}
