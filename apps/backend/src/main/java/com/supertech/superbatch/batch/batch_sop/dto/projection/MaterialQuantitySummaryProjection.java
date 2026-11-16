package com.supertech.superbatch.batch.batch_sop.dto.projection;

public interface MaterialQuantitySummaryProjection {
    Long getMaterialId();

    String getMaterialName();

    String getMaterialCode();

    Double getStdQty();

    Double getActQty();
}