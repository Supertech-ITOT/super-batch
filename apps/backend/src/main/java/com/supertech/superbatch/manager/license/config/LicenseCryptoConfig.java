package com.supertech.superbatch.manager.license.config;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.supertech.superbatch.common.exception.BadRequestException;

@Configuration
public class LicenseCryptoConfig {

    @Value("${license.public-key}")
    private String publicKey;

    @Bean
    public PublicKey licensePublicKey() {
        try {
            byte[] decodedKey = Base64.getDecoder().decode(publicKey);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            throw new BadRequestException("Failed to load license public key");
        }
    }
}