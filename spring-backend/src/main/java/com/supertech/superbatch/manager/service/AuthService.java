package com.supertech.superbatch.manager.service;

import com.supertech.superbatch.manager.dto.LoginRequest;
import com.supertech.superbatch.manager.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    void logout();
}
