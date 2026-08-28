package com.supertech.superbatch.manager.license.crypto.impl;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.PublicKey;
import java.security.Signature;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.crypto.LicenseSignaturePayload;
import com.supertech.superbatch.manager.license.crypto.LicenseSignaturePayloadMapper;
import com.supertech.superbatch.manager.license.crypto.LicenseSignatureService;
import com.supertech.superbatch.manager.license.dto.LicenseFilePayload;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseSignatureServiceImpl implements LicenseSignatureService {

    private final PublicKey licensePublicKey;
    private final ObjectMapper objectMapper;
    private final LicenseSignaturePayloadMapper payloadMapper;

    @Override
    public boolean verify(LicenseFilePayload payload) {

        try {
            LicenseSignaturePayload signaturePayload = payloadMapper.toSignaturePayload(payload);
            String signedData = objectMapper.writeValueAsString(signaturePayload);
            Signature verifier = Signature.getInstance("SHA256withRSA");
            verifier.initVerify(licensePublicKey);
            verifier.update(signedData.getBytes(StandardCharsets.UTF_8));
            byte[] signatureBytes = Base64.getDecoder().decode(payload.signature());
            return verifier.verify(signatureBytes);
        } catch (GeneralSecurityException | JsonProcessingException e) {
            throw new BadRequestException("Invalid license signature.");
        }
    }
}