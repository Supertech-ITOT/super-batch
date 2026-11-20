
package com.supertech.superbatch.report.mapper;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantityDetailProjection;
import com.supertech.superbatch.batch.batch_sop.dto.projection.MaterialQuantitySummaryProjection;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialQuantityChartData;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialQuantityTableData;
import com.supertech.superbatch.report.dto.MaterialQuantityResponse.MaterialStatisticsData;
import com.supertech.superbatch.report.helper.ReportHelper;
import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantityDetailProjection;
import com.supertech.superbatch.sample_check.material_correction.dto.projection.CorrectionQuantitySummaryProjection;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MaterialReportMapper {
        private final ReportHelper reportHelper;

        public List<MaterialStatisticsData> toMaterialStatisticsDataResponse(Batch batch,
                        Double materialCorrectionQty) {
                Integer standardQty = batch.getControlRecipe().getBatchSize();
                Double actualQty = reportHelper.calculateActualSize(batch, materialCorrectionQty);
                Double varianceQty = actualQty - standardQty;
                Double variancePercent = (varianceQty / standardQty) * 100;
                return List.of(
                                MaterialStatisticsData.builder()
                                                .label("Total Standard Qty")
                                                .value(standardQty.doubleValue())
                                                .highlight(false)
                                                .unit("KG")
                                                .build(),
                                MaterialStatisticsData.builder()
                                                .label("Total Actual Qty")
                                                .value(actualQty)
                                                .highlight(false)
                                                .unit("KG")
                                                .build(),
                                MaterialStatisticsData.builder()
                                                .label("Variance Qty")
                                                .value(varianceQty)
                                                .highlight(true)
                                                .unit("KG")
                                                .build(),
                                MaterialStatisticsData.builder()
                                                .label("Variance %")
                                                .value(variancePercent)
                                                .highlight(true)
                                                .unit("%")
                                                .build()

                );
        }

        public List<MaterialQuantityChartData> toMaterialQuantityChartDataResponse(
                        List<MaterialQuantitySummaryProjection> sopMaterials,
                        List<CorrectionQuantitySummaryProjection> correctionMaterials) {

                Map<Long, MaterialQuantityChartData> result = new LinkedHashMap<>();

                // Add SOP materials
                for (MaterialQuantitySummaryProjection material : sopMaterials) {
                        result.put(
                                        material.getMaterialId(),
                                        MaterialQuantityChartData.builder()
                                                        .materialId(material.getMaterialId())
                                                        .materialName(material.getMaterialName())
                                                        .materialCode(material.getMaterialCode())
                                                        .stdQty(material.getStdQty() != null ? material.getStdQty()
                                                                        : 0.0)
                                                        .actQty(material.getActQty() != null ? material.getActQty()
                                                                        : 0.0)
                                                        .build());
                }

                // Add correction quantities to actual quantity
                for (CorrectionQuantitySummaryProjection correction : correctionMaterials) {
                        Long materialId = correction.getMaterialId();
                        Double correctionQty = correction.getQty() != null ? correction.getQty() : 0.0;
                        result.compute(materialId,
                                        (id, existing) -> MaterialQuantityChartData.builder()
                                                        .materialId(id)
                                                        .materialName(existing != null ? existing.materialName()
                                                                        : correction.getMaterialName())
                                                        .materialCode(existing != null ? existing.materialCode()
                                                                        : correction.getMaterialCode())
                                                        .stdQty(existing != null ? existing.stdQty() : 0.0)
                                                        .actQty((existing != null ? existing.actQty() : 0.0)
                                                                        + correctionQty)
                                                        .build());
                }

                return result.values().stream()
                                .sorted(Comparator.comparing(MaterialQuantityChartData::materialName,
                                                Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)))
                                .toList();
        }

        public List<MaterialQuantityTableData> toMaterialQuantityTableDataResponse(
                        List<MaterialQuantityDetailProjection> sopMaterials,
                        List<CorrectionQuantityDetailProjection> correctionMaterials) {

                List<MaterialQuantityTableData> result = new ArrayList<>();

                // SOP materials
                for (MaterialQuantityDetailProjection material : sopMaterials) {
                        result.add(MaterialQuantityTableData.builder()
                                        .stepNo(material.getStepNo())
                                        .loop(0)
                                        .startDateTime(material.getStartDateTime())
                                        .endDateTime(material.getEndDateTime())
                                        .materialId(material.getMaterialId())
                                        .materialName(material.getMaterialName())
                                        .materialCode(material.getMaterialCode())
                                        .stdQty(material.getStdQty())
                                        .actQty(material.getActQty())
                                        .varQty(material.getVarQty())
                                        .varPct(material.getVarPct())
                                        .build());
                }

                // Material corrections
                for (CorrectionQuantityDetailProjection correction : correctionMaterials) {
                        Double stdQty = 0.0;
                        Double actQty = correction.getQty() != null ? correction.getQty() : 0.0;
                        Double varQty = actQty - stdQty;
                        result.add(MaterialQuantityTableData.builder()
                                        .stepNo(correction.getStepNo())
                                        .loop(correction.getLoop())
                                        .startDateTime(null)
                                        .endDateTime(correction.getDateTime())
                                        .materialId(correction.getMaterialId())
                                        .materialName(correction.getMaterialName())
                                        .materialCode(correction.getMaterialCode())
                                        .stdQty(stdQty)
                                        .actQty(actQty)
                                        .varQty(varQty)
                                        .varPct(0.0)
                                        .build());
                }

                return result.stream()
                                .sorted(Comparator
                                                .comparing(MaterialQuantityTableData::stepNo)
                                                .thenComparing(MaterialQuantityTableData::loop,
                                                                Comparator.nullsFirst(Comparator.naturalOrder())))
                                .toList();
        }

}
