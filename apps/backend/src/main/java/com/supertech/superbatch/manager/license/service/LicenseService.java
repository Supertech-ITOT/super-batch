package com.supertech.superbatch.manager.license.service;

import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.manager.license.dto.LicenseResponse;

public interface LicenseService {

    LicenseResponse get();

    void activateTrialLicense(String name, String email, String companyName);

    LicenseResponse activateOfflineLicense(MultipartFile licenseFile);

    LicenseResponse activateLicense(String licenseKey);

    boolean validateLicense();

    boolean isActivated();

    boolean isLicenseValid();

}
