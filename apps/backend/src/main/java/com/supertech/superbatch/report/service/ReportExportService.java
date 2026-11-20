package com.supertech.superbatch.report.service;

import java.util.List;

import com.supertech.superbatch.report.dto.BatchReportResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;

public interface ReportExportService {
    List<BatchesResponse> generateProductionReport(ReportFilterRequest request);

    BatchReportResponse generateBatchReport(Long id);
}
