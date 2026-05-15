package com.supertech.superbatch.plant.dto.Area;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateAreaRequest(
                @NotBlank(message = "Area name is required") String name,
                @NotNull(message = "Plant id is required") Long plantId) {
};
