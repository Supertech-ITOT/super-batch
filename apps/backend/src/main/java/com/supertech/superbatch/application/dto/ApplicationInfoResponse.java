package com.supertech.superbatch.application.dto;

import lombok.Builder;

@Builder
public record ApplicationInfoResponse(
        String name,
        String version,
        String buildTime) {
}