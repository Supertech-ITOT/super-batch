package com.supertech.superbatch.manager.user.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.manager.permission.dto.PermissionResponse;

import lombok.Builder;

@Builder
public record UserResponse(
        Long id,
        String name,
        String email,
        Long roleId,
        String roleName,
        List<PermissionResponse> permissions,
        Long createdById,
        String createdByName,
        LocalDateTime lastLoginAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}