package com.supertech.superbatch.manager.license.client;

import com.supertech.superbatch.manager.license.dto.LicenseKeyActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseActivationResponse;

public interface LicenseServerClient {

        TrialLicenseActivationResponse activateTrial(
                        TrialActivationRequest request);

        TrialLicenseActivationResponse activateLicense(
                        LicenseKeyActivationRequest request);

}
