package com.supertech.superbatch.plant.message.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateMessagesRequest(

        @NotBlank(message = "Message is required") @Size(min = 2, max = 255, message = "Message must be between 2 and 255 characters") String name) {
}