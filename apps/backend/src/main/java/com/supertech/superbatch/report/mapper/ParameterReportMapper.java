package com.supertech.superbatch.report.mapper;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.DoubleSummaryStatistics;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop_parameter.entity.BatchSOPParameter;
import com.supertech.superbatch.plant.parameter.entity.Parameter;
import com.supertech.superbatch.report.dto.ParameterValueResponse.ParameterValueData;
import com.supertech.superbatch.report.dto.ParameterValueResponse.ParameterValueStatisticsData;

@Component
public class ParameterReportMapper {

        public List<ParameterValueStatisticsData> toParameterStatisticsResponse(Batch batch) {
                Map<Long, List<BatchSOPParameter>> groupedParameters = batch.getSops().stream()
                                .flatMap(sop -> sop.getParameters().stream())
                                .filter(p -> p.getActValue() != null)
                                .collect(Collectors.groupingBy(p -> p.getParameter().getId()));

                List<ParameterValueStatisticsData> response = new java.util.ArrayList<>();

                for (List<BatchSOPParameter> parameters : groupedParameters.values()) {

                        DoubleSummaryStatistics statistics = parameters.stream()
                                        .mapToDouble(BatchSOPParameter::getActValue)
                                        .summaryStatistics();

                        double deviation = parameters.stream()
                                        .mapToDouble(p -> p.getActValue() - p.getStdValue())
                                        .average()
                                        .orElse(0.0);

                        double deviationPercentage = parameters.stream()
                                        .filter(p -> p.getStdValue() != 0)
                                        .mapToDouble(p -> ((p.getActValue() - p.getStdValue())
                                                        / Math.abs(p.getStdValue())) * 100)
                                        .average()
                                        .orElse(0.0);

                        Parameter parameter = parameters.get(0).getParameter();

                        response.add(buildStatistic("Minimum Value", parameter, statistics.getMin(), false));
                        response.add(buildStatistic("Maximum Value", parameter, statistics.getMax(), false));
                        response.add(buildStatistic("Average Value", parameter, statistics.getAverage(), false));
                        response.add(buildStatistic("Deviation Value", parameter, deviation, true));
                        response.add(buildStatistic("Deviation %", parameter, deviationPercentage, true));
                }

                return response;
        }

        private ParameterValueStatisticsData buildStatistic(String label, Parameter parameter, Double value,
                        boolean highlight) {
                return ParameterValueStatisticsData.builder()
                                .label(label)
                                .parameterId(parameter.getId())
                                .parameterName(parameter.getName())
                                .value(value)
                                .unit(parameter.getUom().getSymbol())
                                .highlight(highlight)
                                .build();
        }

        public List<ParameterValueData> toParameterValueDataResponse(Batch batch) {
                List<ParameterValueData> response = new ArrayList<>();
                batch.getSops().forEach(sop -> {
                        sop.getParameters().forEach(parameter -> {
                                Double stdVal = parameter.getStdValue() != null ? parameter.getStdValue() : 0.00;
                                Double actVal = parameter.getActValue() != null ? parameter.getActValue() : 0.00;
                                Double deviation = actVal - stdVal;
                                Double deviationPercent = stdVal != 0 ? (deviation / Math.abs(stdVal)) * 100 : 0.00;
                                response.add(ParameterValueData.builder()
                                                .parameterId(parameter.getParameter().getId())
                                                .parameterName(parameter.getParameter().getName())
                                                .stepNo(sop.getStepNo())
                                                .dateTime(sop.getEndDateTime())
                                                .stdVal(stdVal)
                                                .actVal(actVal)
                                                .deviation(deviation)
                                                .deviationPercent(deviationPercent)
                                                .build());
                        });
                });
                return response.stream()
                                .sorted(Comparator.comparing(ParameterValueData::parameterId)
                                                .thenComparing(ParameterValueData::stepNo))
                                .toList();
        }

}
