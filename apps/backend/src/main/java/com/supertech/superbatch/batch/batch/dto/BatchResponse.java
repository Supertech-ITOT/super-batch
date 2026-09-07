package com.supertech.superbatch.batch.batch.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record BatchResponse(
        List<StepResponse> steps) {
}