package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TrialLicenseResponse(
        String licenseNumber,
        String customerName,
        String licenseKey,
        String companyName,
        String type,
        String status,
        LocalDate issueDate,
        LocalDateTime activationDate,
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
