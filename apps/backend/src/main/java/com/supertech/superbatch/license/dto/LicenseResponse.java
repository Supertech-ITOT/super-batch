package com.supertech.superbatch.license.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.supertech.superbatch.license.enums.LicensePlan;
import com.supertech.superbatch.license.enums.LicenseStatus;
import lombok.Builder;

@Builder
public record LicenseResponse(
        Long id,
        String licenseKey,
        String machineId,
        String customerName,
        String companyName,
        LicensePlan plan,
        LicenseStatus status,
        LocalDate expiryDate,
        LocalDateTime activatedAt,
        LocalDateTime lastValidatedAt,
        Integer maxClients,
        String version) {
}