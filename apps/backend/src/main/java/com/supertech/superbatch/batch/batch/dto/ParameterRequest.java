package com.supertech.superbatch.batch.batch.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ParameterRequest(

                @NotNull(message = "Parameter ID is required") @Positive(message = "Parameter ID must be greater than 0") Long parameterId,

                @NotNull(message = "Actual value is required") Double actValue

) {
}