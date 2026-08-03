package com.supertech.superbatch.manager.setup.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.setup.dto.SetupRequest;
import com.supertech.superbatch.manager.setup.dto.SetupResponse;
import com.supertech.superbatch.manager.setup.service.SetupService;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;

import lombok.*;

@Service
@RequiredArgsConstructor
public class SetupServiceImpl implements SetupService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public SetupResponse getSetupStatus() {
        boolean firstSetup = !userRepository.existsByDeletedFalseAndSystemAccountFalse();
        return new SetupResponse(firstSetup);
    }

    @Override
    public void setup(SetupRequest request) {
        if (userRepository.existsByEmailAndDeletedFalse(request.email())) {
            throw new DuplicateResourceException("Email already exists.");
        }
        if (userRepository.existsByDeletedFalseAndSystemAccountFalse()) {
            throw new BadRequestException("System has already been initialized.");
        }
        Role administratorRole = roleRepository
                .findByNameAndDeletedFalse("Administrator")
                .orElseThrow(() -> new ResourceNotFoundException("Administrator role not found"));
        User admin = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(administratorRole)
                .build();

        userRepository.save(admin);
        // Create Company(request.companyName())
        // Initialize License
    }
}