package com.supertech.superbatch.manager.license.crypto.impl;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.PublicKey;
import java.security.Signature;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.crypto.LicenseSignatureService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseSignatureServiceImpl implements LicenseSignatureService {
    private final PublicKey licensePublicKey;

    @Override
    public boolean verify(String data, String signature) {
        try {
            Signature verifier = Signature.getInstance("SHA256withRSA");
            verifier.initVerify(licensePublicKey);
            verifier.update(data.getBytes(StandardCharsets.UTF_8));
            byte[] signatureBytes = Base64.getDecoder().decode(signature);
            return verifier.verify(signatureBytes);
        } catch (GeneralSecurityException e) {
            throw new BadRequestException("Invalid license signature.");
        }
    }
}