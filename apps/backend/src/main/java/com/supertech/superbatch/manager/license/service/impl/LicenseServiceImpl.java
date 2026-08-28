package com.supertech.superbatch.manager.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.crypto.LicenseSignatureService;
import com.supertech.superbatch.manager.license.dto.LicenseActivationRequest;
import com.supertech.superbatch.manager.license.dto.LicenseActivationResponse;
import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.LicenseSignaturePayload;
import com.supertech.superbatch.manager.license.dto.TrialLicenseRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.mapper.LicenseMapper;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.license.service.LicenseFileStorageService;
import com.supertech.superbatch.manager.license.service.LicenseService;
import com.supertech.superbatch.manager.license.service.MachineFingerprintService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseServiceImpl implements LicenseService {
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;
    private final LicenseFileStorageService licenseFileStorageService;
    private final LicenseSignatureService licenseSignatureService;
    private final ObjectMapper objectMapper;
    private final MachineFingerprintService machineFingerprintService;
    private final LicenseServerClient licenseServerClient;

    @Override
    public LicenseResponse get() {
        License license = licenseRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("License not activated."));
        return licenseMapper.toResponse(license);
    }

    @Override
    public void activateTrialLicense(String name, String email, String companyName) {
        String machineFingerprint = machineFingerprintService.getMachineFingerprint();
        ApiResponse<TrialLicenseResponse> res = licenseServerClient.activateTrial(TrialLicenseRequest.builder()
                .name(name)
                .email(email)
                .companyName(companyName)
                .machineFingerprint(machineFingerprint)
                .productId(1L)
                .build());
        if (res.getData().licenseFile() != null && res.getData().licenseFile().length > 0) {
            licenseFileStorageService.save(res.getData().licenseNumber(), res.getData().licenseFile());
        }
        License license = licenseMapper.toEntity(res.getData());
        licenseRepository.save(license);
    }

    @Override
    public LicenseResponse activateOfflineLicense(MultipartFile licenseFile) {
        try {
            String machineFingerprint = machineFingerprintService.getMachineFingerprint();
            // 1. Read license file
            String json = new String(licenseFile.getBytes(), StandardCharsets.UTF_8);
            // 2. Convert JSON → licenseFilePayload
            LicenseFilePayload licenseFilePayload = objectMapper.readValue(json, LicenseFilePayload.class);
            // 3. Reconstruct EXACT data that was signed
            LicenseSignaturePayload licenseSignaturePayload = LicenseSignaturePayload.builder()
                    .licenseNumber(licenseFilePayload.licenseNumber())
                    .licenseKey(licenseFilePayload.licenseKey())
                    .type(licenseFilePayload.type())
                    .status(licenseFilePayload.status())
                    .issueDate(licenseFilePayload.issueDate())
                    .activationDate(licenseFilePayload.activationDate())
                    .expiryDate(licenseFilePayload.expiryDate())
                    .machineFingerprint(licenseFilePayload.machineFingerprint())
                    .customerId(licenseFilePayload.customerId())
                    .customerName(licenseFilePayload.customerName())
                    .customerEmail(licenseFilePayload.customerEmail())
                    .companyName(licenseFilePayload.companyName())
                    .planId(licenseFilePayload.planId())
                    .planName(licenseFilePayload.planName())
                    .planDescription(licenseFilePayload.planDescription())
                    .planMaxUsers(licenseFilePayload.planMaxUsers())
                    .productId(licenseFilePayload.productId())
                    .build();
            String signedData = objectMapper.writeValueAsString(licenseSignaturePayload);

            // 4. Verify RSA signature
            boolean valid = licenseSignatureService.verify(signedData, licenseFilePayload.signature());
            if (!valid) {
                throw new BadRequestException("Invalid license signature.");
            }

            // 5. Verify machine
            if (!machineFingerprint.equals(licenseFilePayload.machineFingerprint())) {
                throw new BadRequestException("License is not valid for this machine.");
            }

            // 6. Verify expiry
            if (licenseFilePayload.expiryDate() != null && licenseFilePayload.expiryDate().isBefore(LocalDate.now())) {
                throw new BadRequestException("License has expired.");
            }

            // 7. Convert to database entity
            License entity = licenseMapper.toEntity(licenseFilePayload);

            // 8. Save Table
            License saved = licenseRepository.save(entity);

            // 9. Save File To ProgramData
            licenseFileStorageService.save(licenseFilePayload.licenseNumber(), licenseFile.getBytes());

            // 10. Return
            return licenseMapper.toResponse(saved);
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("Invalid license file.");
        }
    }

    @Override
    public LicenseResponse activateLicense(String licenseKey) {

        String machineFingerprint = machineFingerprintService.getMachineFingerprint();

        ApiResponse<LicenseActivationResponse> res = licenseServerClient.activateLicense(
                LicenseActivationRequest.builder()
                        .licenseKey(licenseKey)
                        .machineFingerprint(machineFingerprint)
                        .productId(1L)
                        .build());

        if (res.getData().licenseFile() != null && res.getData().licenseFile().length > 0) {
            licenseFileStorageService.save(res.getData().licenseNumber(), res.getData().licenseFile());
        }
        License license = licenseMapper.toEntity(res.getData());
        License saved = licenseRepository.save(license);
        return licenseMapper.toResponse(saved);
    }

}
