package com.supertech.superbatch.sample_check.check_Parameter.dto;

import java.util.List;
import com.supertech.superbatch.sample_check.check_Parameter.enums.CheckParameterType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record CheckParameterRequest(
        @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must not exceed 100 characters") String name,

        @NotBlank(message = "Product is required") String product,

        @NotNull(message = "Type is required") CheckParameterType type,

        Double min,

        Double max,

        List<String> allowedOptions,

        List<String> notAllowedOptions) {

}
