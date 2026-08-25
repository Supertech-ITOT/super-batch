package com.supertech.superbatch.license.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.license.dto.LicenseResponse;
import com.supertech.superbatch.license.service.LicenseService;

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

}
