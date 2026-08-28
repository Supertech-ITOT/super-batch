package com.supertech.superbatch.manager.license.validation;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.enums.LicenseActivationType;

@Component
public class LicenseValidator {
    public void validateLicenseRequest(LicenseActivationType licenseActivationType, String licenseKey,
            MultipartFile licenseFile, Boolean isTrial) {
        if (licenseActivationType == LicenseActivationType.ONLINE) {
            if (licenseFile != null && !licenseFile.isEmpty()) {
                throw new BadRequestException("License file is not supported for online activation.");
            }
            if (!Boolean.TRUE.equals(isTrial)
                    && (licenseKey == null || licenseKey.isBlank())) {
                throw new BadRequestException("License key is required for online activation.");
            }
        }

        if (licenseActivationType == LicenseActivationType.OFFLINE) {
            if (licenseFile == null || licenseFile.isEmpty()) {
                throw new BadRequestException("License file is required for offline activation.");
            }
            if (Boolean.TRUE.equals(isTrial)) {
                throw new BadRequestException("Trial activation is only available online.");
            }
        }
    }
}
