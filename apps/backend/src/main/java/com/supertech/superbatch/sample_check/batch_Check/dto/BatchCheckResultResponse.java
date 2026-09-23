package com.supertech.superbatch.sample_check.batch_check.dto;

import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;

import lombok.Builder;

@Builder
public record BatchCheckResultResponse(
                Long id,
                String checkParameterName,
                String value,
                ResultStatus resultStatus) {

}
