package com.supertech.superbatch.plant.area.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateAreaRequest(

        @NotBlank(message = "Area name is required") @Size(min = 2, max = 100, message = "Area name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Area name contains invalid characters") String name,

        @Size(min = 2, max = 255, message = "Description must be between 2 and 255 characters") String description,

        @NotNull(message = "Plant id is required") Long plantId

) {
}