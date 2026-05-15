package com.supertech.superbatch.plant.dto.Plant;

import jakarta.validation.constraints.NotBlank;

public record UpdatePlantRequest(
                @NotBlank(message = "Plant name is required") String name) {
}
