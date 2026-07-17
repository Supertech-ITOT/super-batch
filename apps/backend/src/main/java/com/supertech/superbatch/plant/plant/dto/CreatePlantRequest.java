package com.supertech.superbatch.plant.plant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreatePlantRequest(

                @NotBlank(message = "Plant name is required") @Size(min = 3, max = 100, message = "Plant name must be between 3 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Plant name contains invalid characters") String name,

                @Size(min = 2, max = 100, message = "Description must be between 2 and 100 characters") String description,

                @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters") String location,

                @NotBlank(message = "Plant type is required") @Size(min = 2, max = 50, message = "Plant type must be between 2 and 50 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s\\-_/]+$", message = "Plant type contains invalid characters") String plantType

) {
}