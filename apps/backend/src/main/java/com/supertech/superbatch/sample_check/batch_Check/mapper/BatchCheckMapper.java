package com.supertech.superbatch.sample_check.batch_check.mapper;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResponse;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResultResponse;
import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_check_result.entity.BatchCheckResult;
import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;

@Component
public class BatchCheckMapper {

    public BatchCheckResponse toResponse(BatchCheck batchCheck) {
        return BatchCheckResponse.builder()
                .id(batchCheck.getId())
                .batchNo(batchCheck.getBatch().getBatchNo())
                .stepNo(batchCheck.getBatchSOP().getStepNo())
                .sampleDateTime(batchCheck.getSampleDateTime())
                .results(batchCheck.getResults().stream()
                        .map(this::toResponse)
                        .toList())
                .build();
    }

    private BatchCheckResultResponse toResponse(BatchCheckResult batchCheckResult) {
        return BatchCheckResultResponse.builder()
                .id(batchCheckResult.getId())
                .checkParameterName(batchCheckResult.getCheckParameter().getName())
                .value(batchCheckResult.getValue())
                .resultStatus(batchCheckResult.getResultStatus())
                .build();
    }

    public BatchCheck toEntity(Batch batch, BatchSOP batchSOP, Set<BatchCheckResult> results) {
        return BatchCheck.builder()
                .batch(batch)
                .batchSOP(batchSOP)
                .sampleDateTime(LocalDateTime.now())
                .results(results)
                .build();
    }

    public BatchCheckResult toEntity(CheckParameter parameter, String value, ResultStatus status) {
        return BatchCheckResult.builder()
                .checkParameter(parameter)
                .value(value)
                .resultStatus(status)
                .build();
    }
}