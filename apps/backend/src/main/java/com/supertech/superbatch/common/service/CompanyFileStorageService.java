package com.supertech.superbatch.common.service;

import java.nio.file.Path;

public interface CompanyFileStorageService {
    String save(byte[] file, String fileName);

    Path get(String fileName);

    String getCompanyLogo();

    void deleteCompanyLogo();
}
