package com.supertech.superbatch.license.service;

import com.supertech.superbatch.license.dto.CreateLicenseRequest;
import com.supertech.superbatch.license.dto.LicenseResponse;
import com.supertech.superbatch.license.dto.UpdateLicenseRequest;

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
