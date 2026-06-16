package com.supertech.superbatch.manager.dto.Role;

import jakarta.validation.constraints.*;

public record RoleRequest(

        @NotBlank(message = "Role name is required") @Pattern(regexp = "^[A-Z]+(?:_[A-Z]+)*$", message = "Role name must contain only uppercase letters and underscores") String name,

        @NotBlank(message = "Description is required") @Size(max = 255, message = "Description must be a single line and not exceed 255 characters") @Pattern(regexp = "^[^\\r\\n]*$", message = "Description must be a single line") String description

) {
}