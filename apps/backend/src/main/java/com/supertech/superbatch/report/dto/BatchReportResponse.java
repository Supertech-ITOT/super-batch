package com.supertech.superbatch.report.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record BatchReportResponse(
                BatchesResponse info,
                List<BatchSopResponse> sops,
                MaterialQuantityResponse mat,
                ParameterValueResponse par,
                QualityCheckResponse qc) {
}
