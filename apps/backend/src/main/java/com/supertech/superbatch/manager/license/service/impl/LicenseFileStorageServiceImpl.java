package com.supertech.superbatch.manager.license.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.service.LicenseFileStorageService;

@Service
public class LicenseFileStorageServiceImpl implements LicenseFileStorageService {

    private final Path licenseDirectory;

    public LicenseFileStorageServiceImpl() {
        String programData = System.getenv("PROGRAMDATA");
        if (programData == null || programData.isBlank()) {
            throw new IllegalStateException("PROGRAMDATA environment variable not found.");
        }
        this.licenseDirectory = Paths.get(programData, "SuperBatch", "licenses");
    }

    @Override
    public String save(String licenseNumber, byte[] file) {
        try {
            Files.createDirectories(licenseDirectory);
            String fileName = licenseNumber + ".lic";
            Path filePath = licenseDirectory.resolve(fileName);
            Files.write(filePath, file);
            return filePath.toString();
        } catch (IOException e) {
            throw new BadRequestException("Failed to save license file");
        }
    }

    @Override
    public Path get(String licenseNumber) {
        Path filePath = licenseDirectory.resolve(licenseNumber + ".lic");
        if (!Files.exists(filePath)) {
            throw new ResourceNotFoundException("License file not found: " + licenseNumber);
        }
        return filePath;
    }

    @Override
    public void delete(String licenseNumber) {
        Path filePath = licenseDirectory.resolve(licenseNumber + ".lic");
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new BadRequestException("Failed to delete license file");
        }
    }
}