package com.supertech.superbatch.manager.user.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record UserResponse(
        Long id,
        String name,
        String email,
        Boolean enabled,
        Long roleId,
        String roleName,
        Long createdById,
        String createdByName,
        LocalDateTime lastLoginAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}