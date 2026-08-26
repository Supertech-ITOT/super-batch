package com.supertech.superbatch.manager.license.service;

import com.supertech.superbatch.manager.license.dto.LicenseResponse;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;

public interface LicenseService {

    LicenseResponse get();

    void saveTrial(TrialLicenseResponse res);

}
