package com.supertech.superbatch.manager.service;

import com.supertech.superbatch.manager.entity.Users;

public interface JwtService {
    String generateToken(Users user);

    String extractUsername(String token);

    boolean isTokenValid(String token, Users user);
}
