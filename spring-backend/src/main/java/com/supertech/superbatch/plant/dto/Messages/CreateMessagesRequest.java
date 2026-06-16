package com.supertech.superbatch.plant.dto.Messages;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateMessagesRequest(

        @NotBlank(message = "Message name is required") @Size(min = 2, max = 100, message = "Message name must be between 2 and 100 characters") @Pattern(regexp = "^[a-zA-Z0-9\\s&()\\-_,.]+$", message = "Message name contains invalid characters") String name

) {
}