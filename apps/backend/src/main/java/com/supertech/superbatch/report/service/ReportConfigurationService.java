package com.supertech.superbatch.report.service;

import org.springframework.web.multipart.MultipartFile;

public interface ReportConfigurationService {
    void uploadCompanyLogo(MultipartFile file);

    void deleteCompanyLogo();

    String getCompanyLogo();

}