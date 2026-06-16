package com.supertech.superbatch.manager.dto.Auth;

import lombok.Builder;

@Builder
public record LoginResponse(
        Long userId,
        String name,
        String email,
        String role,
        String accessToken) {
}