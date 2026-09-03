package com.supertech.superbatch.manager.auth.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.common.security.JwtService;
import com.supertech.superbatch.manager.auth.dto.LoginRequest;
import com.supertech.superbatch.manager.auth.dto.LoginResponse;
import com.supertech.superbatch.manager.auth.service.AuthService;
import com.supertech.superbatch.manager.license.service.LicenseService;
import com.supertech.superbatch.manager.permission.mapper.PermissionMapper;
import com.supertech.superbatch.manager.role.entity.DefaultRole;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final LicenseService licenseService;
    private final PermissionMapper permissionMapper;

    @Override
    public LoginResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        User user = userRepository.findByEmailAndDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        boolean canLoginWithoutLicense = user.isSystemAccount()
                || DefaultRole.ADMINISTRATOR.equals(user.getRole().getName());

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }
        if (!licenseService.isLicenseValid() && !canLoginWithoutLicense) {
            throw new BadRequestException("A valid license is required.");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        String token = jwtService.generateToken(user);

        LoginResponse loginResponse = LoginResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .accessToken(token)
                .passwordChangeRequired(user.isPasswordChangeRequired())
                .permissions(permissionMapper.toResponseList(List.copyOf(user.getRole().getPermissions())))
                .systemAccount(user.isSystemAccount())
                .build();

        return loginResponse;
    }

    @Override
    public void logout() {
    }

}
