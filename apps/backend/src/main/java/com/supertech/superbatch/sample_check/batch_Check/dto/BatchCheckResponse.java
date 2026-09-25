package com.supertech.superbatch.sample_check.batch_check.dto;

import java.time.LocalDateTime;

import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;

import lombok.Builder;

@Builder
public record BatchCheckResponse(
                Long id,
                String batchNo,
                Integer stepNo,
                LocalDateTime sampleDateTime,
                String checkParameterName,
                String value,
                Integer loop,
                ResultStatus resultStatus) {

}
