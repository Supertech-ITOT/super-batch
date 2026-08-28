package com.supertech.superbatch.manager.license.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
