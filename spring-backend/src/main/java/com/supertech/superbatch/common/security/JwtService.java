package com.supertech.superbatch.common.security;

import com.supertech.superbatch.manager.entity.Users;

public interface JwtService {
    String generateToken(Users user);

    Long extractUserId(String token);

    boolean validateToken(String token);
}
