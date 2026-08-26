package com.supertech.superbatch.manager.license.service;

import java.nio.file.Path;

public interface LicenseFileStorageService {

    String save(String licenseNumber, byte[] file);

    Path get(String licenseNumber);

    void delete(String licenseNumber);
}