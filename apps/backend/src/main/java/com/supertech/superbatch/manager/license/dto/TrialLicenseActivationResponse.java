package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;

import com.supertech.superbatch.manager.license.enums.LicenseStatus;
import com.supertech.superbatch.manager.license.enums.LicenseType;

public record TrialLicenseActivationResponse(
        String licenseNumber,
        String licenseKey,
        LicenseType type,
        LicenseStatus status,
        LocalDate issueDate,
        LocalDate activationDate,
        LocalDate expiryDate,
        String machineFingerprint,
        String licenseFileName,
        Long productId,
        byte[] licenseFile

) {

}
