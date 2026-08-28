package com.supertech.superbatch.manager.license.client;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.manager.license.dto.LicenseActivationRequest;
import com.supertech.superbatch.manager.license.dto.LicenseActivationResponse;
import com.supertech.superbatch.manager.license.dto.TrialLicenseRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;

public interface LicenseServerClient {

        ApiResponse<TrialLicenseResponse> activateTrial(TrialLicenseRequest request);

        ApiResponse<LicenseActivationResponse> activateLicense(LicenseActivationRequest request);

}
