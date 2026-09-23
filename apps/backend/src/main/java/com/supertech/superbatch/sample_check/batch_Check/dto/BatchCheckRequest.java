package com.supertech.superbatch.sample_check.batch_check.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record BatchCheckRequest(
                @NotBlank(message = "Batch number is required") String batchNo,

                @NotNull(message = "Step number is required") @Positive(message = "Step number must be greater than 0") Integer stepNo,

                @NotEmpty(message = "Check parameter results are required") List<@Valid BatchCheckResultRequest> results) {

}
