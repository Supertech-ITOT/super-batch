package com.supertech.superbatch.manager.user.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserSearchRequest(

        @NotNull(message = "Page is required") @Min(value = 0, message = "Page must be greater than or equal to 0") Integer page,

        @NotNull(message = "Size is required") @Min(value = 1, message = "Size must be at least 1") @Max(value = 100, message = "Size must not exceed 100") Integer size

) {
}