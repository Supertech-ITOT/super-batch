package com.supertech.superbatch.manager.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UserRequest(

                @NotBlank(message = "Name is required") String name,

                @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                @NotBlank(message = "Password is required") String password,

                @NotNull(message = "Role is required") Long roleId

) {
}