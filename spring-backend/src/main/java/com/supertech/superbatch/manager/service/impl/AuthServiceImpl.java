package com.supertech.superbatch.manager.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.dto.LoginRequest;
import com.supertech.superbatch.manager.dto.LoginResponse;
import com.supertech.superbatch.manager.entity.Users;
import com.supertech.superbatch.manager.repository.UsersRepository;
import com.supertech.superbatch.manager.service.AuthService;
import com.supertech.superbatch.manager.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {
        Users user = usersRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResourceNotFoundException(
                    "Invalid email or password");
        }

        user.setLastLoginAt(LocalDateTime.now());
        usersRepository.save(user);
        String token = jwtService.generateToken(user);

        LoginResponse loginResponse = LoginResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .accessToken(token)
                .build();

        return loginResponse;
    }

    @Override
    public void logout() {
    }

}
