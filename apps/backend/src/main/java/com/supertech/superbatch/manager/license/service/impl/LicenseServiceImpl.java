package com.supertech.superbatch.manager.license.service.impl;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.mapper.LicenseMapper;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.license.service.LicenseFileStorageService;
import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseServiceImpl implements LicenseService {
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;
    private final LicenseFileStorageService licenseFileStorageService;

    @Override
    public LicenseResponse get() {
        License license = licenseRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("License not activated."));
        return licenseMapper.toResponse(license);
    }

    @Override
    public void saveTrial(TrialLicenseResponse res) {

        if (res.licenseFile() != null && res.licenseFile().length > 0) {
            licenseFileStorageService.save(
                    res.licenseNumber(),
                    res.licenseFile());
        }

        License license = licenseMapper.toTrialEntity(res);
        licenseRepository.save(license);
    }

}
