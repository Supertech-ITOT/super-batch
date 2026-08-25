package com.supertech.superbatch.manager.license.service;

import com.supertech.superbatch.manager.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.UpdateLicenseRequest;

public interface LicenseService {

    LicenseResponse get();

    void activate(CreateLicenseRequest request);

    void validate();

    boolean isActive();

    void deactivate();

    void renew(UpdateLicenseRequest request);

    String getMachineId();

    void startupValidation();
}
