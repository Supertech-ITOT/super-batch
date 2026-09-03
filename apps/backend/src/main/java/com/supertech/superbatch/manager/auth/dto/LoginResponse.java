package com.supertech.superbatch.manager.auth.dto;

import java.util.List;

import com.supertech.superbatch.manager.permission.dto.PermissionResponse;

import lombok.Builder;

@Builder
public record LoginResponse(
        Long userId,
        String name,
        String email,
        String role,
        String accessToken,
        boolean passwordChangeRequired,
        List<PermissionResponse> permissions,
        Boolean systemAccount

) {
}