package com.supertech.superbatch.manager.license.validation;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class LicenseStartupValidator {

    private final LicenseService licenseService;

    @EventListener(ApplicationReadyEvent.class)
    public void validateOnStartup() {

        if (!licenseService.isActivated()) {
            log.info("No license activated. Skipping startup license validation.");
            return;
        }

        try {
            licenseService.validateLicense();
            log.info("License validated successfully on startup.");
        } catch (Exception e) {
            log.error("License validation failed on startup: {}", e.getMessage());
        }
    }
}