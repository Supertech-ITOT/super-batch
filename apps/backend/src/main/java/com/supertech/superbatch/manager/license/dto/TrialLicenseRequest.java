package com.supertech.superbatch.manager.license.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
public record TrialLicenseRequest(
        @NotNull(message = "Email is required") String email,
        @NotNull(message = "Company Name is required") String companyName,
        @NotNull(message = "Name is required") String name,
        @NotNull(message = "At least one product is required") @Positive(message = "Product ID must be positive") Long productId,
        @NotBlank(message = "Machine fingerprint is required") String machineFingerprint) {

}
