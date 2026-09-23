package com.supertech.superbatch.sample_check.batch_check.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record BatchCheckResponse(
        Long id,
        String batchNo,
        Integer stepNo,
        LocalDateTime sampleDateTime,
        List<BatchCheckResultResponse> results) {

}
