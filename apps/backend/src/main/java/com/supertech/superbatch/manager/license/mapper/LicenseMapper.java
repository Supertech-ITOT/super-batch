package com.supertech.superbatch.manager.license.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;
import com.supertech.superbatch.manager.license.dto.UpdateLicenseRequest;
import com.supertech.superbatch.manager.license.entity.License;

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

    public License toTrialEntity(TrialLicenseResponse res) {
        return License.builder()
                .licenseKey(res.licenseKey())
                .licenseNumber(res.licenseNumber())
                .machineFingerprint(res.machineFingerprint())
                .customerName(res.customerName())
                .companyName(res.companyName())
                .status(res.status())
                .expiryDate(res.expiryDate())
                .activationDate(res.activationDate())
                .lastValidatedAt(LocalDateTime.now())
                .planId(res.planId())
                .planDescription(res.planDescription())
                .planName(res.planName())
                .planMaxUser(res.planMaxUser())
                .build();

    }

}