package com.supertech.superbatch.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record LicenseResponse(
                Long id,
                String licenseKey,
                String licenseNumber,
                String machineFingerprint,
                String customerName,
                String companyName,
                String status,
                LocalDate expiryDate,
                LocalDateTime activationDate,
                LocalDateTime lastValidatedAt,
                Integer userCount,
                Long planId,
                String planName,
                String planDescription,
                Integer planMaxUser) {
}