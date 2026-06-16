package com.supertech.superbatch.manager.service;

import com.supertech.superbatch.manager.dto.Auth.LoginRequest;
import com.supertech.superbatch.manager.dto.Auth.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    void logout();
}
