package com.supertech.superbatch.report.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.supertech.superbatch.report.dto.BatchSopResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse;
import com.supertech.superbatch.report.dto.ParameterValueResponse;
import com.supertech.superbatch.report.dto.QualityCheckResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;

public interface ReportService {
    Page<BatchesResponse> getBatches(ReportFilterRequest request);

    BatchesResponse getBatchInfoById(Long id);

    List<BatchSopResponse> getBatchSopByBatchId(Long id);

    MaterialQuantityResponse getMaterialQuantityByBatchId(Long id);

    ParameterValueResponse getParameterValueByBatchId(Long id);

    QualityCheckResponse getQualityCheckByBatchId(Long id);

}
