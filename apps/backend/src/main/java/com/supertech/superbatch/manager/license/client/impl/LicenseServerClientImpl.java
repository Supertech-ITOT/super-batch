package com.supertech.superbatch.manager.license.client.impl;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.supertech.superbatch.common.dto.ApiResponse;
import com.supertech.superbatch.common.exception.LicenseServerException;
import com.supertech.superbatch.manager.license.client.LicenseServerClient;
import com.supertech.superbatch.manager.license.dto.TrialLicenseRequest;
import com.supertech.superbatch.manager.license.dto.TrialLicenseResponse;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class LicenseServerClientImpl implements LicenseServerClient {

    private final RestClient licenseServerRestClient;
    private final ObjectMapper objectMapper;

    @Override
    public ApiResponse<TrialLicenseResponse> activateTrial(TrialLicenseRequest request) {
        return licenseServerRestClient.post()
                .uri("/api/licenses/trial")
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    try {
                        String errorBody = new String(res.getBody().readAllBytes());
                        ApiResponse<?> errorResponse = objectMapper.readValue(errorBody, ApiResponse.class);
                        throw new LicenseServerException(errorResponse.getMessage(),
                                HttpStatus.valueOf(res.getStatusCode().value()));
                    } catch (LicenseServerException ex) {
                        throw ex;
                    } catch (Exception ex) {
                        throw new LicenseServerException("License server returned an error", HttpStatus.BAD_GATEWAY);
                    }
                })
                .body(new ParameterizedTypeReference<ApiResponse<TrialLicenseResponse>>() {
                });
    }
}