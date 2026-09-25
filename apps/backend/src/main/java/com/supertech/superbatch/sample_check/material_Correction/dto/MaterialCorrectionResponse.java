package com.supertech.superbatch.sample_check.material_correction.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record MaterialCorrectionResponse(
                Long id,
                String batchNo,
                Integer stepNo,
                LocalDateTime sampleDateTime,
                Integer loop,
                Long materialId,
                String materialName,
                String materialCode,
                Double qty) {

}
