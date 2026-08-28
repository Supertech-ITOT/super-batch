package com.supertech.superbatch.manager.license.dto;

import java.time.LocalDate;

import lombok.Builder;

@Builder
public record LicenseSignaturePayload(
                String licenseNumber,
                String licenseKey,
                String type,
                String status,
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