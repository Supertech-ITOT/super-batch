package com.supertech.superbatch.batch.batch.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record BatchStepRemarkRequest(
        @NotNull(message = "Step number is required") @Positive(message = "Step number must be positive") Integer stepNo,

        @Size(max = 500, message = "Remark must not exceed 500 characters") String remark) {
}