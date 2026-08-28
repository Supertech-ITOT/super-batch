package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;

import com.supertech.superbatch.manager.license.enums.LicenseStatus;

public record LicenseActivationResponse(
        String licenseNumber,
        String customerName,
        String customerEmail,
        String licenseKey,
        String companyName,
        String type,
        LicenseStatus status,
        LocalDate issueDate,
        LocalDate activationDate,
        Long planId,
        String planName,
        String planDescription,
        Integer planMaxUser,
        LocalDate expiryDate,
        String machineFingerprint,
        String licenseFileName,
        Long productId,
        byte[] licenseFile

) {

}
