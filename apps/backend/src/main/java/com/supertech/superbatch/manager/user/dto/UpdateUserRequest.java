package com.supertech.superbatch.manager.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

        @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must not exceed 100 characters") String name,

        @NotBlank(message = "Email is required") @Email(message = "Invalid email format") @Size(max = 255, message = "Email must not exceed 255 characters") String email,

        @NotNull(message = "Role is required") Long roleId

) {
}