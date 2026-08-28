package com.supertech.superbatch.manager.license.validation;

import java.time.LocalDate;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.crypto.LicenseSignatureService;
import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;
import com.supertech.superbatch.manager.license.enums.LicenseActivationType;
import com.supertech.superbatch.manager.license.enums.LicenseStatus;
import com.supertech.superbatch.manager.license.service.MachineFingerprintService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LicenseValidator {
    private final LicenseSignatureService licenseSignatureService;
    private final MachineFingerprintService machineFingerprintService;

    public void validateLicenseRequest(LicenseActivationType licenseActivationType, String licenseKey,
            MultipartFile licenseFile, Boolean isTrial) {
        if (licenseActivationType == LicenseActivationType.ONLINE) {
            if (licenseFile != null && !licenseFile.isEmpty()) {
                throw new BadRequestException("License file is not supported for online activation.");
            }
            if (!Boolean.TRUE.equals(isTrial)
                    && (licenseKey == null || licenseKey.isBlank())) {
                throw new BadRequestException("License key is required for online activation.");
            }
        }

        if (licenseActivationType == LicenseActivationType.OFFLINE) {
            if (licenseFile == null || licenseFile.isEmpty()) {
                throw new BadRequestException("License file is required for offline activation.");
            }
            if (Boolean.TRUE.equals(isTrial)) {
                throw new BadRequestException("Trial activation is only available online.");
            }
        }
    }

    public void validateLicensePayload(LicenseFilePayload payload) {

        if (!licenseSignatureService.verify(payload)) {
            throw new BadRequestException("Invalid license signature.");
        }

        String currentFingerprint = machineFingerprintService.getMachineFingerprint();

        if (!currentFingerprint.equals(payload.machineFingerprint())) {
            throw new BadRequestException("License is not valid for this machine.");
        }

        if (payload.expiryDate() != null && payload.expiryDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("License has expired.");
        }

        if (payload.status() != LicenseStatus.ACTIVE) {
            throw new BadRequestException("License is not active.");
        }
    }
}
