package com.supertech.superbatch.report.service.impl;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.common.service.CompanyFileStorageService;
import com.supertech.superbatch.manager.license.entity.License;
import com.supertech.superbatch.manager.license.enums.LicenseStatus;
import com.supertech.superbatch.manager.license.repository.LicenseRepository;
import com.supertech.superbatch.manager.user.entity.User;
import com.supertech.superbatch.manager.user.repository.UserRepository;
import com.supertech.superbatch.report.dto.BatchReportResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import com.supertech.superbatch.report.dto.ReportMetadataResponse;
import com.supertech.superbatch.report.mapper.BatchReportMapper;
import com.supertech.superbatch.report.service.ReportExportService;
import com.supertech.superbatch.report.service.ReportService;
import com.supertech.superbatch.report.specification.ReportSpecification;
import com.supertech.superbatch.sample_check.material_correction.repository.MaterialCorrectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportExportServiceImpl implements ReportExportService {
        private final BatchRepository batchRepository;
        private final MaterialCorrectionRepository materialCorrectionRepository;
        private final BatchReportMapper batchReportMapper;
        private final ReportService reportService;
        private final UserRepository userRepository;
        private final LicenseRepository licenseRepository;
        private final CompanyFileStorageService companyFileStorageService;

        @Override
        public List<BatchesResponse> generateProductionReport(ReportFilterRequest request) {
                List<Batch> batches = batchRepository.findAll(
                                ReportSpecification.filter(request),
                                Sort.by(Sort.Order.desc("startDateTime"), Sort.Order.desc("createdAt")));
                List<Long> batchIds = batches.stream().map(Batch::getId).toList();
                Map<Long, Double> materialCorrectionQty = batchIds.isEmpty()
                                ? Collections.emptyMap()
                                : materialCorrectionRepository.getTotalQtyByBatchIds(batchIds)
                                                .stream()
                                                .collect(Collectors.toMap(row -> (Long) row[0],
                                                                row -> ((Number) row[1]).doubleValue()));
                return batches.stream()
                                .map(batch -> batchReportMapper.toBatchesResponse(
                                                batch,
                                                materialCorrectionQty.getOrDefault(batch.getId(), 0.0)))
                                .toList();
        }

        @Override
        public BatchReportResponse generateBatchReport(Long id) {
                return BatchReportResponse.builder()
                                .info(reportService.getBatchInfoById(id))
                                .sops(reportService.getBatchSopByBatchId(id))
                                .mat(reportService.getMaterialQuantityByBatchId(id))
                                .par(reportService.getParameterValueByBatchId(id))
                                .qc(reportService.getQualityCheckByBatchId(id))
                                .build();
        }

        @Override
        public ReportMetadataResponse getMetadata(Long userId) {
                License license = licenseRepository.findByStatus(LicenseStatus.ACTIVE)
                                .orElseThrow(() -> new ResourceNotFoundException("License not found."));
                User user = userRepository.findByIdAndDeletedFalse(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                return ReportMetadataResponse
                                .builder()
                                .generatedBy(user.getName())
                                .generatedByEmail(user.getEmail())
                                .generatedAt(LocalDateTime.now())
                                .companyName(license.getCompanyName())
                                .companyLogo(companyFileStorageService.getCompanyLogo())
                                .build();
        }

}
