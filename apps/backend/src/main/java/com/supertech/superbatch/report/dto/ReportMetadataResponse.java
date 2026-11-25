package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record ReportMetadataResponse(
        String generatedBy,
        String generatedByEmail,
        LocalDateTime generatedAt,
        String companyName,
        String companyLogo) {

}
