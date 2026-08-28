package com.supertech.superbatch.manager.setup.dto;

import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.manager.license.enums.LicenseActivationType;

public record SetupRequest(
        String name,
        String email,
        String password,
        String companyName,
        LicenseActivationType activationType,
        String licenseKey,
        MultipartFile licenseFile,
        Boolean isTrial) {
}