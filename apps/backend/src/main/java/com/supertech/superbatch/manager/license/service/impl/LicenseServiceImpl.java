package com.supertech.superbatch.manager.license.service.impl;

import org.springframework.stereotype.Service;

import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.UpdateLicenseRequest;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.mapper.LicenseMapper;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.license.service.LicenseService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LicenseServiceImpl implements LicenseService {
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;

    @Override
    public LicenseResponse get() {
        License license = licenseRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("License not activated."));
        return licenseMapper.toResponse(license);
    }

    @Override
    public void activate(CreateLicenseRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'activate'");
    }

    @Override
    public void validate() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'validate'");
    }

    @Override
    public boolean isActive() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isActive'");
    }

    @Override
    public void deactivate() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deactivate'");
    }

    @Override
    public void renew(UpdateLicenseRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'renew'");
    }

    @Override
    public String getMachineId() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMachineId'");
    }

    @Override
    public void startupValidation() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'startupValidation'");
    }

}
