package com.supertech.superbatch.batch.batch.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MaterialRequest(

        @NotNull(message = "Material ID is required") @Positive(message = "Material ID must be greater than 0") Long materialId,

        @NotNull(message = "Actual quantity is required") @Positive(message = "Actual quantity must be greater than 0") Double actQty

) {
}