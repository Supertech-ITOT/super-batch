package com.supertech.superbatch.report.service;

import java.util.List;

import com.supertech.superbatch.report.dto.BatchReportResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import com.supertech.superbatch.report.dto.ReportMetadataResponse;

public interface ReportExportService {
    List<BatchesResponse> generateProductionReport(ReportFilterRequest request);

    BatchReportResponse generateBatchReport(Long id);

    ReportMetadataResponse getMetadata(Long userId);
}
