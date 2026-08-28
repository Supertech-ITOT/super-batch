package com.supertech.superbatch.manager.license.crypto;

import java.time.LocalDate;

import com.supertech.superbatch.manager.license.enums.LicenseStatus;

import lombok.Builder;

@Builder
public record LicenseSignaturePayload(
        String licenseNumber,
        String licenseKey,
        String type,
        LicenseStatus status,
        LocalDate issueDate,
        LocalDate activationDate,
        LocalDate expiryDate,
        String machineFingerprint,
        Long customerId,
        String customerName,
        String customerEmail,
        String companyName,
        Long planId,
        String planName,
        String planDescription,
        Integer planMaxUsers,
        Long productId) {
}