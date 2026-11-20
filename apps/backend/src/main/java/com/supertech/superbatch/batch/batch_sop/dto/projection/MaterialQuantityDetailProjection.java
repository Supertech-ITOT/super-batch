package com.supertech.superbatch.batch.batch_sop.dto.projection;

import java.time.LocalDateTime;

public interface MaterialQuantityDetailProjection {
    Integer getStepNo();

    LocalDateTime getStartDateTime();

    LocalDateTime getEndDateTime();

    Long getMaterialId();

    String getMaterialName();

    String getMaterialCode();

    Double getStdQty();

    Double getActQty();

    Double getVarQty();

    Double getVarPct();
}