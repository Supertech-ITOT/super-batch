package com.supertech.superbatch.manager.role.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record RoleResponse(
        Long id,
        String name,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatdeAt) {

}
