package com.supertech.superbatch.manager.license.validation;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class LicenseValidationScheduler {

    private final LicenseService licenseService;

    @Scheduled(fixedDelayString = "${license.validation.interval}")
    public void validateLicense() {

        if (!licenseService.isActivated()) {
            return;
        }

        try {
            licenseService.validateLicense();
            log.info("Scheduled license validation successful.");
        } catch (Exception e) {
            log.error("Scheduled license validation failed: {}", e.getMessage());
        }
    }
}