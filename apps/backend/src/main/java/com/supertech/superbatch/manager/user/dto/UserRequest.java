package com.supertech.superbatch.manager.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserRequest(

                @NotBlank(message = "Password is required") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$", message = "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.") String password,

                @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must not exceed 100 characters") String name,

                @NotBlank(message = "Email is required") @Email(message = "Invalid email format") @Size(max = 255, message = "Email must not exceed 255 characters") String email,

                @NotNull(message = "Role is required") Long roleId

) {
}