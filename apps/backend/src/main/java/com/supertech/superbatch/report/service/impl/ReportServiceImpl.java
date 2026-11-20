package com.supertech.superbatch.report.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch.repository.BatchRepository;
import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantityDetailProjection;
import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantitySummaryProjection;
import com.supertech.superbatch.batch.batch_sop.repository.BatchSOPRepository;
import com.supertech.superbatch.common.exception.ResourceNotFoundException;
import com.supertech.superbatch.manager.license.annotation.RequiresLicense;
import com.supertech.superbatch.manager.permission.annotation.RequiresPermission;
import com.supertech.superbatch.report.dto.BatchSopResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse;
import com.supertech.superbatch.report.dto.ParameterValueResponse;
import com.supertech.superbatch.report.dto.ReportFilterRequest;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialQuantityChartData;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialQuantityTableData;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialStatisticsData;
import com.supertech.superbatch.report.dto.ParameterValueResponse.ParameterValueData;
import com.supertech.superbatch.report.dto.ParameterValueResponse.ParameterValueStatisticsData;
import com.supertech.superbatch.report.dto.QualityCheckResponse.QualityCheckSampleList;
import com.supertech.superbatch.report.dto.QualityCheckResponse.QualityCheckStatisticsData;
import com.supertech.superbatch.report.dto.QualityCheckResponse;
import com.supertech.superbatch.report.mapper.BatchReportMapper;
import com.supertech.superbatch.report.mapper.MaterialReportMapper;
import com.supertech.superbatch.report.mapper.ParameterReportMapper;
import com.supertech.superbatch.report.mapper.QualityCheckReportMapper;
import com.supertech.superbatch.report.service.ReportService;
import com.supertech.superbatch.report.specification.ReportSpecification;
import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantityDetailProjection;
import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantitySummaryProjection;
import com.supertech.superbatch.sample_check.material_correction.repository.MaterialCorrectionRepository;

import lombok.RequiredArgsConstructor;
import com.supertech.superbatch.manager.module.enums.ModuleType;

@Service
@RequiredArgsConstructor
@RequiresLicense
@RequiresPermission(ModuleType.REPORT)
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {
        private final BatchRepository batchRepository;
        private final BatchSOPRepository batchSOPRepository;
        private final MaterialReportMapper materialReportMapper;
        private final BatchReportMapper batchReportMapper;
        private final MaterialCorrectionRepository materialCorrectionRepository;
        private final ParameterReportMapper parameterReportMapper;
        private final QualityCheckReportMapper qualityCheckReportMapper;

        @Override
        public Page<BatchesResponse> getBatches(ReportFilterRequest request) {
                int page = request.page() != null ? Math.max(request.page(), 0) : 0;
                int size = request.size() != null ? Math.min(Math.max(request.size(), 1), 100) : 10;
                Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
                Page<Batch> batches = batchRepository.findAll(ReportSpecification.filter(request), pageable);
                List<Long> batchIds = batches.getContent().stream().map(Batch::getId).toList();
                Map<Long, Double> materialCorrectionQty = batchIds.isEmpty()
                                ? Collections.emptyMap()
                                : materialCorrectionRepository.getTotalQtyByBatchIds(batchIds)
                                                .stream()
                                                .collect(Collectors.toMap(row -> (Long) row[0],
                                                                row -> ((Number) row[1]).doubleValue()));
                return batches.map(batch -> batchReportMapper.toBatchesResponse(
                                batch,
                                materialCorrectionQty.getOrDefault(batch.getId(), 0.0)));
        }

        @Override
        public BatchesResponse getBatchInfoById(Long id) {
                Batch batch = getBatchById(id);
                Double materialCorrectionQty = materialCorrectionRepository.getTotalQtyByBatchId(id);
                return batchReportMapper.toBatchesResponse(batch, materialCorrectionQty);
        }

        @Override
        public List<BatchSopResponse> getBatchSopByBatchId(Long id) {
                Batch batch = getBatchById(id);
                return batchReportMapper.toBatchSopResponse(batch);
        }

        @Override
        public MaterialQuantityResponse getMaterialQuantityByBatchId(Long id) {
                Batch batch = getBatchById(id);

                Double materialCorrectionQty = materialCorrectionRepository.getTotalQtyByBatchId(id);
                List<MaterialStatisticsData> statsData = materialReportMapper
                                .toMaterialStatisticsDataResponse(batch, materialCorrectionQty);

                List<MaterialQuantitySummaryProjection> materialQuantitySummaryProjections = batchSOPRepository
                                .findMaterialQuantityGroupedByBatchId(id);
                List<CorrectionQuantitySummaryProjection> correctionQuantitySummaryProjections = materialCorrectionRepository
                                .findCorrectionQuantityGroupedByBatchId(id);
                List<MaterialQuantityChartData> chartData = materialReportMapper
                                .toMaterialQuantityChartDataResponse(materialQuantitySummaryProjections,
                                                correctionQuantitySummaryProjections);

                List<MaterialQuantityDetailProjection> materialQuantityDetailProjections = batchSOPRepository
                                .findMaterialQuantityDetailByBatchId(id);
                List<CorrectionQuantityDetailProjection> correctionQuantityDetailProjections = materialCorrectionRepository
                                .findCorrectionQuantityDetailByBatchId(id);
                List<MaterialQuantityTableData> tableData = materialReportMapper
                                .toMaterialQuantityTableDataResponse(materialQuantityDetailProjections,
                                                correctionQuantityDetailProjections);

                return MaterialQuantityResponse.builder()
                                .id(id)
                                .batchNo(batch.getBatchNo())
                                .statsData(statsData)
                                .chartData(chartData)
                                .tableData(tableData)
                                .build();
        }

        @Override
        public ParameterValueResponse getParameterValueByBatchId(Long id) {
                Batch batch = getBatchById(id);
                List<ParameterValueStatisticsData> statsData = parameterReportMapper
                                .toParameterStatisticsResponse(batch);
                List<ParameterValueData> data = parameterReportMapper.toParameterValueDataResponse(batch);
                return ParameterValueResponse.builder()
                                .id(id)
                                .batchNo(batch.getBatchNo())
                                .statsData(statsData)
                                .data(data)
                                .build();
        }

        @Override
        public QualityCheckResponse getQualityCheckByBatchId(Long id) {
                Batch batch = getBatchById(id);
                List<QualityCheckStatisticsData> statsData = qualityCheckReportMapper
                                .toQualityCheckStatisticsResponse(batch);
                List<QualityCheckSampleList> list = qualityCheckReportMapper.toQualityCheckSampleListResponse(batch);
                return QualityCheckResponse.builder()
                                .id(id)
                                .batchNo(batch.getBatchNo())
                                .statsData(statsData)
                                .list(list)
                                .build();
        }

        private Batch getBatchById(Long id) {
                return batchRepository.findByIdWithRelation(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Batch not found."));
        }

}
