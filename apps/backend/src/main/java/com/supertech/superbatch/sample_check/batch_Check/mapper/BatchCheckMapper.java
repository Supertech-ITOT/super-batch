package com.supertech.superbatch.sample_check.batch_check.mapper;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.sample_check.batch_check.dto.BatchCheckResponse;
import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_check_result.entity.BatchCheckResult;
import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;

@Component
public class BatchCheckMapper {

    public BatchCheckResponse toResponse(BatchCheckResult result) {
        return BatchCheckResponse.builder()
                .id(result.getId())
                .batchNo(result.getBatchCheck().getBatch().getBatchNo())
                .stepNo(result.getBatchCheck().getBatchSOP().getStepNo())
                .loop(result.getLoop())
                .checkParameterName(result.getCheckParameter().getName())
                .value(result.getValue())
                .resultStatus(result.getResultStatus())
                .sampleDateTime(result.getBatchCheck().getSampleDateTime())
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

    public BatchCheckResult toEntity(CheckParameter parameter, String value, ResultStatus status, Integer loop) {
        return BatchCheckResult.builder()
                .checkParameter(parameter)
                .value(value)
                .loop(loop)
                .resultStatus(status)
                .build();
    }
}