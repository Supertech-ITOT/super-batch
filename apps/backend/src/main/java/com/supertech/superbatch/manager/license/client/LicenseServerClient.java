package com.supertech.superbatch.manager.license.client;

import com.supertech.superbatch.manager.license.dto.LicenseActivationResponse;
import com.supertech.superbatch.manager.license.dto.LicenseKeyActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialActivationRequest;

public interface LicenseServerClient {

    LicenseActivationResponse activateTrial(
            TrialActivationRequest request);

    LicenseActivationResponse activateLicense(
            LicenseKeyActivationRequest request);

}
