package com.supertech.superbatch.manager.auth.service;

import com.supertech.superbatch.manager.auth.dto.LoginRequest;
import com.supertech.superbatch.manager.auth.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    void logout();
}
