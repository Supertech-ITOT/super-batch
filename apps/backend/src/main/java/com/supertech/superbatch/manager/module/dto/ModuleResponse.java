package com.supertech.superbatch.manager.module.dto;

import lombok.Builder;

@Builder
public record ModuleResponse(
        Long id,
        String name) {
}
