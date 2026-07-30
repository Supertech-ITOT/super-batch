package com.supertech.superbatch.license.dto;

import lombok.Builder;

@Builder
public record CreateLicenseRequest(

        String licenseKey

) {
}
