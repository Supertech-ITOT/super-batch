package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;

public record LicenseActivationResponse(
        String licenseNumber,
        String customerName,
        String customerEmail,
        String licenseKey,
        String companyName,
        String type,
        String status,
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
