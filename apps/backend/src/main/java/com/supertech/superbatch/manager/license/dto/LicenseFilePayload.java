package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;

public record LicenseFilePayload(
        String licenseNumber,
        String customerName,
        String customerEmail,
        String companyName,
        Long customerId,
        Long planId,
        Integer planMaxUsers,
        String planName,
        String planDescription,
        String licenseKey,
        String type,
        String status,
        LocalDate issueDate,
        LocalDate activationDate,
        LocalDate expiryDate,
        String machineFingerprint,
        String licenseFileName,
        Long productId,
        String signature) {
}