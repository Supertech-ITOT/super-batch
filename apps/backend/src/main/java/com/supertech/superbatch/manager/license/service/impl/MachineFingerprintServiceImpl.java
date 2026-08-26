package com.supertech.superbatch.manager.license.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.manager.license.service.MachineFingerprintService;

@Service
public class MachineFingerprintServiceImpl implements MachineFingerprintService {

    @Override
    public String getMachineFingerprint() {
        String machineGuid = getMachineGuid();
        if (machineGuid == null || machineGuid.isBlank()) {
            throw new BadRequestException("Unable to retrieve Windows MachineGuid.");
        }

        return sha256(machineGuid);
    }

    private String getMachineGuid() {

        try {
            Process process = new ProcessBuilder(
                    "reg",
                    "query",
                    "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography",
                    "/v",
                    "MachineGuid").redirectErrorStream(true).start();

            String output = new String(
                    process.getInputStream().readAllBytes(),
                    StandardCharsets.UTF_8);

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                return null;
            }

            for (String line : output.split("\\R")) {

                if (line.contains("MachineGuid")) {

                    String[] parts = line.trim().split("\\s+");

                    if (parts.length >= 3) {
                        return parts[parts.length - 1];
                    }
                }
            }

            return null;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to retrieve Windows MachineGuid.",
                    e);
        }
    }

    private String sha256(String value) {

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(
                    value.getBytes(StandardCharsets.UTF_8));

            StringBuilder result = new StringBuilder();

            for (byte b : hash) {
                result.append(String.format("%02x", b));
            }

            return result.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new BadRequestException(
                    "SHA-256 algorithm not available.");
        }
    }
}