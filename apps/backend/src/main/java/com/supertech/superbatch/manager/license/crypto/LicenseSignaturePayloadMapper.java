package com.supertech.superbatch.manager.license.crypto;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;

@Component
public class LicenseSignaturePayloadMapper {

    public LicenseSignaturePayload toSignaturePayload(LicenseFilePayload payload) {
        return LicenseSignaturePayload.builder()
                .licenseNumber(payload.licenseNumber())
                .licenseKey(payload.licenseKey())
                .type(payload.type())
                .status(payload.status())
                .issueDate(payload.issueDate())
                .activationDate(payload.activationDate())
                .expiryDate(payload.expiryDate())
                .machineFingerprint(payload.machineFingerprint())
                .customerId(payload.customerId())
                .customerName(payload.customerName())
                .customerEmail(payload.customerEmail())
                .companyName(payload.companyName())
                .planId(payload.planId())
                .planName(payload.planName())
                .planDescription(payload.planDescription())
                .planMaxUsers(payload.planMaxUsers())
                .productId(payload.productId())
                .build();
    }
}