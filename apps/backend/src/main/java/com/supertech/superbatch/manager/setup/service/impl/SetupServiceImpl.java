package com.supertech.superbatch.manager.setup.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.enums.LicenseActivationType;
import com.supertech.superbatch.manager.license.service.LicenseService;
import com.supertech.superbatch.manager.license.validation.LicenseValidator;
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
@Transactional(readOnly = true)
public class SetupServiceImpl implements SetupService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final LicenseService licenseService;
    private final LicenseValidator licenseValidator;

    @Override
    public SetupResponse getSetupStatus() {
        boolean firstSetup = !userRepository.existsByDeletedFalseAndSystemAccountFalse();
        return new SetupResponse(firstSetup);
    }

    @Override
    @Transactional
    public void setup(SetupRequest request) {
        licenseValidator.validateLicenseRequest(request.activationType(), request.licenseKey(), request.licenseFile(),
                request.isTrial());

        if (userRepository.existsByDeletedFalseAndSystemAccountFalse()) {
            throw new BadRequestException("System has already been initialized.");
        }

        // ONLINE TRIAL
        if (request.activationType() == LicenseActivationType.ONLINE && request.isTrial()) {
            licenseService.activateTrialLicense(request.name(), request.email(), request.companyName());
            createAdminUser(request.name(), request.email(), request.password());
        }

        // ONLINE LICENSE KEY
        if (request.activationType() == LicenseActivationType.ONLINE && request.licenseKey() != null
                && !request.licenseKey().isBlank() && !request.isTrial()) {

            LicenseResponse res = licenseService.activateLicense(request.licenseKey());
            createAdminUser(res.customerName(), res.customerEmail(), "Super@123");

        }

        // OFFLINE LICENSE FILE
        if (request.activationType() == LicenseActivationType.OFFLINE) {
            LicenseResponse res = licenseService.activateOfflineLicense(request.licenseFile());
            createAdminUser(res.customerName(), res.customerEmail(), "Super@123");
        }

    }

    private void createAdminUser(String name, String email, String password) {
        Role administratorRole = roleRepository
                .findByNameAndDeletedFalse("Administrator")
                .orElseThrow(() -> new ResourceNotFoundException("Administrator role not found"));
        User admin = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(administratorRole)
                .build();
        userRepository.save(admin);
    }
}