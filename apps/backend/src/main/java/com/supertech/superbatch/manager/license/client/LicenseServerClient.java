package com.supertech.superbatch.manager.license.client;

import com.supertech.superbatch.manager.license.dto.TrialActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialActivationResponse;

public interface LicenseServerClient {

        TrialActivationResponse activateTrial(TrialActivationRequest request);

}
