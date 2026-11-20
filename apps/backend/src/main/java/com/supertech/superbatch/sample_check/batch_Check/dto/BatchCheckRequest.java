package com.supertech.superbatch.sample_check.batch_check.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record BatchCheckRequest(
                @NotEmpty(message = "Check parameter results are required") List<@Valid BatchCheckResultRequest> results) {

}
