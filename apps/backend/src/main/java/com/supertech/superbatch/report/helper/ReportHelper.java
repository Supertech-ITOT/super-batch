package com.supertech.superbatch.report.helper;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch.entity.Batch;
import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;
import com.supertech.superbatch.batch.batch_sop.enums.BatchSOPStatus;

@Component
public class ReportHelper {
    public Integer calculateActualTime(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        if (startDateTime == null || endDateTime == null) {
            return 0;
        }
        return Math.toIntExact(Duration.between(startDateTime, endDateTime).toMinutes());
    }

    public Integer calculateStandardTime(Batch batch) {
        if (batch.getSops() == null) {
            return 0;
        }

        return (int) Math.round(batch.getSops().stream()
                .filter(Objects::nonNull)
                .mapToDouble(sop -> sop.getStdTime() != null ? sop.getStdTime() : 0.0)
                .sum());
    }

    public Double calculateActualSize(Batch batch, Double materialCorrectionQty) {
        double sopMaterialQty = batch.getSops() == null
                ? 0.0
                : batch.getSops().stream()
                        .filter(Objects::nonNull)
                        .filter(sop -> sop.getMaterials() != null)
                        .mapToDouble(sop -> sop.getMaterials().stream()
                                .filter(Objects::nonNull)
                                .mapToDouble(material -> material.getActQty() != null
                                        ? material.getActQty()
                                        : 0.0)
                                .sum())
                        .sum();

        return sopMaterialQty + (materialCorrectionQty != null ? materialCorrectionQty : 0.0);
    }

    public Integer getStatusStepCountByBatchSOP(Set<BatchSOP> sops, BatchSOPStatus status) {
        if (sops == null || sops.isEmpty()) {
            return 0;
        }
        return (int) sops.stream().filter(sop -> sop.getStatus() == status).count();
    }
}
