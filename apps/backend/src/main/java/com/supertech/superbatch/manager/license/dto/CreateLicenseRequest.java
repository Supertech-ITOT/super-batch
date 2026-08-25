package com.supertech.superbatch.manager.license.dto;

import lombok.Builder;

@Builder
public record CreateLicenseRequest(

                String licenseKey

) {
}
