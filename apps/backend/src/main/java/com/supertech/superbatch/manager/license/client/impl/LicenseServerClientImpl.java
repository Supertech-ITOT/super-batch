package com.supertech.superbatch.manager.license.client.impl;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.dto.TrialActivationRequest;
import com.supertech.superbatch.manager.license.dto.TrialActivationResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LicenseServerClientImpl implements LicenseServerClient {
    private final RestClient licenseServerRestClient;

    @Override
    public TrialActivationResponse activateTrial(TrialActivationRequest request) {
        return licenseServerRestClient.post()
                .uri("/api/licenses/trial")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    String errorBody = new String(res.getBody().readAllBytes());

                    System.out.println("License server error: " + errorBody);

                    throw new RuntimeException(
                            "License server returned " +
                                    res.getStatusCode() +
                                    ": " + errorBody);
                })
                .body(TrialActivationResponse.class);
    }
}
