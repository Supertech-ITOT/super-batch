package com.supertech.superbatch.license.dto;

import lombok.Builder;

@Builder
public record UpdateLicenseRequest(

        String licenseKey

) {
}