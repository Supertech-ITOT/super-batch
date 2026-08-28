package com.supertech.superbatch.manager.license.dto;

import lombok.Builder;

@Builder
public record LicenseActivationRequest(
        String licenseKey,
        String machineFingerprint,
        Long productId) {
}