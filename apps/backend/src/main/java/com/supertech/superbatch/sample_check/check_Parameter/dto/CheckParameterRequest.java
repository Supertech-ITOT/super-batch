package com.supertech.superbatch.sample_check.check_parameter.dto;

import java.util.List;

import com.supertech.superbatch.sample_check.check_parameter.enums.CheckParameterType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record CheckParameterRequest(
                @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must not exceed 100 characters") String name,

                @NotEmpty(message = "At least one material is required") List<@NotNull(message = "Material ID cannot be null") Long> materialIds,

                @NotNull(message = "Type is required") CheckParameterType type,

                Double min,

                Double max,

                List<String> allowedOptions,

                List<String> notAllowedOptions) {

}
