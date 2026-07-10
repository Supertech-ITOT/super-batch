package com.supertech.superbatch.common.security;

import com.supertech.superbatch.manager.user.entity.User;

public interface JwtService {
    String generateToken(User user);

    Long extractUserId(String token);

    String extractRole(String token);

    boolean validateToken(String token);
}
