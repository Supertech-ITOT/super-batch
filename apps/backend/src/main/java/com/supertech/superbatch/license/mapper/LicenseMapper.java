package com.supertech.superbatch.license.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.license.dto.LicenseResponse;
import com.supertech.superbatch.license.dto.UpdateLicenseRequest;
import com.supertech.superbatch.license.entity.License;

@Component
public class LicenseMapper {

    public LicenseResponse toResponse(License license) {
        if (license == null) {
            return null;
        }

        return LicenseResponse.builder()
                .id(license.getId())
                .licenseKey(license.getLicenseKey())
                .licenseNumber(license.getLicenseNumber())
                .machineFingerprint(license.getMachineFingerprint())
                .customerName(license.getCustomerName())
                .companyName(license.getCompanyName())
                .status(license.getStatus())
                .expiryDate(license.getExpiryDate())
                .activationDate(license.getActivationDate())
                .lastValidatedAt(license.getLastValidatedAt())
                .userCount(license.getUserCount())
                .planId(license.getPlanId())
                .planName(license.getPlanName())
                .planDescription(license.getPlanDescription())
                .planMaxUser(license.getPlanMaxUser())
                .build();
    }

    public License toEntity(CreateLicenseRequest request) {
        return License.builder()
                .licenseKey(request.licenseKey())
                .build();
    }

    public License toEntity(UpdateLicenseRequest request) {
        return License.builder()
                .licenseKey(request.licenseKey())
                .build();
    }

}