package com.supertech.superbatch.manager.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.dto.LicenseActivationRequest;
import com.supertech.superbatch.manager.license.dto.LicenseActivationResponse;
import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.TrialLicenseRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.enums.LicenseStatus;
import com.supertech.superbatch.manager.license.mapper.LicenseMapper;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.license.service.LicenseFileStorageService;
import com.supertech.superbatch.manager.license.service.LicenseService;
import com.supertech.superbatch.manager.license.service.MachineFingerprintService;
import com.supertech.superbatch.manager.license.validation.LicenseValidator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LicenseServiceImpl implements LicenseService {
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;
    private final LicenseFileStorageService licenseFileStorageService;
    private final ObjectMapper objectMapper;
    private final MachineFingerprintService machineFingerprintService;
    private final LicenseServerClient licenseServerClient;
    private final LicenseValidator licenseValidator;

    @Override
    public LicenseResponse get() {
        License license = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("License not activated."));
        return licenseMapper.toResponse(license);
    }

    @Override
    @Transactional
    public void activateTrialLicense(String name, String email, String companyName) {
        try {
            String machineFingerprint = machineFingerprintService.getMachineFingerprint();
            ApiResponse<TrialLicenseResponse> res = licenseServerClient.activateTrial(TrialLicenseRequest.builder()
                    .name(name)
                    .email(email)
                    .companyName(companyName)
                    .machineFingerprint(machineFingerprint)
                    .productId(1L)
                    .build());
            byte[] licenseFile = res.getData().licenseFile();
            if (licenseFile == null || licenseFile.length == 0) {
                throw new BadRequestException("License server returned an empty license file.");
            }
            LicenseFilePayload payload = readLicenseFile(licenseFile);
            licenseValidator.validateLicensePayload(payload);
            licenseFileStorageService.save(payload.licenseNumber(), licenseFile);
            License license = licenseMapper.toEntity(payload);
            licenseRepository.save(license);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("Trial failed. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public LicenseResponse activateOfflineLicense(MultipartFile licenseFile) {
        try {
            byte[] fileBytes = licenseFile.getBytes();
            LicenseFilePayload payload = readLicenseFile(fileBytes);
            licenseValidator.validateLicensePayload(payload);
            License oldLicense = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                    .orElse(null);

            if (oldLicense != null && oldLicense.getLicenseKey().equals(payload.licenseKey())) {
                throw new BadRequestException("This license is already active.");
            }

            if (oldLicense != null) {
                oldLicense.setStatus(LicenseStatus.EXPIRED);
            }
            License saved = licenseRepository.save(licenseMapper.toEntity(payload));
            licenseFileStorageService.save(payload.licenseNumber(), fileBytes);
            return licenseMapper.toResponse(saved);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("Invalid license file. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean validateLicense() {
        License license = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                .orElseThrow(() -> new ResourceNotFoundException("License not activated."));

        try {
            Path path = licenseFileStorageService.get(license.getLicenseNumber());
            LicenseFilePayload payload = readLicenseFile(Files.readAllBytes(path));
            licenseValidator.validateLicensePayload(payload);
            license.setLastValidatedAt(LocalDateTime.now());
            licenseRepository.save(license);
            return true;
        } catch (BadRequestException e) {
            if (e.getMessage() != null && e.getMessage().equals("License has expired.")) {
                license.setStatus(LicenseStatus.EXPIRED);
                licenseRepository.save(license);
            }
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("License validation failed. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public LicenseResponse activateLicense(String licenseKey) {
        try {
            String machineFingerprint = machineFingerprintService.getMachineFingerprint();
            ApiResponse<LicenseActivationResponse> res = licenseServerClient.activateLicense(
                    LicenseActivationRequest.builder()
                            .licenseKey(licenseKey)
                            .machineFingerprint(machineFingerprint)
                            .productId(1L)
                            .build());

            byte[] licenseFile = res.getData().licenseFile();

            if (licenseFile == null || licenseFile.length == 0) {
                throw new BadRequestException("License server returned an empty license file.");
            }
            LicenseFilePayload payload = readLicenseFile(licenseFile);
            licenseValidator.validateLicensePayload(payload);
            License oldLicense = licenseRepository.findByStatus(LicenseStatus.ACTIVE).orElse(null);
            if (oldLicense != null && oldLicense.getLicenseKey().equals(payload.licenseKey())) {
                throw new BadRequestException("This license is already active.");
            }
            if (oldLicense != null) {
                oldLicense.setStatus(LicenseStatus.EXPIRED);
            }
            licenseFileStorageService.save(payload.licenseNumber(), licenseFile);
            License license = licenseMapper.toEntity(payload);
            License saved = licenseRepository.save(license);
            return licenseMapper.toResponse(saved);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("License activation failed. " + e.getMessage());
        }
    }

    private LicenseFilePayload readLicenseFile(byte[] file) {
        try {
            return objectMapper.readValue(new String(file, StandardCharsets.UTF_8), LicenseFilePayload.class);
        } catch (Exception e) {
            throw new BadRequestException("Invalid license file." + e.getMessage());
        }
    }

    @Override
    public boolean isActivated() {
        return licenseRepository.existsByStatus(LicenseStatus.ACTIVE);
    }

    @Override
    public boolean isLicenseValid() {
        return licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                .map(license -> license.getExpiryDate() != null && !license.getExpiryDate().isBefore(LocalDate.now()))
                .orElse(false);
    }

}
