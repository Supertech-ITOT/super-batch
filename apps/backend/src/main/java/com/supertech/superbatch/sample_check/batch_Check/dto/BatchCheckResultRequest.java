package com.supertech.superbatch.sample_check.batch_check.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BatchCheckResultRequest(

        @NotNull(message = "Check Parameter is required") Long checkParameterId,

        @NotBlank(message = "Value is required") String value

) {
}