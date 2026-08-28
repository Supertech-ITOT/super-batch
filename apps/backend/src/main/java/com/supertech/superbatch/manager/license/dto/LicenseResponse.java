package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.supertech.superbatch.manager.license.enums.LicenseStatus;

import lombok.Builder;

@Builder
public record LicenseResponse(
                Long id,
                String licenseKey,
                String licenseNumber,
                String machineFingerprint,
                String customerName,
                String customerEmail,
                String companyName,
                LicenseStatus status,
                LocalDate expiryDate,
                LocalDate activationDate,
                LocalDateTime lastValidatedAt,
                Integer userCount,
                Long planId,
                String planName,
                String planDescription,
                Integer planMaxUser) {
}