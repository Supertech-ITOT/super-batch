package com.supertech.superbatch.sample_check.material_correction.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MaterialCorrectionRequest(

        @NotNull(message = "Material is required") Long materialId,

        @Positive(message = "Quantity must be greater than 0") double qty

) {
}