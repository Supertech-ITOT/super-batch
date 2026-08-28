package com.supertech.superbatch.manager.license.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/license")

public class LicenseController {
    private final LicenseService licenseService;

    @GetMapping
    public ResponseEntity<ApiResponse<LicenseResponse>> getLicense() {
        LicenseResponse license = licenseService.get();
        return ResponseEntity.ok(
                ApiResponse.success("License fetched successfully", license));
    }

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<Boolean>> validateLicense() {
        boolean valid = licenseService.validateLicense();
        return ResponseEntity.ok(ApiResponse.success(valid ? "License is valid" : "License is invalid", valid));
    }

    @PostMapping("/activate")
    public ResponseEntity<ApiResponse<LicenseResponse>> activateLicense(@RequestParam String licenseKey) {
        LicenseResponse license = licenseService.activateLicense(licenseKey);
        return ResponseEntity.ok(ApiResponse.success("License activated successfully", license));
    }

    @PostMapping(value = "/activate-offline", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<LicenseResponse>> activateOfflineLicense(
            @RequestPart("licenseFile") MultipartFile licenseFile) {
        LicenseResponse license = licenseService.activateOfflineLicense(licenseFile);
        return ResponseEntity.ok(ApiResponse.success("License activated successfully", license));
    }

    @GetMapping("/valid")
    public ResponseEntity<ApiResponse<Boolean>> isLicenseValid() {
        boolean valid = licenseService.isLicenseValid();
        return ResponseEntity.ok(ApiResponse.success(valid ? "License is valid" : "License is invalid", valid));
    }

}
