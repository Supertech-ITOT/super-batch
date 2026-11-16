
package com.supertech.superbatch.report.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.sample_check.batch_check.entity.BatchCheck;
import com.supertech.superbatch.sample_check.batch_check_result.entity.BatchCheckResult;
import com.supertech.superbatch.sample_check.batch_check_result.enums.ResultStatus;
import com.supertech.superbatch.sample_check.check_parameter.entity.CheckParameter;
import com.supertech.superbatch.sample_check.check_parameter_options.entity.CheckParameterOptions;
import com.supertech.superbatch.report.dto.QualityCheckResponse.QualityCheckSampleList;
import com.supertech.superbatch.report.dto.QualityCheckResponse.QualityCheckSampleResult;
import com.supertech.superbatch.report.dto.QualityCheckResponse.QualityCheckStatisticsData;

@Component
public class QualityCheckReportMapper {

        public List<QualityCheckStatisticsData> toQualityCheckStatisticsResponse(Batch batch) {
                List<BatchCheckResult> results = batch.getBatchChecks().stream()
                                .flatMap(check -> check.getResults().stream())
                                .toList();
                long totalSamples = batch.getBatchChecks().size();
                long totalParameters = results.stream()
                                .map(result -> result.getCheckParameter().getId())
                                .distinct()
                                .count();
                long passed = results.stream()
                                .filter(result -> result.getResultStatus() == ResultStatus.PASS)
                                .count();
                long failed = results.stream()
                                .filter(result -> result.getResultStatus() == ResultStatus.FAIL)
                                .count();
                double passRate = totalParameters == 0 ? 0 : passed * 100.0 / totalParameters;
                return List.of(
                                stat("Total Samples", totalSamples),
                                stat("Total Parameters", totalParameters),
                                stat("Passed Results", passed, true),
                                stat("Failed Results", failed, false),
                                stat("Pass Rate", passRate));
        }

        public List<QualityCheckSampleList> toQualityCheckSampleListResponse(Batch batch) {
                List<BatchCheck> samples = batch.getBatchChecks().stream()
                                .sorted(Comparator.comparing(BatchCheck::getSampleDateTime,
                                                Comparator.nullsLast(Comparator.naturalOrder())))
                                .toList();
                return IntStream.range(0, samples.size())
                                .mapToObj(i -> toSampleResponse(samples.get(i), i + 1))
                                .toList();
        }

        private QualityCheckSampleList toSampleResponse(BatchCheck sample, int index) {
                List<QualityCheckSampleResult> results = sample.getResults().stream()
                                .map(result -> toSampleResult(result, sample.getBatchSOP().getStepNo()))
                                .toList();
                long passed = results.stream()
                                .filter(result -> result.resultStatus() == ResultStatus.PASS)
                                .count();
                long failed = results.stream()
                                .filter(result -> result.resultStatus() == ResultStatus.FAIL)
                                .count();
                return QualityCheckSampleList.builder()
                                .id(sample.getId())
                                .sampleDateTime(sample.getSampleDateTime())
                                .sampleNo("QC-" + index)
                                .totalParameters((double) results.size())
                                .passedParameters((double) passed)
                                .failedParameters((double) failed)
                                .results(results)
                                .build();
        }

        private QualityCheckSampleResult toSampleResult(BatchCheckResult result, Integer stepNo) {
                CheckParameter parameter = result.getCheckParameter();
                Set<CheckParameterOptions> options = parameter.getCheckParameterOptions();
                return QualityCheckSampleResult.builder()
                                .id(result.getId())
                                .stepNo(stepNo)
                                .loop(result.getLoop())
                                .parameterName(parameter.getName())
                                .value(result.getValue())
                                .type(parameter.getType())
                                .min(parameter.getMin())
                                .max(parameter.getMax())
                                .allowedOptions(options.stream()
                                                .filter(CheckParameterOptions::isAllowed)
                                                .map(CheckParameterOptions::getValue)
                                                .toList())
                                .notAllowedOptions(options.stream()
                                                .filter(option -> !option.isAllowed())
                                                .map(CheckParameterOptions::getValue)
                                                .toList())
                                .resultStatus(result.getResultStatus())
                                .build();
        }

        private QualityCheckStatisticsData stat(String label, double value) {
                return QualityCheckStatisticsData.builder()
                                .label(label)
                                .value(value)
                                .build();
        }

        private QualityCheckStatisticsData stat(String label, double value, Boolean isPassed) {
                return QualityCheckStatisticsData.builder()
                                .label(label)
                                .value(value)
                                .isPassed(isPassed)
                                .build();
        }
}
