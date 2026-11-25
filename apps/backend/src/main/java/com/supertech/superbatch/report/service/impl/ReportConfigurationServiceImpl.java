package com.supertech.superbatch.report.service.impl;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.supertech.superbatch.common.exception.BadRequestException;
import com.supertech.superbatch.common.service.CompanyFileStorageService;
import com.supertech.superbatch.report.service.ReportConfigurationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportConfigurationServiceImpl implements ReportConfigurationService {

    private final CompanyFileStorageService companyFileStorageService;

    @Override
    public String getCompanyLogo() {
        return companyFileStorageService.getCompanyLogo();
    }

    @Override
    public void uploadCompanyLogo(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Company logo file is required.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("image/png")) {
            throw new BadRequestException("Only PNG images are allowed.");
        }

        try {
            companyFileStorageService.save(file.getBytes(), "logo.png");
        } catch (IOException e) {
            throw new BadRequestException("Failed to read company logo file.");
        }
    }

    @Override
    public void deleteCompanyLogo() {
        companyFileStorageService.deleteCompanyLogo();
    }
}