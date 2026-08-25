package com.supertech.superbatch.manager.license.dto;

public record LicenseKeyActivationRequest(
        String licenseKey,
        String machineId) {

}
