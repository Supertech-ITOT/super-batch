package com.supertech.superbatch.sample_check.material_correction.dto.projection;

import java.time.LocalDateTime;

public interface CorrectionQuantityDetailProjection {
    Integer getStepNo();

    Integer getLoop();

    LocalDateTime getDateTime();

    Long getMaterialId();

    String getMaterialName();

    String getMaterialCode();

    Double getQty();

}
