package com.supertech.superbatch.manager.license.client.impl;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.dto.LicenseActivationResponse;
import com.supertech.superbatch.manager.license.dto.LicenseKeyActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialActivationRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LicenseServerClientImpl implements LicenseServerClient {
    private final RestClient licenseServerRestClient;

    @Override
    public LicenseActivationResponse activateTrial(TrialActivationRequest request) {
        return licenseServerRestClient.post()
                .uri("/api/licenses/activate/trial")
                .body(request)
                .retrieve()
                .body(LicenseActivationResponse.class);
    }

    @Override
    public LicenseActivationResponse activateLicense(LicenseKeyActivationRequest request) {
        return licenseServerRestClient.post()
                .uri("/api/licenses/activate")
                .body(request)
                .retrieve()
                .body(LicenseActivationResponse.class);
    }

}
