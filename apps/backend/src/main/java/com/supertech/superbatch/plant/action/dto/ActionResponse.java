package com.supertech.superbatch.plant.action.dto;

import lombok.Builder;

@Builder
public record ActionResponse(
                Long id,
                String name) {

}
