package com.supertech.superbatch.report.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;

import lombok.Builder;

@Builder
public record QualityCheckResponse(
                Long id,
                String batchNo,
                List<QualityCheckStatisticsData> statsData,
                List<QualityCheckSampleList> list) {

        @Builder
        public record QualityCheckStatisticsData(
                        String label,
                        Double value,
                        Boolean isPassed) {
        }

        @Builder
        public record QualityCheckSampleList(
                        Long id,
                        LocalDateTime sampleDateTime,
                        String sampleNo,
                        Double totalParameters,
                        Double passedParameters,
                        Double failedParameters,
                        List<QualityCheckSampleResult> results) {

        }

        @Builder
        public record QualityCheckSampleResult(
                        Long id,
                        String parameterName,
                        String value,
                        CheckParameterType type,
                        Integer stepNo,
                        Integer loop,
                        Double min,
                        Double max,
                        List<String> allowedOptions,
                        List<String> notAllowedOptions,
                        ResultStatus resultStatus) {
        }
}
