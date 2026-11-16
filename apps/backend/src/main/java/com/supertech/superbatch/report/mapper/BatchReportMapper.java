package com.supertech.superbatch.report.mapper;

import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Component;
import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;
import com.supertech.superbatch.report.dto.BatchSopResponse;
import com.supertech.superbatch.report.dto.BatchesResponse;
import com.supertech.superbatch.report.helper.ReportHelper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchReportMapper {
    private final ReportHelper reportHelper;

    public BatchesResponse toBatchesResponse(Batch batch, Double materialCorrectionQty) {
        Integer actualTime = reportHelper.calculateActualTime(batch.getStartDateTime(), batch.getEndDateTime());
        Integer standardTime = reportHelper.calculateStandardTime(batch);
        Integer varianceTime = actualTime - standardTime;
        Integer standardSize = batch.getControlRecipe().getBatchSize();
        Double actualSize = reportHelper.calculateActualSize(batch, materialCorrectionQty);
        Double varianceSize = actualSize - standardSize;
        Set<BatchSOP> sops = batch.getSops();
        Integer totalSteps = sops != null ? sops.size() : 0;
        Integer completedSteps = reportHelper.getStatusStepCountByBatchSOP(sops, BatchSOPStatus.COMPLETED);
        Double completionPercentage = totalSteps > 0 ? (completedSteps * 100.0) / totalSteps : 0.0;

        return BatchesResponse.builder()
                .id(batch.getId())
                .batchNo(batch.getBatchNo())
                .startDateTime(batch.getStartDateTime())
                .endDateTime(batch.getEndDateTime())
                .unit(BatchesResponse.UnitResponse.builder()
                        .id(batch.getUnit().getId())
                        .name(batch.getUnit().getName())
                        .code(batch.getUnit().getCode())
                        .build())
                .product(BatchesResponse.ProductResponse.builder()
                        .id(batch.getMasterRecipe().getMaterial().getId())
                        .name(batch.getMasterRecipe().getMaterial().getName())
                        .code(batch.getMasterRecipe().getMaterial().getCode())
                        .build())
                .masterRecipeName(batch.getMasterRecipe().getName())
                .controlRecipeName(batch.getControlRecipe().getName())
                .shiftIncharge(batch.getControlRecipe().getShiftIncharge().getName())
                .standardTime(standardTime)
                .actualTime(actualTime)
                .varianceTime(varianceTime)
                .standardSize(standardSize)
                .actualSize(actualSize)
                .varianceSize(varianceSize)
                .totalSteps(totalSteps)
                .completedSteps(completedSteps)
                .completionPercentage(completionPercentage)
                .status(batch.getStatus())
                .build();
    }

    public List<BatchSopResponse> toBatchSopResponse(Batch batch) {
        if (batch.getSops() == null || batch.getSops().isEmpty()) {
            return List.of();
        }

        return batch.getSops().stream()
                .map(sop -> {
                    int standardTime = sop.getStdTime() != null ? (int) Math.round(sop.getStdTime())
                            : 0;
                    int actualTime = reportHelper.calculateActualTime(sop.getStartDateTime(),
                            sop.getEndDateTime());
                    return BatchSopResponse.builder()
                            .id(sop.getId())
                            .stepNo(sop.getStepNo())
                            .action(sop.getAction().getName())
                            .transition(sop.getTransition().getName())
                            .message(sop.getMessage())
                            .fromEquipment(sop.getFromEquipment() != null
                                    ? sop.getFromEquipment().getCode()
                                    : null)
                            .toEquipment(sop.getToEquipment() != null
                                    ? sop.getToEquipment().getCode()
                                    : null)
                            .startDateTime(sop.getStartDateTime())
                            .endDateTime(sop.getEndDateTime())
                            .standardTime(standardTime)
                            .actualTime(actualTime)
                            .varianceTime(actualTime - standardTime)
                            .status(sop.getStatus())
                            .remark(sop.getRemark())
                            .build();
                })
                .toList();
    }
}
