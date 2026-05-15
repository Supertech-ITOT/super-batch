package com.supertech.superbatch.plant.dto.Area;

import jakarta.validation.constraints.NotBlank;

public record UpdateAreaRequest(
                @NotBlank(message = "Area name is required") String name) {
}
