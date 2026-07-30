package com.supertech.superbatch.license.mapper;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.license.dto.LicenseAudit;
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
                .machineId(license.getMachineId())
                .customerName(license.getCustomerName())
                .companyName(license.getCompanyName())
                .plan(license.getPlan())
                .status(license.getStatus())
                .expiryDate(license.getExpiryDate())
                .activatedAt(license.getActivatedAt())
                .lastValidatedAt(license.getLastValidatedAt())
                .maxClients(license.getMaxClients())
                .version(license.getVersion())
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

    public LicenseAudit copy(License license) {
        if (license == null) {
            return null;
        }

        return LicenseAudit.builder()
                .id(license.getId())
                .licenseKey(license.getLicenseKey())
                .machineId(license.getMachineId())
                .customerName(license.getCustomerName())
                .companyName(license.getCompanyName())
                .plan(license.getPlan())
                .status(license.getStatus())
                .expiryDate(license.getExpiryDate())
                .activatedAt(license.getActivatedAt())
                .lastValidatedAt(license.getLastValidatedAt())
                .maxClients(license.getMaxClients())
                .version(license.getVersion())
                .build();
    }
}