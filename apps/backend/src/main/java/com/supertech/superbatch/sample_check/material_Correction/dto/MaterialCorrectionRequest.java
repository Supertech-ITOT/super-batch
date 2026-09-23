package com.supertech.superbatch.sample_check.material_correction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MaterialCorrectionRequest(

        @NotBlank(message = "Batch number is required") String batchNo,

        @NotNull(message = "Step number is required") @Positive(message = "Step number must be greater than 0") Integer stepNo,

        @NotNull(message = "Material is required") Long materialId,

        @Positive(message = "Quantity must be greater than 0") double qty

) {
}