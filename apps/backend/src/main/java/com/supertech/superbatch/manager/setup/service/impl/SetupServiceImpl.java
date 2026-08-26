package com.supertech.superbatch.manager.setup.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.DuplicateResourceException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.dto.TrialLicenseRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;
import com.supertech.superbatch.manager.license.service.MachineFingerprintService;
import com.supertech.superbatch.manager.license.service.impl.LicenseServiceImpl;
import com.supertech.superbatch.manager.role.entity.Role;
import com.supertech.superbatch.manager.role.repository.RoleRepository;
import com.supertech.superbatch.manager.setup.dto.SetupRequest;
import com.supertech.superbatch.manager.setup.dto.SetupResponse;
import com.supertech.superbatch.manager.setup.enums.LicenseActivationType;
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
    private final LicenseServerClient licenseServerClient;
    private final LicenseServiceImpl licenseServiceImpl;
    private final MachineFingerprintService machineFingerprintService;

    @Override
    public SetupResponse getSetupStatus() {
        boolean firstSetup = !userRepository.existsByDeletedFalseAndSystemAccountFalse();
        return new SetupResponse(firstSetup);
    }

    @Override
    public void setup(SetupRequest request) {
        validateLicenseRequest(request);
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

        if (request.isTrial()) {
            String machineFingerprint = machineFingerprintService.getMachineFingerprint();
            System.out.println("Machine Fingerprint: " + machineFingerprint);
            ApiResponse<TrialLicenseResponse> trialActivationResponse = licenseServerClient.activateTrial(
                    TrialLicenseRequest.builder()
                            .name(request.name())
                            .companyName(request.companyName())
                            .email(request.email())
                            .machineFingerprint(machineFingerprint)
                            .productId(1L)
                            .build());

            licenseServiceImpl.saveTrial(trialActivationResponse.getData());
        }

    }

    private void validateLicenseRequest(SetupRequest request) {
        if (request.activationType() == LicenseActivationType.ONLINE) {
            if (request.licenseFile() != null && !request.licenseFile().isEmpty()) {
                throw new BadRequestException("License file is not supported for online activation.");
            }
            if (!request.isTrial() && (request.licenseKey() == null ||
                    request.licenseKey().isBlank())) {
                throw new BadRequestException("License key is required for online activation.");
            }
        }

        if (request.activationType() == LicenseActivationType.OFFLINE) {
            if (request.licenseFile() == null || request.licenseFile().isEmpty()) {
                throw new BadRequestException("License file is required for offline activation.");
            }
            if (request.isTrial()) {
                throw new BadRequestException("Trial activation is only available online.");
            }
        }
    }
}