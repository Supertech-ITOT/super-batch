package com.supertech.superbatch.sample_check.material_correction.dto.projection;

public interface CorrectionQuantitySummaryProjection {

    Long getMaterialId();

    String getMaterialName();

    String getMaterialCode();

    Double getQty();
}