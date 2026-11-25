package com.supertech.superbatch.common.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.common.service.CompanyFileStorageService;

@Service
public class CompanyFileStorageServiceImpl implements CompanyFileStorageService {

    private final Path companyDirectory;

    public CompanyFileStorageServiceImpl() {
        String programData = System.getenv("PROGRAMDATA");
        if (programData == null || programData.isBlank()) {
            throw new IllegalStateException("PROGRAMDATA environment variable not found.");
        }
        this.companyDirectory = Paths.get(programData, "Supertech", "SuperBatch", "Data", "Company");
    }

    @Override
    public String save(byte[] file, String fileName) {
        try {
            Files.createDirectories(companyDirectory);
            Path filePath = companyDirectory.resolve(fileName);
            Files.write(filePath, file);
            return filePath.toString();
        } catch (IOException e) {
            throw new BadRequestException("Failed to save company logo");
        }
    }

    @Override
    public Path get(String fileName) {
        Path filePath = companyDirectory.resolve(fileName).normalize();
        if (!filePath.startsWith(companyDirectory.normalize())) {
            throw new BadRequestException("Invalid file path");
        }
        if (!Files.exists(filePath)) {
            throw new ResourceNotFoundException("Company logo not found");
        }
        return filePath;
    }

    @Override
    public String getCompanyLogo() {
        try {
            Path logoPath = get("logo.png");
            byte[] bytes = Files.readAllBytes(logoPath);
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
        } catch (ResourceNotFoundException e) {
            return null;
        } catch (IOException e) {
            throw new BadRequestException("Failed to read company logo: " + e);
        }
    }

    @Override
    public void deleteCompanyLogo() {
        try {
            Path logoPath = companyDirectory.resolve("logo.png");
            Files.deleteIfExists(logoPath);
        } catch (IOException e) {
            throw new BadRequestException("Failed to delete company logo");
        }
    }
}